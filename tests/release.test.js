import {test} from 'node:test';
import assert from 'node:assert/strict';
import {checkRelease} from '../scripts/check-release.mjs';
test('publicaciones requieren semver creciente y cobertura si cambia el almacenamiento',()=>{
 for(const version of ['1.1.0','1.0.9','v1.2.0','01.2.0','1.2.0-next'])assert.throws(()=>checkRelease('1.1.0',version,[]));
 for(const version of ['1.1.1','1.2.0','2.0.0'])assert.doesNotThrow(()=>checkRelease('1.1.0',version,[]));
 assert.throws(()=>checkRelease('1.1.0','1.2.0',['src/schema.js','tests/unrelated.test.js']),/migración/);
 assert.doesNotThrow(()=>checkRelease('1.1.0','1.2.0',['src/db.js','tests/browser/backup-migration.spec.js']));
});
