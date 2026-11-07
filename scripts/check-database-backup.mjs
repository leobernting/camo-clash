import assert from 'node:assert/strict';
import {canExportDatabase} from '../app/database-backup.ts';
const token=crypto.randomUUID().replaceAll('-','')+crypto.randomUUID().replaceAll('-',''),setting=JSON.stringify({token,expires:2000});
assert.equal(await canExportDatabase(undefined,'Bearer '+token,1000),false);assert.equal(await canExportDatabase('invalid','Bearer '+token,1000),false);assert.equal(await canExportDatabase(setting,null,1000),false);assert.equal(await canExportDatabase(setting,'Bearer wrong',1000),false);assert.equal(await canExportDatabase(setting,'Bearer '+token,2000),false);assert.equal(await canExportDatabase(setting,'Bearer '+token,1999),true);
console.log('Passed database export access: disabled by default, malformed configuration, missing/incorrect token, exact expiry and valid secret.');
