import React from 'react';
import './Home.css';
import bombeiros from '../images/bombeiros.png';
import {Link, Outlet} from "react-router-dom";
const Home = () => {
  return (
    <div className="App">

      <nav className="navbar">
      <div className="nav-info"><Link to="/Sobre.js">Sobre</Link></div> 
        <div className="nav-links">
        <Link to="/Home.js">Home</Link>
            <Link to="/Listagem.js">Listagem</Link>
            <Link to="/Mapa.js">Mapa</Link>
        </div>
      </nav>


      <section className="reportar" id="reportar">
        <div className="report-content">
          <h2>Reporte um foco de incêndio</h2>
          <p>
            Sua contribuição é fundamental para proteger o meio ambiente e evitar
            a propagação de incêndios. Informe a localização e outros detalhes
            importantes para que possamos agir rapidamente. Cada denúncia conta e
            ajuda a preservar nosso ecossistema.
          </p>
          <button className="report-button">Reportar</button>
        </div>
        { <img src={bombeiros} alt="bombeiros" className="report-image"
        />}
      </section>
    </div>
  );
}
<Outlet />
export default Home;
