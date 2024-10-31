import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import Sobre from './Pages/Sobre';
import Login from './Pages/Login';
import Layout from './Layout';
import Stories from './Pages/Stories';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = sessionStorage.getItem('authenticated');
    setAuthenticated(authStatus === 'true');
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
        <Route path="/" element={authenticated ? (
          <Layout>
            <Home />
          </Layout>
        ) : (
          <Navigate to="/login" />
        )} />
        <Route path="/sobre" element={authenticated ? (
          <Layout>
            <Sobre />
          </Layout>
        ) : (
          <Navigate to="/login" />
        )} />
        <Route path="/stories" element={
          <Layout>
            <Stories />
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;