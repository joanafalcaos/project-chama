import React, { useEffect, useState } from 'react';
import './ListStories.css';
import { Container, Typography, List, ListItemText, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

const ClosedStories = () => {
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
                setIsBombeiro(true); // Se o CPF não está presente, é bombeiro
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

            const closedReports = data.filter((report) => report.status === false || report.status === 'false');

            if (isBombeiro) {
                setStories(closedReports);
            } else if (userId) {
                setStories(closedReports.filter((report) => report.userId === userId));
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

    const handleStoryClick = (story) => {
        setSelectedStory(story);
    };

    const handleCloseDetails = () => {
        setSelectedStory(null);
    };

    useEffect(() => {
        if (userId !== null) {
            fetchReports();
        }
    }, [userId, isBombeiro]);

    return (
        <Container maxWidth="md" className="list-stories-container">
            <Typography variant="h4" gutterBottom>
                Relatos Fechados
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

export default ClosedStories;
