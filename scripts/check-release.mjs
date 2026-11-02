import {execFileSync} from 'node:child_process';
import {readFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';

export function checkRelease(before,after,changed){
 const parse=value=>{if(!/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/.test(value))throw Error('Usa una versión semántica estable: mayor.menor.parche.');return value.split('.').map(Number);};
 const a=parse(before),b=parse(after),first=b.findIndex((n,i)=>n!==a[i]);
 if(first<0||b[first]<a[first])throw Error('Cada publicación necesita una versión superior a main.');
 const schemaChanged=changed.some(f=>['src/schema.js','src/dbMigrations.js','src/history.js','src/db.js','src/backup.js'].includes(f));
 if(schemaChanged&&!changed.some(f=>/^tests\/(?:browser\/)?[^/]*(?:migration|schema|backup|database-history)[^/]*\.(?:test|spec)\.js$/.test(f)))throw Error('El almacenamiento cambió: añade o actualiza pruebas de migración/respaldo.');
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const base=process.argv[2];if(!base||/^0+$/.test(base))throw Error('Falta el commit base para verificar la publicación.');
 const git=(...args)=>execFileSync('git',args,{encoding:'utf8'}).trim();
 const before=JSON.parse(git('show',`${base}:package.json`)),after=JSON.parse(readFileSync('package.json','utf8'));
 const changed=git('diff','--name-only',base,'HEAD').split('\n');checkRelease(before.version,after.version,changed);
 console.log(`Publicación válida: ${before.version} → ${after.version}; migraciones comprobadas cuando corresponde.`);
}
