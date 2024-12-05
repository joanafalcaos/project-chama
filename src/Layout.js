import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';
import { Home as HomeIcon, Whatshot as FireIcon, Map as MapIcon, Person as PersonIcon, Logout as LogoutIcon } from '@mui/icons-material';

const Layout = ({ children }) => {
  const navigate = useNavigate();

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

          <Button onClick={handleLogout} sx={{ color: '#ffff', marginLeft: '20px' }}>
            <LogoutIcon />
          </Button>
        </Toolbar>
      </AppBar>

      <div style={{ padding: '20px' }}>
        {children}
      </div>

      <footer style={{ backgroundColor: '#0A0A33', color: '#fff', padding: '10px 0', textAlign: 'center' }}>
        <p>
          &copy; 2024 CHAMA - Todos os direitos reservados.
          <Link to="/sobre" style={{ color: '#fff', textDecoration: 'underline' }}><br/>Saiba mais sobre nós</Link>
        </p>
      </footer>

    </div>
  );
};

export default Layout;