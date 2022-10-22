import './LeafletMap.css';
import {
    CircleMarker,
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    Tooltip, ZoomControl
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { VectorGrid } from './VectorGrid';
import { useSelector } from "react-redux";
import {
    selectCounterIsMarkerVisible,
} from "../features/counter/counterSlice";



export const LeafletMap = () => {
  // center of United States
  const center = { lat: 36.935, lng: -95.45 };
  const isMarkerVisible = useSelector(selectCounterIsMarkerVisible)

  return (
    <div className="results-map-container">
      <MapContainer
        center={center}
        zoom={6}
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
          {
              isMarkerVisible ?
              <Marker position={center}>
                  <Popup>
                      A pretty CSS3 popup. <br/> Easily customizable.
                  </Popup>
              </Marker>: null
          }

          {isMarkerVisible ?
              <CircleMarker
                  center={[4.935403, 101.448205]}
                  pathOptions={{color: 'red'}}
                  radius={20}>
                  <Tooltip>Tooltip for CircleMarker</Tooltip>
              </CircleMarker> : null
          }
          <ZoomControl />
      </MapContainer>
    </div>
  );
};
