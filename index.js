const express = require("express");

const app = express();

const todoList = require("./routes/TodoList/todoList");

app.use(express.json());

app.use(todoList);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server is Started");
});