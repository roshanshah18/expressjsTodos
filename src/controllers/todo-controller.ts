import { NextFunction, Request, Response } from "express";
import { TodoModel } from "../models/todo-model";

/**
 * This file contains code related to todo controller
 */

export function getTodoController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const todoId = req.query.todoId;

  if (!todoId) {
    next("Please provide valid todoId");
    return;
  }

  const myTodoModel = new TodoModel();

  const todo = myTodoModel.getTodo(parseInt(todoId as string));

  if (!todo) {
    res.status(404).json({
      messagge: "todo not found",
    });
    return;
  }

  res.json({
    data: todo,
  });
}

export function createTodoController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const tododata = req.body;

  const createModel = new TodoModel();

  const createdtodo = createModel.createTodo({
    name: tododata.name,
    status: tododata.status,
  });

  res.status(201).json({
    message: "Todo created successfully",
    data: createdtodo,
  });
}

export function updateTodoController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = req.params.id;
  const status = req.body.status;
  const name = req.body.name;

  if (!id) {
    res.status(404).json({
      messagge: "todo not found",
    });
    return;
  }

  const updateModel = new TodoModel();
  const todo = updateModel.updateTodo(parseInt(id), name, status);

  res.json({
    data: todo,
  });
}

export function deleteTodoController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const todoId = req.query.todoId;

  if (!todoId) {
    next("Please provide valid todoId");
    return;
  }

  const deleteTodoModel = new TodoModel();

  const todo = deleteTodoModel.deleteTodo(parseInt(todoId as string));

  if (!todo) {
    res.status(404).json({
      messagge: "todo not found",
    });
    return;
  }

  res.json({
    data: todo,
  });
}

export function getAllTodoController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const creategetallModel = new TodoModel();

  const getallModel = creategetallModel.getallTodo();

  res.status(200).json({
    message: "Getall Todo successfull",
    data: getallModel,
  });
}
