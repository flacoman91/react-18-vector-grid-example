import {useEffect, useMemo} from 'react';
import {useLeafletContext} from '@react-leaflet/core';
import L from 'leaflet';
import 'leaflet.vectorgrid';
import {useSelector} from "react-redux";
import {
    selectCounterMapType, selectCounterVisibleFeatures,
} from "../features/counter/counterSlice";

export const Styles = {
    water: {
        fill: true,
        weight: 1,
        fillColor: '#06cccc',
        color: '#06cccc',
        fillOpacity: 0.2,
        opacity: 0.4,
    },
    admin: {
        weight: 1,
        fillColor: 'pink',
        color: 'pink',
        fillOpacity: 0.2,
        opacity: 0.4
    },
    waterway: {
        weight: 1,
        fillColor: '#2375e0',
        color: '#2375e0',
        fillOpacity: 0.2,
        opacity: 0.4
    },
    landcover: {
        fill: true,
        weight: 1,
        fillColor: '#53e033',
        color: '#53e033',
        fillOpacity: 0.2,
        opacity: 0.4,
    },
    landuse: {
        fill: true,
        weight: 1,
        fillColor: '#e5b404',
        color: '#e5b404',
        fillOpacity: 0.2,
        opacity: 0.4
    },
    park: {
        fill: true,
        weight: 1,
        fillColor: '#84ea5b',
        color: '#84ea5b',
        fillOpacity: 0.2,
        opacity: 0.4
    },
    boundary: {
        weight: 1,
        fillColor: '#c545d3',
        color: '#c545d3',
        fillOpacity: 0.2,
        opacity: 0.4
    },
    aeroway: {
        weight: 1,
        fillColor: '#51aeb5',
        color: '#51aeb5',
        fillOpacity: 0.2,
        opacity: 0.4
    },
    road: {	// mapbox & nextzen only
        weight: 1,
        fillColor: '#f2b648',
        color: '#f2b648',
        fillOpacity: 0.2,
        opacity: 0.4
    },
    tunnel: {	// mapbox only
        weight: 0.5,
        fillColor: '#f2b648',
        color: '#f2b648',
        fillOpacity: 0.2,
        opacity: 0.4,
// 					dashArray: [4, 4]
    },
    bridge: {	// mapbox only
        weight: 0.5,
        fillColor: '#f2b648',
        color: '#f2b648',
        fillOpacity: 0.2,
        opacity: 0.4,
// 					dashArray: [4, 4]
    },
    transportation: {	// openmaptiles only
        weight: 0.5,
        fillColor: '#f2b648',
        color: '#f2b648',
        fillOpacity: 0.2,
        opacity: 0.4,
// 					dashArray: [4, 4]
    },
    transit: {	// nextzen only
        weight: 0.5,
        fillColor: '#f2b648',
        color: '#f2b648',
        fillOpacity: 0.2,
        opacity: 0.4,
// 					dashArray: [4, 4]
    },
    building: {
        fill: true,
        weight: 1,
        fillColor: '#2b2b2b',
        color: '#2b2b2b',
        fillOpacity: 0.2,
        opacity: 0.4
    },
    water_name: {
        weight: 1,
        fillColor: '#022c5b',
        color: '#022c5b',
        fillOpacity: 0.2,
        opacity: 0.4
    },
    transportation_name: {
        weight: 1,
        fillColor: '#bc6b38',
        color: '#bc6b38',
        fillOpacity: 0.2,
        opacity: 0.4
    },
    place: {
        weight: 1,
        fillColor: '#f20e93',
        color: '#f20e93',
        fillOpacity: 0.2,
        opacity: 0.4
    },
    housenumber: {
        weight: 1,
        fillColor: '#ef4c8b',
        color: '#ef4c8b',
        fillOpacity: 0.2,
        opacity: 0.4
    },
    poi: {
        weight: 1,
        fillColor: '#3bb50a',
        color: '#3bb50a',
        fillOpacity: 0.2,
        opacity: 0.4
    },
    earth: {	// nextzen only
        fill: true,
        weight: 1,
        fillColor: '#c0c0c0',
        color: '#c0c0c0',
        fillOpacity: 0.2,
        opacity: 0.4
    },


    // Do not symbolize some stuff for mapbox
    country_label: [],
    marine_label: [],
    state_label: [],
    place_label: [],
    waterway_label: [],
    poi_label: [],
    road_label: [],
    housenum_label: [],


    // Do not symbolize some stuff for openmaptiles
    country_name: [],
    marine_name: [],
    state_name: [],
    place_name: [],
    waterway_name: [],
    poi_name: [],
    road_name: [],
    housenum_name: [],
};

export const VectorGrid = () => {
    const mapType = useSelector(selectCounterMapType);
    const context = useLeafletContext();
    const {map} = context;
    const mapboxUrl = "https://{s}.tiles.mapbox.com/v4/mapbox.mapbox-streets-v6/{z}/{x}/{y}.vector.pbf?access_token={token}";
    const nextzenTilesUrl = "https://tile.nextzen.org/tilezen/vector/v1/512/all/{z}/{x}/{y}.mvt?api_key={apikey}";
    const providerUrl = mapType === 'mapbox' ? mapboxUrl : nextzenTilesUrl;
    const visibleFeatures = useSelector(selectCounterVisibleFeatures);
    const vectorTileStyling = useMemo(() => {
        const styles = {};
        visibleFeatures.forEach(feat=>{
            styles[feat] = Styles[feat]
        })
        return styles;
    }, [visibleFeatures]);

    // Assumes layers = "all", and format = "mvt"

    const vectorGrid = useMemo(
        () => {
            const options = {
                rendererFactory: L.svg.tile,
                interactive: true,
                type: 'protobuf',
                vectorTileLayerStyles: vectorTileStyling,
                apikey: 'gCZXZglvRQa6sB2z7JzL1w', // nextzen key
                // mapbox key only good for localhost:3000, localhost
                token: 'pk.eyJ1IjoiZmxhY29tYW45MSIsImEiOiJjbDlqYWJucGcwYmd2M3BtZzltdTIxMTY2In0.t6RJsBKg1cJbnELBUQs6PA'
            };

            return L.vectorGrid.protobuf(providerUrl, options)
        },
        [providerUrl, vectorTileStyling]
    );

    vectorGrid.on('click', function (e) {
        console.log('clicked', e)
    });
    
    vectorGrid.on('mouseover', function (e) {
        console.log('mouseover', e)
    });

    useEffect(() => {
        map.addLayer(vectorGrid);
        return () => {
            map.removeLayer(vectorGrid);
        };
    }, [map, vectorGrid]);

    return null;
};
