import React from 'react';
import { Card as MUICard, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';

function Card(props) {
  return (
    <MUICard sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia component="img" height="140" image={props.image}/><CardContent>
          <Typography gutterBottom variant="h5" component="div">{props.title}</Typography>
          <Typography variant="body2" color="text.secondary">{props.subtitle}</Typography>
        </CardContent>
      </CardActionArea>
    </MUICard>
  );
}

export default Card;
