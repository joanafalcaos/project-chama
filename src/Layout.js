import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {AppBar,Toolbar,IconButton,Drawer,List,ListItem,ListItemIcon,ListItemText,Button,Divider,Box,} from '@mui/material';
import {Menu as MenuIcon, Home as HomeIcon, Whatshot as FireIcon, Map as MapIcon, Person as PersonIcon, Info as InfoIcon, Logout as LogoutIcon} from '@mui/icons-material';

const Layout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (isOpen) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const menuOptions = [
    { label: 'Home', icon: <HomeIcon />, path: '/' },
    { label: 'Registros', icon: <FireIcon />, path: '/stories' },
    { label: 'Mapa', icon: <MapIcon />, path: '/mapa' },
    { label: 'Perfil', icon: <PersonIcon />, path: '/profile' },
  ];

  return (
    <div>
      <AppBar position="sticky" sx={{ backgroundColor: '#0A0A33', boxShadow: 'none' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <IconButton edge="start" sx={{ color: '#ffff', marginRight: 'auto' }} onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>

          {menuOptions.map((option) => (
            <Button
              key={option.label}
              component={Link}
              to={option.path}
              sx={{ color: '#ffff', fontWeight: 'bold', marginLeft: '20px' }}
              startIcon={option.icon}
            >
              {option.label}
            </Button>
          ))}

          <IconButton onClick={handleLogout} sx={{ color: '#ffff', marginLeft: '20px' }}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }}>
          <Divider />

          <List>
            {menuOptions.map((option) => (
              <ListItem button key={option.label} component={Link} to={option.path} onClick={toggleDrawer(false)}>
                <ListItemIcon>{option.icon}</ListItemIcon>
                <ListItemText primary={option.label} />
              </ListItem>
            ))}

            <ListItem button component={Link} to="/sobre" onClick={toggleDrawer(false)}>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="Sobre" />
            </ListItem>
          </List>
          <Divider />

          <List>
            <ListItem button onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Sair" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <div style={{ padding: '20px' }}>
        {children}
      </div>
    </div>
  );
};

export default Layout;