import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; 

const Layout = ({ children }) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open);
  };

  return (
    <div>
      {/* Barra de navegação superior */}
      <AppBar position="sticky" sx={{ backgroundColor: '#fff', boxShadow: 'none' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          {/* Ícone de menu à esquerda */}
          <IconButton edge="start" sx={{ color: '#0A0A33' }} onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>

          {/* Botões de navegação alinhados à direita */}
          <div style={{ marginLeft: 'auto', display: 'flex' }}>
            <Button component={Link} to="/" sx={{ color: '#0A0A33', fontWeight: 'bold', marginLeft: '20px' }}>
              Home
            </Button>
            <Button component={Link} to="/stories" sx={{ color: '#0A0A33', fontWeight: 'bold', marginLeft: '20px' }}>
              Registros
            </Button>
            <Button component={Link} to="/mapa" sx={{ color: '#0A0A33', fontWeight: 'bold', marginLeft: '20px' }}>
              Mapa
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      {/* Drawer com links de navegação */}
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <List>
          <ListItem button component={Link} to="/sobre" onClick={toggleDrawer(false)}>
            <ListItemText primary="Sobre" />
          </ListItem>
        </List>
      </Drawer>

      {/* Conteúdo da página */}
      <div style={{ padding: '20px' }}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
