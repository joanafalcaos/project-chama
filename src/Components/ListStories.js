import React, { useEffect, useState } from 'react';
import './ListStories.css';
import { Container, Typography, List, ListItemText, IconButton, CircularProgress } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

const ListStories = () => {
    const [stories, setStories] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchStories = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8080/stories', {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error('Erro na rede ao buscar histórias');
            }

            const data = await response.json();
            setStories(data.filter(story => story.active));
        } catch (error) {
            console.error('Erro ao buscar histórias:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

   
    const deactivateStory = async (id) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8080/stories/${id}/deactivate`, {
                method: 'PUT',
            });

            if (!response.ok) {
                throw new Error('Erro ao desativar a história');
            }

            
            setStories(stories.filter(story => story.id !== id));
        } catch (error) {
            console.error('Erro ao desativar a história:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStories();
    }, []);

    return (
        <Container maxWidth="false" disableGutters className="list-stories-container">
            <Typography variant="h4" gutterBottom>
                Relatos ativos
            </Typography>
            <Typography
                variant="body1"
                gutterBottom
                sx={{ color: 'aliceblue', padding: '5px' }}
            >
                Seus relatos ativos são:
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
                    {stories.map(story => (
                        <div className='list-itens' key={story.id}>
                            <ListItemText primary={story.description} />
                            <div className='divider' />
                            <IconButton 
                                aria-label="cancelar"
                                onClick={() => deactivateStory(story.id)}
                            >
                                <CancelIcon />
                            </IconButton>
                        </div>
                    ))}
                </List>
            )}
        </Container>
    );
};

export default ListStories;