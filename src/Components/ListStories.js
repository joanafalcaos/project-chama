import React, { useEffect, useState } from 'react';
import './ListStories.css';
import {
    Container,
    Typography,
    List,
    ListItemText,
    IconButton,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
} from '@mui/material';
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
            const filteredData = data.filter((report) => report.status === true);

            if (isBombeiro) {
                setStories(filteredData);
            } else if (userId) {
                setStories(filteredData.filter((report) => report.userId === userId));
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

    const handleEncerrar = async (id) => {
        try {
            // Pegando o valor atual de isFire
            const story = stories.find((s) => s.id === id);
            const isFire = story?.isFire || 'N'; // Valor padrão é 'N'

            const response = await fetch(
                `http://localhost:8080/api/reports/${id}?ativo=N&isFire=${isFire}`,
                {
                    method: 'PUT',
                }
            );

            if (!response.ok) {
                throw new Error('Erro ao encerrar o relato');
            }

            console.log(`Relato com ID ${id} encerrado com sucesso.`);
            setStories((prevStories) => prevStories.filter((story) => story.id !== id));
        } catch (error) {
            console.error('Erro ao encerrar o relato:', error);
            setError(error.message);
        }
    };

    const handleInvalidar = async (id) => {
        try {
            const response = await fetch(
                `http://localhost:8080/api/reports/${id}?ativo=N&isFire=N`,
                {
                    method: 'PUT',
                }
            );

            if (!response.ok) {
                throw new Error('Erro ao invalidar o relato');
            }

            console.log(`Relato com ID ${id} invalidado com sucesso.`);
            setStories((prevStories) => prevStories.filter((story) => story.id !== id));
        } catch (error) {
            console.error('Erro ao invalidar o relato:', error);
            setError(error.message);
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
                <Dialog open={true} onClose={handleCloseDetails}>
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