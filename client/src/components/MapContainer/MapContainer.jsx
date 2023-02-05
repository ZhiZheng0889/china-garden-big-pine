import React, { useEffect, useRef, useState } from 'react';
import GoogleMapReact from 'google-map-react';
const { VITE_MAP_API_KEY } = import.meta.env;

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const MapContainer = () => {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };
  return (
    <div style={{ height: '50rem', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: VITE_MAP_API_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
      </GoogleMapReact>
    </div>
  );
};

export default MapContainer;
