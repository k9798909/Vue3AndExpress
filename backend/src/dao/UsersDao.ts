import db from "../config/db";
import Users from "../models/Users";

export function findByAccount(account: string): Promise<Users | null> {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM users WHERE account = ?`;
    db.get<Users>(sql, [account], (err, row) => {
      if (err) {
        reject(err);
        return;
      }

      if (!row) {
        resolve(null);
        return;
      }

      const data: Users = {
        id: row.id,
        account: row.account,
        password: row.password,
      };

      resolve(data);
    });
  });
}
