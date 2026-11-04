import {test} from 'node:test';
import assert from 'node:assert/strict';
import {initialState} from '../src/domain.js';
import {createRoutinePlan,migrateRoutinePlan} from '../src/routinePlan.js';
import {saveRoutine,routineTargets} from '../src/routineTemplates.js';

test('revisión PPL respeta orden, técnicas y cantidades solicitadas en los cinco días',()=>{
 const routine=createRoutinePlan(),compact=day=>day.map(ex=>[ex.name,ex.sets,ex.technique]);
 assert.deepEqual(compact(routine[1]),[
  ['Press inclinado mancuernas',4,''],['Press banca',2,''],['Aperturas en polea',3,'rp'],['Elevaciones laterales polea',2,''],['Extensión tríceps tras nuca',2,'drop'],['Elevaciones laterales mancuerna',2,'drop'],['Fondos',2,'']]);
 assert.deepEqual(compact(routine[2]),[
  ['Curl bayesian',3,''],['Dominadas',3,'drop'],['Remo libre',2,''],['Remo en polea',2,'drop'],['Jalón al pecho',3,'drop'],['Deltoides posterior polea',2,'rp'],['Curl polea',2,'']]);
 assert.deepEqual(compact(routine[3]),[
  ['Extensiones de cuádriceps',2,'drop'],['Hack squat',3,''],['Femoral sentado',4,''],['Aductores máquina',2,''],['Hiperextensiones (glúteos)',2,''],['Sóleo máquina',2,''],['Crunch con disco',2,'']]);
 assert.deepEqual(compact(routine[5]),[
  ['Press inclinado mancuernas',3,''],['Jalón al pecho',2,'drop'],['Remo en polea',1,'drop'],['Curl bayesian',5,''],['Elevaciones laterales polea',2,'drop'],['Deltoides posterior polea',2,''],['Extensión tríceps tras nuca',2,'']]);
 assert.deepEqual(compact(routine[6]),[
  ['Prensa unilateral',3,''],['Gemelo en prensa',2,''],['Hack squat',2,'drop'],['Femoral sentado',2,'drop'],['Abductores máquina',4,''],['Hiperextensiones (glúteos)',2,''],['Crunch con disco',2,'']]);
 for(const day of routine.filter(day=>day.length)){assert.equal(day.length,7);assert.equal(day.reduce((sum,ex)=>sum+ex.sets,0),17);for(const ex of day)assert.ok(ex.setPlan.slice(0,-1).every(set=>!set.technique));}
 assert.equal(Object.values(routineTargets(routine)).reduce((a,b)=>a+b,0),85);
 assert.equal(routine[2][0].profileId,routine[5][3].profileId);
 assert.equal(routine[3][2].profileId,routine[6][3].profileId);
 assert.equal(routine[2][3].profileId,routine[5][2].profileId);
 assert.deepEqual(routine[6][2].setPlan.map(s=>[s.role,s.technique]),[['top',''],['backoff','drop']]);
});

test('actualizar plantilla no impone cambios; aplicación explícita conserva historial y pesos solo en coincidencias',()=>{
 const old=initialState(),ex=old.routine[1][1];old.routine[2][0]={...old.routine[2][0],name:'Curl mancuerna',equipment:'dumbbell',profileId:'old-curl'};
 old.profiles['old-curl']={workWeight:18,targetReps:8};old.profiles[ex.profileId].workWeight=65;
 old.logs=[{id:'historical-test',date:'2030-01-01',kind:'effective',exerciseId:ex.id,profileId:ex.profileId,exerciseName:ex.name,muscle:ex.muscle,equipment:ex.equipment,weight:65,reps:8}];
 const original=structuredClone(old);assert.equal(migrateRoutinePlan(old,'2030-02-01'),old);assert.deepEqual(old,original);
 // A changed movement starts without inheriting the old variant's reference.
 delete old.profiles[old.routine[5][3].profileId];
 const next=saveRoutine(old,createRoutinePlan(),'2030-02-01','ppl-torso-leg');
 assert.deepEqual(next.logs,original.logs);assert.equal(next.profiles[next.routine[1][1].profileId].workWeight,65);
 assert.equal(next.profiles[next.routine[2][0].profileId].workWeight,null);assert.equal(next.profiles['old-curl'].workWeight,18);
 assert.deepEqual(next.routineRevisions.at(-1).routine,old.routine);
});
