const express = require("express")
const mongoose = require("mongoose")
const env = require("dotenv")
const cors = require("cors")
env.config();

const app = express()
app.use(express.json())
app.use(cors());

mongoose.connect("mongodb://localhost:27017/")

const TodoSchema = new mongoose.Schema({
    title: String,
    description: String,
    // date: {type: Date, default: Date.now}
    date: String
})

const Todo = mongoose.model("todo", TodoSchema);

app.post("/", (req, res) => {
    const todo = new Todo(req.body)
    todo.save();
    res.json(todo);
})

app.get("/", async (req, res) => {
    const todos = await Todo.find();
    res.json(todos)
})

app.delete("/delete", async (req, res) => {
    const { id } = req.body;
    const todo = await Todo.findByIdAndDelete(id)
    res.json({ message: "Todo deleted successfully", todo });
})

app.put("/update", async (req, res) => {
    const { id, description } = req.body;
    console.log(description)
    const todo = await Todo.findByIdAndUpdate(id, { description }, { new: true })
    res.json({ message: "Todo updated successfully", todo });
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));