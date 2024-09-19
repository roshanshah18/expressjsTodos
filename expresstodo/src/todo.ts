import bodyParser from "body-parser";
import express, { NextFunction, Request, Response } from "express";
const PORT = 4000;
//todos
//create
//gettodo
//deletetodo
//updatetodo
//getalltodo
type TTodo = {
  id: number;
  name: string;
};

let todos: TTodo[] = [
  {
    id: 1,
    name: "ram",
  },
  {
    id: 2,
    name: "shyam",
  },
  {
    id: 3,
    name: "hari",
  },
];
const app = express();
app.use(bodyParser.json()); //req.body depends on body-parser
//createtodo
function createTodoMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Name is required",
      });
    }
    const newTodo = {
      id: todos.length + 1,
      name,
    };

    todos.push(newTodo);

    res.status(201).json({
      message: "Todo created successfully",
      data: newTodo,
    });
  } catch (error) {
    console.log("Error Occured", error);
    res.status(400).json({
      message: "Error Occured while creating todo",
    });
  }
}
//gettodo
function getTodoMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const todoId = parseInt(id);

    const todo = todos.filter((t) => t.id === todoId);

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    res.status(200).json({
      todo,
    });
  } catch (error) {
    console.log("Error Occured", error);
    res.status(400).json({
      message: "Error Occured while getting todo",
    });
  }
}

//deletetodo
function deletetodoMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const todoIdNum = parseInt(id);

    const filteredArray = todos.filter((todo) => {
      if (todo.id === todoIdNum) {
        return false;
      }
      return true;
    });
    todos = filteredArray;
    res.status(200).json({
      message: "Todo delete successfully",
    });
  } catch (error) {
    console.log("Error Occured", error);
    res.status(400).json({
      message: "Error Occured while deleting todo",
    });
  }
}
//updatetodo
function updateTodoMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const todoId = parseInt(id);
    const { name } = req.body;

    if (!name) {
      res.status(400).json({ message: "Name is required to update the todo" });
    }

    const existingTodo = todos.find((t) => t.id === todoId);

    if (!existingTodo) {
      res.status(404).json({ message: "Todo not found" });
    }

    todos = todos.map((t) => {
      if (t.id === todoId) {
        return { ...t, name };
      }
      return t;
    });
    res.status(200).json({
      message: "Todo updated successfully",
      todo: { id: todoId, name },
    });
  } catch (error) {
    console.log("Error Occured", error);
    res.status(400).json({
      message: "Error Occured while updating todo",
    });
  }
}

//getalltodo
function getallTodoMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).json({
      data: todos,
    });
  } catch (error) {
    console.log("Error Occured", error);
    res.status(400).json({
      message: "Error Occured while getting all todo",
    });
  }
}

app.post("/create-todo", createTodoMiddleware);
app.get("/get-todo/:id", getTodoMiddleware);
app.delete("/delete-todo/:id", deletetodoMiddleware);
app.put("/update-todo/:id", updateTodoMiddleware);
app.get("/getall-todo", getallTodoMiddleware);

app.listen(PORT, () => {
  console.log("Server is running on Port:", PORT);
});

// note taking app
// create note
