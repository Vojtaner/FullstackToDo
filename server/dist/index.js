import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());
app.get("/todos", async (_req, res) => {
    const todos = await prisma.todo.findMany();
    res.json(todos);
});
app.post("/todos", async (req, res) => {
    const { text } = req.body;
    if (!text)
        return res.status(400).json({ error: "Text is required" });
    const newTodo = await prisma.todo.create({
        data: { text },
    });
    res.status(201).json(newTodo);
});
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map