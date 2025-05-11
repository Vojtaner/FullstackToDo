import { Request, Response } from "express";
import express from "express";
import cors from "cors";

const app = express();
const PORT = 3005;

app.use(
  cors({
    origin: "http://localhost:3009",
  })
);
app.use(express.json());

let todos: { id: number; text: string }[] = [
  { id: 1, text: "Vyčistit záchod" },
  { id: 2, text: "Jít nakupovat" },
];

app.get("/todos", (req: Request, res: Response) => {
  res.json(todos);
});

app.post("/todos", (req: Request, res: Response): any => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Text is required" });

  const newTodo = { id: Date.now(), text };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
