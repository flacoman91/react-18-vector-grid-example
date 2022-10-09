import './LeafletMap.css';
import { useEffect, useState } from 'react';
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
  const [geoJson, setGeoJson] = useState("");
    useEffect(() => {
        async function getText(file) {
            let myObject = await fetch(file);
            let myText = await myObject.json();
            setGeoJson(myText);
        }
        
        getText("https://data-api.virtualnas.net/Files/ArtccBoundaries.geojson");
    },[]);
    
    
  
  //const center = [2.935403, 101.448205];
  const BOSCenter = [ 42.362944444444445, -71.00638888888889 ];
  const zoom = 8;
  return geoJson === ""? null : (    
    <div className="results-map-container">
      <MapContainer
        center={BOSCenter}
        zoom={zoom}
        zoomDelta={0.25}
        zoomSnap={0}
        scrollWheelZoom={true}
        zoomControl={false}
      >
        {/*
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        */}
        {/*
        //TODO: mimic original Leaflet.VectorGrid that has a parent "VectorGrid" which is a abstract interface for two
        //  implementing child classes: "Slicer" and "Protobuf". See https://leaflet.github.io/Leaflet.VectorGrid/vectorgrid-api-docs.html#styling-vectorgrids
        //  for example api... doesn't have to be exactly like that, but something that is as easy as that.
        //  Here's two options (might be others):
        //  1: <SlicerGrid> and <ProtobufGrid> are just separate components that "import {VectorGrid}" in their source files??
        //  2: <VectorGrid> take a prop that determines which type it is
        */}
        <VectorGrid geoJson={geoJson}/>
          {/*
          borrowed examples from
          https://react-leaflet.js.org/docs/example-tooltips/
          */}
          <Marker position={BOSCenter}>
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
