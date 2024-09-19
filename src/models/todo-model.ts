import { resourceUsage } from "process";

type TTodoStatus = "not_started" | "in_progress" | "done";

type TTodo = {
  id: number;
  name: string;
  status: TTodoStatus;
};

let todos: TTodo[] = [
  {
    id: 1,
    name: "Reading about mvc pattern",
    status: "in_progress",
  },
];

export class TodoModel {
  constructor() {
    console.log("todo constructor is called");
  }

  getTodo(todoId: number) {
    const todo = todos.find((todo) => todo.id === todoId);
    return todo;
  }

  createTodo({
    name,
    status,
  }: {
    name: string;
    status: "not_started" | "in_progress" | "done";
  }) {
    const newTodo = {
      id: todos.length + 1,
      name,
      status,
    };
    todos.push(newTodo);
    return newTodo;
  }

  getallTodo() {
    return todos;
  }

  deleteTodo(todoId: number) {
    const filteredArray = todos.filter((todo) => {
      if (todo.id === todoId) {
        return false;
      }
      return true;
    });
    return filteredArray;
  }

  updateTodo(todoId: number, name: string, status: TTodoStatus) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          id: todoId,
          name,
          status,
        };
      } else {
        return todo;
      }
    });
    todos = updatedTodos;
    return todos;
  }
}
