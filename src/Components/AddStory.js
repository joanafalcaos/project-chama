import React, { useState } from 'react';
import './AddStory.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TextField, Button, Box } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0A0A33',
    },
  },
});

function AddStory() {
  const [relato, setRelato] = useState('');
  const [userId] = useState(1); // userId constante
  const [address, setAddress] = useState({
    zipCode: '',
    street: '',
    houseNumber: '',
    neighborhood: '',
    city: '',
  });

  const handleRelatoChange = (event) => {
    setRelato(event.target.value);
  };

  const handleAddressChange = (event) => {
    const { name, value } = event.target;
    setAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      description: relato,
      userId,
      address,
    };

    try {
      const response = await fetch('http://localhost:8080/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Relato enviado com sucesso!');

        setRelato('');
        setAddress({
          zipCode: '',
          street: '',
          houseNumber: '',
          neighborhood: '',
          city: '',
        });
      } else {
        console.error('Erro ao enviar o relato:', response.statusText);
      }
    } catch (error) {
      console.error('Erro de rede:', error);
    }
  };

  return (
    <div className="story-container">
      <h3>Identificou um foco de incêndio ou queimada? Relate aqui!</h3>
      <ThemeProvider theme={theme}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          className="form-container"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            minWidth: '500px',
            margin: 'auto',
          }}
        >
          <TextField
            label="CEP"
            variant="outlined"
            fullWidth
            name="zipCode"
            value={address.zipCode}
            onChange={handleAddressChange}
          />
          <TextField
            label="Rua"
            variant="outlined"
            fullWidth
            name="street"
            value={address.street}
            onChange={handleAddressChange}
          />
          <TextField
            label="Número"
            variant="outlined"
            fullWidth
            name="houseNumber"
            value={address.houseNumber}
            onChange={handleAddressChange}
          />
          <TextField
            label="Bairro"
            variant="outlined"
            fullWidth
            name="neighborhood"
            value={address.neighborhood}
            onChange={handleAddressChange}
          />
          <TextField
            label="Cidade"
            variant="outlined"
            fullWidth
            name="city"
            value={address.city}
            onChange={handleAddressChange}
          />
          <TextField
            label="Relato"
            variant="outlined"
            fullWidth
            required
            value={relato}
            multiline
            rows={4}
            onChange={handleRelatoChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="button"
          >
            Enviar
          </Button>
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default AddStory;