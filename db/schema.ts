// Intentionally empty by default.
// Add Drizzle tables here when the site actually needs a database.
// See examples/d1/db/schema.ts for an opt-in example.
import {sqliteTable,text,integer} from 'drizzle-orm/sqlite-core';
export const records=sqliteTable('records',{id:text('id').primaryKey(),data:text('data').notNull(),version:integer('version').notNull().default(0)});
export const trades=sqliteTable('trades',{id:text('id').primaryKey(),maker:text('maker').notNull(),makerName:text('maker_name').notNull(),offer:integer('offer').notNull(),want:integer('want').notNull(),status:text('status').notNull().default('open'),taker:text('taker'),created:integer('created').notNull()});
