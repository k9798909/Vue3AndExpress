import { Router } from "express";
import * as TodoItemController from "../controllers/TodoItemController";
import * as UsersController from "../controllers/UsersController";

const router: Router = Router();
router.get("/api/todoitem", TodoItemController.findAll);
router.get("/api/todoitem/:id", TodoItemController.findById);
router.post("/api/todoitem", TodoItemController.create);
router.put("/api/todoitem/:id", TodoItemController.edit);
router.delete("/api/todoitem/:id", TodoItemController.remove);

router.post("/api/auth/verify", UsersController.verify);
router.post("/api/auth/login", UsersController.login);
export default router;