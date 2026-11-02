import {test} from 'node:test';
import assert from 'node:assert/strict';
import {personalBackup} from './fixtures/personal-backup.js';
import {validateBackup} from '../src/backup.js';
test('respaldo personal conserva rutina, perfil, 40 entrenamientos, 762 series y seis fotos sin mutar el archivo',()=>{
 const file=personalBackup(),before=structuredClone(file),result=validateBackup(file),state=file.records.app[0].value;
 assert.equal(result.source,'personal');assert.equal(result.counts.sessions,40);assert.equal(result.counts.series,762);assert.equal(result.counts.checkPhotos,6);
 for(const key of ['routine','profiles','personalProfile','profileHistory','logs','sessionMeta','cardio','dailySteps','journal','measurements','monthlyChecks','meals'])assert.deepEqual(result.state[key],state[key],key);
 assert.deepEqual(file,before);
 const exported={...file,format:'olympia-friends-backup',databaseName:'olympia-friends'};
 assert.deepEqual(validateBackup(exported).state,result.state);
 for(const bad of [{...file,databaseName:'other'},{...file,formatVersion:2},{...file,databaseVersion:3}])assert.throws(()=>validateBackup(bad));
 const missing=structuredClone(file);missing.records.app=missing.records.app.filter(row=>row.key!=='check-photo:photo-0-front');assert.throws(()=>validateBackup(missing),/Falta una foto/);
});
