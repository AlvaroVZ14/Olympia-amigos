// Entirely fictitious migration fixture; never derived from a user's backup.
import {initialState} from '../../src/domain.js';
import {PROFILE_DEFAULTS} from '../../src/profile.js';
import {MEASURES} from '../../src/measurements.js';
import {projectCollections} from '../../src/history.js';
import {BACKUP_STORES} from '../../src/backup.js';
export function personalBackup(jpeg='data:image/jpeg;base64,/9j/2Q=='){
 const state=initialState(),ex=state.routine[1][0];
 state.onboarding={status:'done'};
 state.personalProfile={...structuredClone(PROFILE_DEFAULTS),version:1,name:'Perfil ficticio de migración',age:28,heightCm:168,weightKg:68,sex:'female',date:'2030-01-01'};
 state.profileHistory=[{date:'2030-01-01',profile:structuredClone(state.personalProfile)}];
 state.profiles[ex.profileId]={...state.profiles[ex.profileId],workWeight:42.5,targetReps:9,notes:'Nota ficticia conservada'};
 state.routine[1][0].backoffPercent=12;state.routine[1][0].preparationOverride=3;
 state.logs=[];state.sessionMeta={};let day=new Date('2030-01-01T12:00:00Z'),sessions=0;
 while(sessions<40){const index=(day.getUTCDay()+6)%7,date=day.toISOString().slice(0,10),exercises=state.routine[index];
  if(exercises.length){sessions++;state.sessionMeta[date]={durationSeconds:3000+sessions,notes:'Sesión ficticia',startedAt:`${date}T17:00:00Z`,endedAt:`${date}T18:00:00Z`};
   for(const [i,exercise] of exercises.entries())for(let n=0;n<exercise.sets;n++)state.logs.push({id:`set-${sessions}-${i}-${n}`,date,exerciseId:exercise.id,profileId:exercise.profileId,exerciseName:exercise.name,muscle:exercise.muscle,equipment:exercise.equipment,kind:'effective',weight:40+n*2.5,reps:8,rpe:9,failure:false,restRealSeconds:135+n,createdAt:`${date}T17:10:00Z`});
   const parent=state.logs.at(-1);for(const kind of ['drop','rp'])state.logs.push({...parent,id:`${kind}-${sessions}`,kind,parentId:parent.id,reps:4,weight:kind==='drop'?28:parent.weight,restRealSeconds:kind==='drop'?12:18});
  }day.setUTCDate(day.getUTCDate()+1);
 }
 for(const kind of ['warmup','approach'])state.logs.push({...state.logs[0],id:`old-${kind}`,kind,weight:20,reps:10,failure:false});
 state.cardio=[{id:'bike-test',date:'2030-01-01',type:'Bici',minutes:16,intensity:'Suave'}];state.dailySteps={'2030-01-01':8100};
 state.journal={'2030-01-01':{weight:68,sleepHours:7.5,pain:'Molestia ficticia',stress:2}};
 state.measurements=['2030-01-01','2030-02-01'].map((date,i)=>({id:`measure-${i}`,date,values:Object.fromEntries(MEASURES.map((m,n)=>[m.key,30+n*7+i*.2]))}));
 state.monthlyChecks=['2030-01-01','2030-02-01'].map((date,i)=>({id:`check-${i}`,version:1,date,month:date.slice(0,7),year:date.slice(0,4),createdAt:`${date}T18:00:00Z`,weight:68+i,values:state.measurements[i].values,photos:Object.fromEntries(['front','side','back'].map(pose=>[pose,`photo-${i}-${pose}`]))}));
 state.meals=[{id:'food-test',date:'2030-01-01',name:'Comida ficticia',kcal:500,protein:30}];
 const rows=projectCollections(state),records=Object.fromEntries(BACKUP_STORES.map(key=>[key,[]]));
 records.app=[{key:'state',value:{...state,storageFormat:2}},{key:'custom-metadata',value:{retained:true}}];
 for(const check of state.monthlyChecks)for(const [pose,id] of Object.entries(check.photos))records.app.push({key:`check-photo:${id}`,value:{id,version:1,month:check.month,year:check.year,pose,width:1,height:1,dataUrl:jpeg}});
 for(const [key,list] of Object.entries(rows))records[key]=list.map(value=>({key:value.id,value}));
 const revision={id:'old-revision',session:structuredClone(rows.sessions[0]),sessionId:rows.sessions[0].id,date:rows.sessions[0].date,month:rows.sessions[0].month};records.sessionRevisions=[{key:revision.id,value:revision}];
 records.migrationBackups=[{key:'old-archive',value:{id:'old-archive',kind:'fixture',state:structuredClone(state)}}];
 return JSON.parse(JSON.stringify({format:'heavy-duty-backup',formatVersion:1,databaseVersion:2,databaseName:'heavy-duty-personal',records}));
}
