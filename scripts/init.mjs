import {connect,migrate} from '../core/db.mjs';
import {initialize} from '../core/seed.mjs';
const db=await connect();try{await migrate(db);const made=await initialize(db,{name:process.env.INIT_ADMIN_NAME,email:process.env.INIT_ADMIN_EMAIL,password:process.env.INIT_ADMIN_PASSWORD,sample:false});console.log(made?'Schema ready; administrator created.':'Schema ready; existing accounts retained.')}finally{await db.close()}
