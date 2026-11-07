import {drizzle} from 'drizzle-orm/libsql';
import {getTursoDatabase} from '../app/turso';
import * as schema from './schema';
export function getDb(){return drizzle(getTursoDatabase().client,{schema});}
