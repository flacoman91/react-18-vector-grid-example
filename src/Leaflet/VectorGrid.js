import { useEffect, useMemo } from 'react';
import { useLeafletContext } from '@react-leaflet/core';
import L from 'leaflet';
import 'leaflet.vectorgrid';

export const VectorGrid = () => {
  const context = useLeafletContext();
  const { map } = context;

  const mapboxUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const vectorGrid = useMemo(
    () => {
        const options = {
            rendererFactory: L.svg.tile,
            interactive: true,
            style: {
                weight: 0.5,
                opacity: 1,
                color: '#ccc',
                fillColor: '#390870',
                fillOpacity: 0.6,
                fill: true,
                stroke: true
            },
            type: 'protobuf',
        };

        return L.vectorGrid.protobuf(mapboxUrl, options)},
    [mapboxUrl]
  );

  useEffect(() => {
    map.addLayer(vectorGrid);
    return () => {
      map.removeLayer(vectorGrid);
    };
  }, [map, vectorGrid]);

  return null;
};
