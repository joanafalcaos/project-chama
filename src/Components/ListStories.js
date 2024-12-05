import React, { useEffect, useState } from 'react';
import './ListStories.css';
import { Container, Typography, List, ListItemText, IconButton, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

const ListStories = () => {
    const [stories, setStories] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);
    const [selectedStory, setSelectedStory] = useState(null);
    const [isBombeiro, setIsBombeiro] = useState(false);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser && storedUser.userId) {
            setUserId(storedUser.userId);
            if (!storedUser.cpf) {
                setIsBombeiro(true);
            }
        }
    }, []);

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

            if (isBombeiro) {
                setStories(data); 
            } else if (userId) {
                setStories(data.filter((report) => report.userId === userId));
            } else {
                setError('User ID não encontrado');
            }
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

            setStories((prevStories) => prevStories.filter((report) => report.id !== id));
            console.log(`Relato com ID ${id} desativado com sucesso.`);
        } catch (error) {
            console.error('Erro ao desativar o relato:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleStoryClick = (story) => {
        setSelectedStory(story);
    };

    const handleCloseDetails = () => {
        setSelectedStory(null);
    };

    const handleEncerrar = (id) => {
        console.log(`Relato com ID ${id} encerrado.`);
    };

    const handleInvalidar = (id) => {
        console.log(`Relato com ID ${id} invalidado.`);
    };

    useEffect(() => {
        if (userId !== null) {
            fetchReports();
        }
    }, [userId, isBombeiro]);
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
                <List>
                    {stories.map((story) => (
                        <div className="list-itens" key={story.id}>
                            <ListItemText
                                primary={story.description}
                                onClick={() => handleStoryClick(story)}
                            />
                            <div className="divider" />
                            {!isBombeiro && (
                                <IconButton
                                    aria-label="cancelar"
                                    onClick={() => deactivateReport(story.id)}
                                    sx={{
                                        color: 'red',
                                    }}
                                >
                                    <CancelIcon />
                                </IconButton>
                            )}

                            {isBombeiro && (
                                <>
                                    <Button
                                        onClick={() => handleEncerrar(story.id)}
                                        color="secondary"
                                    >
                                        Encerrar
                                    </Button>
                                    <Button
                                        onClick={() => handleInvalidar(story.id)}
                                        color="secondary"
                                    >
                                        Invalidar
                                    </Button>
                                </>
                            )}
                        </div>
                    ))}
                </List>
            )}

            {selectedStory && (
                <Dialog
                    open={true}
                    onClose={handleCloseDetails}
                >
                    <DialogTitle>Detalhes do Relato</DialogTitle>
                    <DialogContent>
                        <Typography variant="body1"><strong>Descrição:</strong> {selectedStory.description}</Typography>
                        <Typography variant="body1"><strong>Endereço:</strong></Typography>
                        <Typography variant="body1"><strong>CEP:</strong> {selectedStory.address.zipCode}</Typography>
                        <Typography variant="body1"><strong>Rua:</strong> {selectedStory.address.street}</Typography>
                        <Typography variant="body1"><strong>Número:</strong> {selectedStory.address.houseNumber}</Typography>
                        <Typography variant="body1"><strong>Bairro:</strong> {selectedStory.address.neighborhood}</Typography>
                        <Typography variant="body1"><strong>Cidade:</strong> {selectedStory.address.city}</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDetails} color="primary">
                            Fechar
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </Container>
    );
};

export default ListStories;