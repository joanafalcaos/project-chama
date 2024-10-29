// src/Layout.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info'; 
import MenuIcon from '@mui/icons-material/Menu';

const Layout = ({ children }) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open);
  };

  const menuList = (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/sobre">
          <ListItemIcon><InfoIcon /></ListItemIcon>
          <ListItemText primary="Sobre" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)} startIcon={<MenuIcon />}>
        Menu
      </Button>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        {menuList}
      </Drawer>
      {children} {/* Renderiza os filhos passados para este componente */}
    </div>
  );
};

export default Layout;
