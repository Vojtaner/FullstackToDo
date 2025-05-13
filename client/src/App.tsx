import React, { useEffect, useState } from 'react';
import { TextField, Button, FormControl, Typography } from '@mui/material';

const App = () => {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState<{ id: number; text: string }[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:8080/todos');
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      console.error('Error fetching todos:', err);
    }
  };

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!text.trim()) {
      setError('Please enter a to-do');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) throw new Error('Failed to add todo');

      const newTodo = await response.json();
      setTodos((prev) => [...prev, newTodo]);
      setText('');
      setError('');
    } catch (err) {
      console.error('Error adding todo:', err);
      setError('Failed to add todo');
    }
  };

  return (
    <>
      <form
        onSubmit={handleAddTodo}
        style={{ display: 'flex', flexDirection: 'column', width: '300px' }}
      >
        <FormControl fullWidth error={!!error}>
          <TextField
            label="New To-Do"
            variant="outlined"
            value={text}
            onChange={(e) => setText(e.target.value)}
            helperText={error || 'Vyplň úkol'}
          />
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: '10px' }}
        >
          Ulož úkol
        </Button>
      </form>

      {todos.map((todo) => (
        <Typography key={todo.id}>{todo.text}</Typography>
      ))}

      <Button
        onClick={fetchTodos}
        variant="outlined"
        color="secondary"
        style={{ marginTop: '10px' }}
      >
        Načti úkoly
      </Button>
    </>
  );
};

export default App;
