import express from "express";
import cors from "cors";
const app = express();
const PORT = 3005;
app.use(cors({
    origin: "http://localhost:3009",
}));
app.use(express.json());
let todos = [
    { id: 1, text: "Vyčistit záchod" },
    { id: 2, text: "Jít nakupovat" },
];
app.get("/todos", (req, res) => {
    res.json(todos);
});
app.post("/todos", (req, res) => {
    const { text } = req.body;
    if (!text)
        return res.status(400).json({ error: "Text is required" });
    const newTodo = { id: Date.now(), text };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map