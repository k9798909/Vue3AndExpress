import * as fs from "fs";
import sqlite3, { Database } from "sqlite3";
import path from "path";
import TodoItem from "../models/TodoItem";

sqlite3.verbose();

const db: Database = new sqlite3.Database(":memory:");
db.serialize(() => {
  createTable();
  initTableData();
});

export default db;

/**
 * 創建表格
 * @param db
 */
function createTable(): void {
  db.run(`
    CREATE TABLE todoitem (
      todoItemId INTEGER PRIMARY KEY,
      name TEXT,
      isComplete INTEGER
    )
  `);

  db.run(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY,
      account TEXT,
      password TEXT
    )
  `);
}

/**
 * 初始化表格資料
 * @param db
 */
function initTableData(): void {
  const todoList: TodoItem[] = readTodoList();
  const todoStmt = db.prepare(
    `INSERT INTO todoitem (todoItemId, name, isComplete) VALUES (?, ?, ?)`
  );

  todoList.forEach((todoItem) => {
    todoStmt.run([todoItem.todoItemId, todoItem.name, todoItem.isComplete]);
  });

  todoStmt.finalize();

  const usersStmt = db.prepare(
    `INSERT INTO users (id, account, password) VALUES (?, ?, ?)`
  );
  usersStmt.run([1, "admin", "admin"]);
  usersStmt.finalize();
}

/**
 * 從 data.json 讀取待辦事項清單
 * @returns TodoItem[]
 */
function readTodoList(): TodoItem[] {
  const dataFilePath: string = path.join(
    __dirname,
    "..",
    "static",
    "data.json"
  );
  const data: Buffer = fs.readFileSync(dataFilePath);
  return JSON.parse(data.toString());
}
