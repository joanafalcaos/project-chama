import React, { useEffect, useState } from 'react';
import './ListStories.css';
import { Container, Typography, List, ListItemText, IconButton, CircularProgress } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

const ListStories = () => {
    const [stories, setStories] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchReports = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8080/api/reports', {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error('Erro na rede ao buscar relatos');
            }

            const data = await response.json();

            // Filtrando apenas os relatos com userId = 1
            setStories(data.filter((report) => report.userId === 1));
        } catch (error) {
            console.error('Erro ao buscar relatos:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const deactivateReport = async (id) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8080/api/reports/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Erro ao desativar o relato');
            }

            // Atualizando a lista local removendo o relato desativado
            setStories((prevStories) => prevStories.filter((report) => report.id !== id));
            console.log(`Relato com ID ${id} desativado com sucesso.`);
        } catch (error) {
            console.error('Erro ao desativar o relato:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    return (
        <Container maxWidth="md" className="list-stories-container">
            <Typography variant="h4" gutterBottom>
                Relatos ativos
            </Typography>
            {error && (
                <Typography variant="body1" color="error">
                    {error}
                </Typography>
            )}
            {loading ? (
                <CircularProgress />
            ) : (
                <>
                    {stories.length > 0 ? (
                        <>
                            <Typography
                                variant="body1"
                                gutterBottom
                                sx={{ color: '#0d0b3f', padding: '5px' }}
                            >
                                Seus relatos ativos são:
                            </Typography>
                            <List>
                                {stories.map((story) => (
                                    <div className="list-itens" key={story.id}>
                                        <ListItemText primary={story.description} />
                                        <div className="divider" />
                                        <IconButton
                                            aria-label="cancelar"
                                            onClick={() => deactivateReport(story.id)}
                                            sx={{
                                                color: 'red', // Altere para a cor desejada
                                            }}
                                        >
                                            <CancelIcon />
                                        </IconButton>
                                    </div>
                                ))}
                            </List>
                        </>
                    ) : (
                        <Typography
                            variant="body1"
                            gutterBottom
                            sx={{ color: '#0d0b3f', padding: '5px' }}
                        >
                            Você não possui relatos ativos.
                        </Typography>
                    )}
                </>
            )}
        </Container>
    );
};

export default ListStories;