import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { AppBar, Toolbar, Button, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; 
import LogoutIcon from '@mui/icons-material/Logout';  

const Layout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open);
  };

  // Função de logout
  const handleLogout = () => {
    // Limpar os dados de autenticação (exemplo: token do localStorage)
    localStorage.removeItem('authToken');
    
    // Redirecionar para a tela de login ou página inicial
    navigate('/login'); 
  };

  return (
    <div>
      {/* Barra de navegação superior */}
      <AppBar position="sticky" sx={{ backgroundColor: '#0A0A33', boxShadow: 'none' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          {/* Ícone de menu à esquerda */}
          <IconButton edge="start" sx={{ color: '#ffff' }} onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>

          {/* Botões de navegação alinhados à direita */}
          <div style={{ marginLeft: 'auto', display: 'flex' }}>
            <Button component={Link} to="/" sx={{ color: '#ffff', fontWeight: 'bold', marginLeft: '20px' }}>
              Home
            </Button>
            <Button component={Link} to="/stories" sx={{ color: '#ffff', fontWeight: 'bold', marginLeft: '20px' }}>
              Registros
            </Button>
            <Button component={Link} to="/mapa" sx={{ color: '#ffff', fontWeight: 'bold', marginLeft: '20px' }}>
              Mapa
            </Button>
            <Button component={Link} to="/profile" sx={{ color: '#ffff', fontWeight: 'bold', marginLeft: '20px' }}>
              Perfil
            </Button>
            {/* Botão de Logout com ícone */}
            <IconButton onClick={handleLogout} sx={{ color: '#ffff', marginLeft: '20px' }}>
              <LogoutIcon />
            </IconButton>
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
