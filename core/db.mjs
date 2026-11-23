import {catalog} from './model.mjs';
const schema=[
 `CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE, pass TEXT NOT NULL, role TEXT NOT NULL CHECK(role IN ('admin','agent')), active INTEGER NOT NULL DEFAULT 1)`,
 `CREATE TABLE IF NOT EXISTS sessions (token TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id), expires BIGINT NOT NULL)`,
 `CREATE TABLE IF NOT EXISTS attempts (key_hash TEXT PRIMARY KEY, hits INTEGER NOT NULL, until_ms BIGINT NOT NULL)`,
 ...Object.values(catalog).map(c=>`CREATE TABLE IF NOT EXISTS ${c.key} (id TEXT PRIMARY KEY, assignee TEXT NOT NULL REFERENCES users(id), version INTEGER NOT NULL DEFAULT 1, updated_at TEXT NOT NULL, ${c.fields.map(f=>`${f.key} ${['money','number'].includes(f.type)?'BIGINT':'TEXT'}${f.required?' NOT NULL':''}${f.target?` REFERENCES ${f.target}(id)`:''}${['phone','code','receipt','deal_id'].includes(f.key)?' UNIQUE':''}`).join(', ')})`),
 `CREATE TABLE IF NOT EXISTS office_managers (user_id TEXT PRIMARY KEY REFERENCES users(id))`,
 `CREATE TABLE IF NOT EXISTS office_groups (id TEXT PRIMARY KEY, name TEXT NOT NULL UNIQUE, manager_id TEXT NOT NULL REFERENCES users(id))`,
 `CREATE TABLE IF NOT EXISTS group_members (user_id TEXT PRIMARY KEY REFERENCES users(id), group_id TEXT NOT NULL REFERENCES office_groups(id))`,
 `CREATE TABLE IF NOT EXISTS task_routes (task_id TEXT PRIMARY KEY REFERENCES tasks(id), creator_id TEXT NOT NULL REFERENCES users(id), group_id TEXT REFERENCES office_groups(id), parent_id TEXT REFERENCES tasks(id), completed_at TEXT)`,
 `CREATE INDEX IF NOT EXISTS idx_task_parent ON task_routes(parent_id)`,
 `CREATE TABLE IF NOT EXISTS audit (id TEXT PRIMARY KEY, actor TEXT NOT NULL REFERENCES users(id), entity TEXT NOT NULL, record_id TEXT NOT NULL, action TEXT NOT NULL, detail TEXT NOT NULL, happened_at TEXT NOT NULL)`,
 ...Object.keys(catalog).map(k=>`CREATE INDEX IF NOT EXISTS idx_${k}_owner ON ${k}(assignee)`),
 `CREATE INDEX IF NOT EXISTS idx_tasks_due ON tasks(status,due_at)`,`CREATE INDEX IF NOT EXISTS idx_visits_time ON visits(starts_at,ends_at)`,`CREATE INDEX IF NOT EXISTS idx_audit_record ON audit(entity,record_id)`,`CREATE INDEX IF NOT EXISTS idx_payments_contract ON payments(contract_id)`,
 `CREATE UNIQUE INDEX IF NOT EXISTS idx_current_listing ON listings(property_id,kind) WHERE status IN ('active','hold')`,
];
export async function connect(url=process.env.DATABASE_URL){
 if(!url)throw Error('DATABASE_URL is required. For the local demo use node demo/server.mjs');
 if(url.startsWith('sqlite:')){const {DatabaseSync}=await import('node:sqlite');const db=new DatabaseSync(url.slice(7));db.exec('PRAGMA foreign_keys=ON; PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000');
 const q=async(sql,args=[])=>{const st=db.prepare(sql);return st.columns().length?st.all(...args):(st.run(...args),[])};
 let queue=Promise.resolve();const tx=fn=>{const op=queue.then(async()=>{db.exec('BEGIN IMMEDIATE');try{const v=await fn(q);db.exec('COMMIT');return v}catch(e){db.exec('ROLLBACK');throw e}});queue=op.catch(()=>{});return op};return {tx,close:()=>db.close()};}
 if(!/^postgres(ql)?:/.test(url))throw Error('Unsupported database scheme');
 const {default:pg}=await import('pg');pg.types.setTypeParser(20,Number);const pool=new pg.Pool({connectionString:url,max:10});
 return {tx:async(fn)=>{const cn=await pool.connect();try{await cn.query('BEGIN ISOLATION LEVEL SERIALIZABLE');const q=async(sql,args=[])=>{let n=0;return (await cn.query(sql.replace(/\?/g,()=>`$${++n}`),args)).rows};const result=await fn(q);await cn.query('COMMIT');return result}catch(e){await cn.query('ROLLBACK');throw e}finally{cn.release()}},close:()=>pool.end()};
}
export const migrate=db=>db.tx(async q=>{for(const sql of schema)await q(sql)});
let live;export const database=()=>live??=connect();
