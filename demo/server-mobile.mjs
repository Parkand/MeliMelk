import { composeClient } from './compose-client.mjs';
// Offline local demo. No third-party server dependencies.
import {networkInterfaces} from 'node:os';
import {createServer} from 'node:http';
import {randomBytes} from 'node:crypto';
import {Readable} from 'node:stream';
import {mkdir,readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {join,resolve} from 'node:path';
import {connect,migrate} from '../core/db.mjs';
import {initialize} from '../core/seed.mjs';
import {current} from '../core/service.mjs';
import {api} from '../core/api.mjs';
import {permitted,sections} from '../ui/nav.mjs';
const base=fileURLToPath(new URL('.',import.meta.url));
const data=process.env.DEMO_DATA_DIR?resolve(process.env.DEMO_DATA_DIR):join(base,'local');
const port=Number(process.env.DEMO_PORT??3182);if(!Number.isInteger(port)||port<1||port>65535)throw Error('DEMO_PORT must be 1..65535');
const ips=Object.entries(networkInterfaces()).sort(([a],[b])=>Number(/wi-fi|wireless/i.test(b))-Number(/wi-fi|wireless/i.test(a))).flatMap(([,items])=>items??[]).filter(n=>n.family==='IPv4'&&!n.internal&&/^(?:192\.168\.|10\.|172\.(?:1[6-9]|2\d|3[01])\.)/.test(n.address));
const addr=ips[0]?.address;if(!addr)throw Error('Connect to a private LAN first.');
const host=`${addr}:${port}`,origin=`http://${host}`;
// Explicit single origin, regardless of proxy/production settings on this machine.
process.env.APP_ORIGIN=origin;
const assets=new Map([['/assets/app.js',['text/javascript; charset=utf-8',await composeClient()]],['/assets/app.css',['text/css; charset=utf-8',await readFile(join(base,'../app/globals.css'))]]]);
assets.set('/assets/components/views/MaskanProperties.css',['text/css; charset=utf-8',await readFile(join(base,'public/components/views/MaskanProperties.css'))]);
assets.set('/assets/components/views/DemandGrid.css',['text/css; charset=utf-8',await readFile(join(base,'public/components/views/DemandGrid.css'))]);
assets.set('/assets/components/MaskanModal.css',['text/css; charset=utf-8',await readFile(join(base,'../ui/MaskanModal.css'))]);
assets.set('/assets/components/views/PersianDate.css',['text/css; charset=utf-8',await readFile(join(base,'public/components/views/PersianDate.css'))]);
assets.set('/assets/components/MaskanModal.js',['text/javascript; charset=utf-8',await readFile(join(base,'../ui/MaskanModal.js'))]);
assets.set('/assets/components/MaskanPersonCard.js',['text/javascript; charset=utf-8',await readFile(join(base,'public/components/MaskanPersonCard.js'))]);
assets.set('/assets/components/MaskanDataGrid.js',['text/javascript; charset=utf-8',await readFile(join(base,'public/components/MaskanDataGrid.js'))]);
assets.set('/assets/components/MaskanContacts.js',['text/javascript; charset=utf-8',await readFile(join(base,'public/components/MaskanContacts.js'))]);
assets.set('/assets/vendor/tabulator/6.3.1/tabulator.min.js', ['text/javascript; charset=utf-8', await readFile(join(base, 'public/vendor/tabulator/6.3.1/tabulator.min.js'))]);
assets.set('/assets/components/views/PersonForm.css', ['text/css; charset=utf-8', await readFile(join(base, 'public/components/views/PersonForm.css'))]);
assets.set('/assets/vendor/leaflet-1.9.4/leaflet.js', ['text/javascript', await readFile(join(base, 'public/vendor/leaflet-1.9.4/leaflet.js'))]);
assets.set('/assets/vendor/leaflet-1.9.4/leaflet.css', ['text/css', await readFile(join(base, 'public/vendor/leaflet-1.9.4/leaflet.css'))]);
assets.set('/assets/vendor/leaflet-1.9.4/images/marker-icon.png', ['image/png', await readFile(join(base, 'public/vendor/leaflet-1.9.4/images/marker-icon.png'))]);
assets.set('/assets/components/views/PropertyForm.css', ['text/css; charset=utf-8', await readFile(join(base, 'public/components/views/PropertyForm.css'))]);
assets.set('/assets/components/views/TaskDetail.css', ['text/css; charset=utf-8', await readFile(join(base, 'public/components/views/TaskDetail.css'))]);
assets.set('/assets/components/views/TaskEdit.css', ['text/css; charset=utf-8', await readFile(join(base, 'public/components/views/TaskEdit.css'))]);
assets.set('/assets/components/MaskanContacts.css', ['text/css; charset=utf-8', await readFile(join(base, 'public/components/MaskanContacts.css'))]);
assets.set('/assets/components/MaskanPersonCard.css', ['text/css; charset=utf-8', await readFile(join(base, 'public/components/MaskanPersonCard.css'))]);
assets.set('/assets/styles/contacts-grid.css', ['text/css; charset=utf-8', await readFile(join(base, 'public/styles/contacts-grid.css'))]);
assets.set('/fonts/Vazirmatn-variable.woff2', [
  'font/woff2', await readFile(join(base, '../public/fonts/Vazirmatn-variable.woff2'))
]);
for (const name of 'tasks visits contracts payments reports team contacts properties demands deals audit login home'.split(' ')) {
  assets.set(`/banners/${name}.svg`, ['image/svg+xml', await readFile(join(base, `../public/banners/${name}.svg`))]);
}
await mkdir(data,{recursive:true,mode:0o700});process.umask(0o077);
if(!process.env.PGPASSWORD)throw Error('Start with start-daftar-pg.ps1 (PostgreSQL password required)');
const db=await connect('postgresql://daftar_app@127.0.0.1:5432/daftar_migration');
await db.tx(q=>q('SELECT id FROM users LIMIT 1'));
(await import('../core/service.mjs')).enableMaskanPersons();
await db.tx(q=>q('CREATE TABLE IF NOT EXISTS maskan_contact_state(contact_id TEXT PRIMARY KEY REFERENCES contacts(id), archived INTEGER NOT NULL CHECK(archived IN (0,1)))'));
const fresh=false,email='',password='';
console.log('Database: PostgreSQL / daftar_migration');
let webKey='';if(process.env.LOCALAPPDATA){try{const raw=(await readFile(join(process.env.LOCALAPPDATA,'MeliMelk-Neshan','web.key'),'utf8')).trim();if(/^[A-Za-z0-9._-]{1,512}$/.test(raw))webKey=raw;}catch(e){if(e.code!=='ENOENT')console.warn('Neshan configuration unavailable.')}}
const page='<!doctype html><html lang="fa" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><meta name="neshan-web-key" content="'+webKey+'"><title>دفتر املاک | دموی محلی</title><link rel="stylesheet" href="/assets/app.css"><link rel="stylesheet" href="/assets/styles/contacts-grid.css"><link rel="stylesheet" href="/assets/components/views/MaskanProperties.css"><link rel="stylesheet" href="/assets/components/views/DemandGrid.css"><link rel="stylesheet" href="/assets/components/views/PersonForm.css"><link rel="stylesheet" href="https://static.neshan.org/sdk/leaflet/v1.9.4/neshan-sdk/v1.0.8/index.css"><script defer src="https://static.neshan.org/sdk/leaflet/v1.9.4/neshan-sdk/v1.0.8/index.js"></script><link rel="stylesheet" href="/assets/components/views/PropertyForm.css"><link rel="stylesheet" href="/assets/components/MaskanPersonCard.css"><link rel="stylesheet" href="/assets/components/MaskanContacts.css"><link rel="stylesheet" href="/assets/components/views/TaskDetail.css"><link rel="stylesheet" href="/assets/components/views/TaskEdit.css"><link rel="stylesheet" href="/assets/components/MaskanModal.css"><link rel="stylesheet" href="/assets/components/views/PersianDate.css"><script src="/assets/vendor/tabulator/6.3.1/tabulator.min.js" defer></script><script src="/assets/components/MaskanModal.js" defer></script><script src="/assets/components/MaskanPersonCard.js" defer></script><script src="/assets/components/MaskanDataGrid.js" defer></script><script src="/assets/components/MaskanContacts.js" defer></script><script src="/assets/app.js" defer></script></head><body><div id="root"></div></body></html>';
const server=createServer(async(req,res)=>{try{
 const send=(status,body='',type='text/plain; charset=utf-8',headers={})=>{res.writeHead(status,{'Content-Type':type,...headers});res.end(body)};
 res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Content-Security-Policy',"default-src 'self'; script-src 'self' https://static.neshan.org; style-src 'self' 'unsafe-inline' https://static.neshan.org; img-src 'self' data: blob: https:; connect-src 'self' https://*.neshan.org; font-src 'self' https://*.neshan.org; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'");
 if(req.headers.host!==host)return send(403,'Use '+origin);
 const url=new URL(req.url,origin);if(url.origin!==origin)return send(400,'Bad request');
 if(url.pathname.startsWith('/api/')){const headers=new Headers();for(const [k,v] of Object.entries(req.headers))if(v!==undefined)headers.set(k,String(v));const hasBody=!['GET','HEAD'].includes(req.method);const request=new Request(url,{method:req.method,headers,...(hasBody?{body:Readable.toWeb(req),duplex:'half'}:{})});const result=await api(request,db);res.writeHead(result.status,Object.fromEntries(result.headers));res.end(Buffer.from(await result.arrayBuffer()));return}
 if(req.method!=='GET')return send(405);if(assets.has(url.pathname)){const [mime,bytes]=assets.get(url.pathname);return send(200,bytes,mime)}
 if(url.pathname==='/')return send(302,'',undefined,{Location:'/desk/home'});if(url.pathname==='/login')return send(200,page,'text/html; charset=utf-8');
 const section=/^\/desk\/([a-z]+)$/.exec(url.pathname)?.[1];if(!Object.hasOwn(sections,section))return send(404,'Not found');const token=req.headers.cookie?.match(/(?:^|;\s*)daftar_session=([0-9a-f]{64})(?:;|$)/)?.[1];let user;if(token){try{user=await db.tx(q=>current(q,token))}catch(e){if(e.status!==401)throw e}}if(!user)return send(302,'',undefined,{Location:'/login'});if(!permitted(section,user.role))return send(404,'Not found');send(200,page,'text/html; charset=utf-8');
 }catch(e){console.error('Demo request failed:',e.name);if(!res.headersSent)res.writeHead(500);res.end()}});
// Print initial credentials immediately: even if port binding fails, the DB was initialized.
console.log(fresh?`Demo login: ${email}\nInitial demo password: ${password}\nSave this password; it is not printed on subsequent starts.`:'Existing demo retained. Use the password from the first start (or your changed password).');
server.on('error',async e=>{console.error('Demo server:',e.message);await db.close();process.exitCode=1});server.listen(port,addr,()=>console.log(`Daftar demo: ${origin}/login`));
for(const s of ['SIGINT','SIGTERM'])process.once(s,()=>server.close(async()=>{await db.close();process.exit(0)}));
