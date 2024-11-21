import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const focosDeIncendio = [
  { id: 1, latitude: -23.5505, longitude: -46.6333, descricao: "Incêndio em vegetação" },
  { id: 2, latitude: -22.9068, longitude: -43.1729, descricao: "Incêndio em área urbana" },
];

const MapaDeFocos = () => {
  return (
    <MapContainer center={[-23.5505, -46.6333]} zoom={6} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />
      {focosDeIncendio.map((foco) => (
        <Marker key={foco.id} position={[foco.latitude, foco.longitude]}>
          <Popup>{foco.descricao}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapaDeFocos;
