import sqlite3 from "sqlite3";
import { open } from "sqlite";

// Abre conexão com o banco
export async function openDb() {
  return open({
    filename: "./dev.db",
    driver: sqlite3.Database,
  });
}
