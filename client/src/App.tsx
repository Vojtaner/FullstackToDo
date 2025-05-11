import React, { useState } from 'react';
import { TextField, Button, FormControl, FormHelperText } from '@mui/material';

const App: React.FC<{ addTodo: (text: string) => void }> = ({ addTodo }) => {
  const [text, setText] = useState('');
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!text.trim()) {
      setError(true);
      setHelperText('Please enter a to-do');
    } else {
      addTodo(text);
      setText('');
      setError(false);
      setHelperText('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', width: '300px' }}
    >
      <FormControl error={error} fullWidth>
        <TextField
          label="New To-Do"
          variant="outlined"
          value={text}
          onChange={(e) => setText(e.target.value)}
          error={error}
          helperText={helperText}
        />
        {error && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ marginTop: '10px' }}
      >
        Add Todo
      </Button>
    </form>
  );
};

export default App;
