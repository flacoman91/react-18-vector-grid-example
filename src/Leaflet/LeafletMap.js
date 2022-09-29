import './LeafletMap.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { VectorGrid } from './VectorGrid';

export const LeafletMap = () => {
  const center = [2.935403, 101.448205];
  const zoom = 4;
  return (
    <div className="results-map-container">
      <MapContainer
        center={center}
        zoom={zoom}
        zoomDelta={0.25}
        zoomSnap={0}
        scrollWheelZoom={false}
        zoomControl={false}
      >
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
          <VectorGrid />
      </MapContainer>
    </div>
  );
};
