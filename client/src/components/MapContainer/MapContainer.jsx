import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

const MapComponent = () => {
  const defaultCenter = {
    lat: 24.6723989215785,
    lng: -81.35672075039446
  }

  return (
    <MapContainer
      center={defaultCenter}
      zoom={13}
      style={{ height: "100%", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
}

export default MapComponent;
