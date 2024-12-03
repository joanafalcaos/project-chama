import React, { useState } from 'react';
import './AddStory.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TextField, Button, Box } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0A0A33',
    },
  },
});

function AddStory() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [relato, setRelato] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleRelatoChange = (event) => {
    setRelato(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log('Formulário enviado!');

    const formData = new FormData();
    formData.append('description', relato);

    if (selectedFile) {
      formData.append('image', selectedFile);
    }

    try {
      const response = await fetch('http://localhost:8080/api/reports/addReport', {
        method: 'POST',
        body: formData,
      });

      // if (response.ok) {
      //   console.log('Relato enviado com sucesso!');
      // } else {
      //   console.error('Erro ao enviar o relato:', response.statusText);
      // }
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
            label="Relato"
            variant="outlined"
            fullWidth
            required
            value={relato}
            multiline
            rows={4}
            onChange={handleRelatoChange}
          />

          <input 
            accept="image/*" 
            style={{ display: 'none' }} 
            id="upload-photo" 
            type="file" 
            onChange={handleFileChange}
          />
          <label htmlFor="upload-photo">
            <Button 
              variant="contained" 
              color="primary" 
              component="span"
              className="button"
              startIcon={<UploadIcon />}
            >
              Upload de Foto
            </Button>
          </label>

          {selectedFile && <p className='img-name'>Arquivo selecionado: {selectedFile.name}</p>}

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