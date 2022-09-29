import './LeafletMap.css';
import {
    CircleMarker,
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    Tooltip
} from 'react-leaflet';
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
          {/*
          borrowed examples from
          https://react-leaflet.js.org/docs/example-tooltips/
          */}
          <Marker position={center}>
              <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
          </Marker>

          <CircleMarker
              center={[4.935403, 101.448205]}
              pathOptions={{ color: 'red' }}
              radius={20}>
              <Tooltip>Tooltip for CircleMarker</Tooltip>
          </CircleMarker>
      </MapContainer>
    </div>
  );
};
