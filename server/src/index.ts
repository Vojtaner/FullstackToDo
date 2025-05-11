import { Request, Response } from "express";
import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const app = express();

const prisma = new PrismaClient();
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
app.get("/todos", async (_req: Request, res: Response) => {
  const todos = await prisma.todo.findMany();
  res.json(todos);
});

app.post("/todos", async (req: Request, res: Response): Promise<any> => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Text is required" });

  const newTodo = await prisma.todo.create({
    data: { text },
  });

  res.status(201).json(newTodo);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
