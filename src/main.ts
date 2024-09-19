import express from "express";
import {
  createTodoController,
  deleteTodoController,
  getAllTodoController,
  getTodoController,
  updateTodoController,
} from "./controllers/todo-controller";
import bodyParser from "body-parser";

const PORT = 4000;

const app = express();

app.use(bodyParser.json());
// todo routes

// get-todo

// request -> controller -> model
// controller -> response
app.get("/get-todo", getTodoController);
// // create-todo
app.post("/create-todo", createTodoController);
// // update-todo
app.put("/update-todo/:id", updateTodoController);
// // delete-todo
app.delete("/delete-todo", deleteTodoController);
// // get-all-todos
app.get("/getall-todo", getAllTodoController);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
