import db from "../config/db";
import TodoItem from "../models/TodoItem";

/**
 * 找尋全部的待辦事項
 * @param request
 * @param response
 */
export const findAll = async (): Promise<TodoItem[]> => {
  return new Promise((resolve, reject) => {
    db.all<TodoItem>(`SELECT * FROM todoitem`, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      let data: TodoItem[] = rows.map((row) => {
        return {
          todoItemId: row.todoItemId,
          name: row.name,
          isComplete: row.isComplete,
        };
      });
      resolve(data);
    });
  });
};

/**
 * 找尋指定的待辦事項
 * @param request
 * @param response
 * @returns
 */
export const findById = async (todoItemId: string): Promise<TodoItem|null> => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM todoitem WHERE todoItemId = ?`;
    db.get<TodoItem>(sql, [todoItemId], (err, row) => {
      if (err) {
        reject(err);
        return;
      }

      if (!row) {
        resolve(null);
        return;
      }

      const data: TodoItem = {
        todoItemId: row.todoItemId,
        name: row.name,
        isComplete: row.isComplete,
      };

      resolve(data);
    });
  });
};

/**
 * 新增待辦事項
 * @param todoItem
 */
export const insert = async (todoItem: TodoItem): Promise<void> => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO todoitem (todoItemId, name, isComplete) VALUES (?, ?, ?)`;
    db.run(sql, [todoItem.todoItemId, todoItem.name, todoItem.isComplete], (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

/**
 * 更新待辦事項
 * @param todoItem
 */
export const update = async (todoItem: TodoItem): Promise<void> => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE todoitem SET name = ?, isComplete = ? WHERE todoItemId = ?`;
    db.run(sql, [todoItem.name, todoItem.isComplete, todoItem.todoItemId], (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

/**
 * 刪除待辦事項
 * @param todoItemId
 */
export const remove = async (todoItemId: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM todoitem WHERE todoItemId = ?`;
    db.run(sql, [todoItemId], (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}
