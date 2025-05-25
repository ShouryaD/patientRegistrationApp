import { PGlite } from "@electric-sql/pglite";

let dbInstance = null;

export async function getDb() {
  if (dbInstance) return dbInstance;
  dbInstance = await PGlite.create("idb://patients-db-new");  // standard practice
  return dbInstance;
}

// Initializing tables if they don't exist (DO NOT DROP TABLES!)
export async function initDb() {
  const db = await getDb();
  await db.query(`
    CREATE TABLE IF NOT EXISTS patients (
      id SERIAL PRIMARY KEY,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      phone TEXT NOT NULL,
      allergies TEXT NOT NULL,
      concern TEXT NOT NULL,
      blood_group TEXT NOT NULL
    );
  `);
  await db.query(`
    CREATE TABLE IF NOT EXISTS sql_history (
      id SERIAL PRIMARY KEY,
      command TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);
  return db;
}

// Helper fn for form inserts
export function buildInsertPatientSQL(form) {
  const columns = Object.keys(form)
  const values = columns.map(f => `'${String(form[f]).replace(/'/g, "''")}'`).join(", ");
  return `INSERT INTO patients (${columns.join(", ")}) VALUES (${values})`;
}

export function escapeSqlString(str) {
  return String(str).replace(/'/g, "''");
}

// used during multi tab when we have to reset DB instance to force reload from IndexedDB
export function resetDb() {
  dbInstance = null;
}