import React, { useState } from 'react';
import { TextField, Button, Typography, Container, CircularProgress } from '@mui/material';
import './AddStory.css';

const AddStory = () => {
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/stories/addStorie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: story }),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar a história');
      }

      const data = await response.json();
      console.log('História enviada com sucesso:', data);
      setStory('');
      setError('');
    } catch (error) {
      console.error('Erro:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="false" disableGutters className="add-story-container">
      <Typography variant="h4" gutterBottom>
        Relate aqui um foco de queimada ou incêndio!
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
        sx={{ color: 'aliceblue', padding: '5px' }}
      >
        Caso tenha encontrado algum foco de queimada ou incêndio, denuncie aqui!
      </Typography>
      <div className="form-box">
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <TextField
            style={{ width: '700px' }}
            id="storyInput"
            label="Descreva sua história"
            multiline
            rows={4}
            value={story}
            onChange={(e) => setStory(e.target.value)}
            required
            variant="outlined"
            placeholder="Digite aqui sua descrição..."
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: '16px', width: '80px' }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Enviar'}
          </Button>
        </form>
        {error && <Typography color="error">{error}</Typography>}
      </div>
    </Container>
  );
};

export default AddStory;