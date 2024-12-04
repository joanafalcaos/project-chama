import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Sobre from './Pages/Sobre';
import Login from './Pages/Login';
import Layout from './Layout';
import Stories from './Pages/Stories';
import Profile from './Pages/Profile';
import AddStory from './Components/AddStory';
import ListStories from './Components/ListStories';
import Mapa from './Pages/Mapa';

function App() {
  // const [authenticated, setAuthenticated] = useState(false);

  // useEffect(() => {
  //   const authStatus = sessionStorage.getItem('authenticated');
  //   setAuthenticated(authStatus === 'true');
  // }, []);

  return (
    <Router>
      <Routes>
        {/* Rotas sem autenticação */}
        <Route path="/login" element={<Login /* setAuthenticated={setAuthenticated} */ />} />
        <Route path="/" element={
          <Layout>
            <Home />
          </Layout>
        } />
        <Route path="/sobre" element={
          <Layout>
            <Sobre />
          </Layout>
        } />
        <Route path="/stories" element={
          <Layout>
            <Stories />
          </Layout>
        } />
        <Route path="/stories/add" element={
          <Layout>
            <AddStory />
          </Layout>
        } />
        <Route path="/stories/list" element={
          <Layout>
            <ListStories />
          </Layout>
        } />
        <Route path="/mapa" element={
          <Layout>
            <Mapa />
          </Layout>
        } />
        <Route path="/profile" element={
          <Layout>
            <Profile />
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;