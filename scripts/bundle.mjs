import {build} from 'esbuild';
await build({entryPoints:['demo/client.jsx'],outfile:'demo/public/app.js',bundle:true,minify:true,target:'es2022',legalComments:'eof',define:{'process.env.NODE_ENV':'"production"'}});
