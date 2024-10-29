import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Home from './Pages/Home';
import Sobre from './Pages/Sobre';
import Login from './Pages/Login';
import { Button, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info'; 
import MenuIcon from '@mui/icons-material/Menu';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const authStatus = sessionStorage.getItem('authenticated');
    setAuthenticated(authStatus === 'true'); // Garante que a comparação é com a string 'true'
  }, []);

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
    <Router>
      <Button onClick={toggleDrawer(true)} startIcon={<MenuIcon />}>
        Menu
      </Button>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        {menuList}
      </Drawer>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={authenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/sobre" element={authenticated ? <Sobre /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
