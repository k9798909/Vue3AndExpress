import { NextFunction, Request, Response } from "express";
import TodoItem from "../models/TodoItem";
import * as TodoItemDao from "../dao/TodoItemDao";

interface TodoItemDto {
  todoItemId: number;
  name: string;
  isComplete: boolean;
}

/**
 * 找尋全部的待辦事項
 * @param request
 * @param response
 */
export async function findAll(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    let data: TodoItemDto[] = (await TodoItemDao.findAll()).map((row) => {
      return {
        todoItemId: row.todoItemId,
        name: row.name,
        isComplete: row.isComplete == 1,
      };
    });
    response.set("Content-Type", "application/json");
    response.send(data);
  } catch (error: any) {
    next(error);
  }
}

/**
 * 找尋指定的待辦事項
 * @param request
 * @param response
 * @returns
 */
export async function findById(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const todoItem: TodoItem | null = await TodoItemDao.findById(
      request.params.id
    );

    if (!todoItem) {
      response.status(404).send("Not Found");
      return;
    }

    const data: TodoItemDto = {
      todoItemId: todoItem.todoItemId,
      name: todoItem.name,
      isComplete: todoItem.isComplete == 1,
    };

    response.set("Content-Type", "application/json");
    response.send(data);
  } catch (error) {
    next(error);
  }
}

/**
 * 創建新的待辦事項
 * @param request
 * @param response
 */
export async function create(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { name, isComplete }: TodoItemDto = request.body;
    const todoItem: TodoItem = {
      todoItemId: Number.parseInt(Date.now().toString()),
      name: name,
      isComplete: isComplete ? 1 : 0,
    };
    await TodoItemDao.insert(todoItem);
    response.send("row create.");
  } catch (error: any) {
    next(error);
  }
}

/**
 * 修改指定的待辦事項
 * @param request
 * @param response
 */
export async function edit(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { name, isComplete }: TodoItemDto = request.body;
    const id: string = request.params.id;
    const todoItem: TodoItem = {
      todoItemId: Number.parseInt(id),
      name: name,
      isComplete: isComplete ? 1 : 0,
    };
    TodoItemDao.update(todoItem);
    response.send("row updated.");
  } catch (error: any) {
    next(error);
  }
}

/**
 * 刪除指定的待辦事項
 * @param request
 * @param response
 * @returns
 */
export async function remove(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const id: string = request.params.id;
    await TodoItemDao.remove(id);
    response.send("row deleted.");
  } catch (error: any) {
    next(error);
  }
}
