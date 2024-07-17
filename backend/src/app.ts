import express, { Express } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes";
import "dotenv/config";
import { errorHandling, authorizeFilter } from "./middleware";

const PORT = process.env.PORT;

const app: Express = express(); // 建立 Web 伺服器
app.use(bodyParser.json()); // 以 body-parser 模組解析表單與JSON資料
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors()); // 開放跨域使用
app.use(authorizeFilter);
app.use(router);
app.use(errorHandling);
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
