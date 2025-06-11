// lib/sqlSchema.js
import fs from 'fs'
import path from 'path'

export const SQL_SCHEMA = fs.readFileSync(path.resolve(process.cwd(), 'schema.sql'), 'utf-8');