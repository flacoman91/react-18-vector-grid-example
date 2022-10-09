//TODO: THIS FILE SUCKS
//refactor to make it actually good code... also...
//  mimic original Leaflet.VectorGrid that has a parent "VectorGrid" which is a abstract interface for two
//  implementing child classes: "Slicer" and "Protobuf". See https://leaflet.github.io/Leaflet.VectorGrid/vectorgrid-api-docs.html#styling-vectorgrids
//  for example api... doesn't have to be exactly like that, but something that is as easy as that.
//  Here's two options (might be others):
//  1: <SlicerGrid> and <ProtobufGrid> are just separate components that "import {VectorGrid}" in their source files??
//  2: <VectorGrid> take a prop that determines which type it is

import {useEffect, useMemo} from 'react';
//import {useLeafletContext} from '@react-leaflet/core';
import {useMap} from 'react-leaflet'
import L from 'leaflet';
import 'leaflet.vectorgrid';

export const VectorGrid = ({geoJson}) => {
    //const context = useLeafletContext();
    //const {map} = context;
    const map = useMap();
    const vectorTileStyling = useMemo(() => {
        return {
            sliced: {
                fill: true,
                weight: 1,
                fillColor: '#06cccc',
                color: '#06cccc',
                fillOpacity: 0.2,
                opacity: 0.4
            },
            water: {
                fill: true,
                weight: 1,
                fillColor: '#06cccc',
                color: '#06cccc',
                fillOpacity: 0.2,
                opacity: 0.4
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
        }
    }, []);

    // Assumes layers = "all", and format = "mvt"
    const nextzenTilesUrl = "https://tile.nextzen.org/tilezen/vector/v1/512/all/{z}/{x}/{y}.mvt?api_key={apikey}";

    const vectorGrid = useMemo(
        () => {
            const options = {
                rendererFactory: L.svg.tile,
                interactive: true,
                /*
                style: {
                    weight: 0.5,
                    opacity: 1,
                    color: '#ccc',
                    fillColor: '#390870',
                    fillOpacity: 0.6,
                    fill: true,
                    stroke: true
                },
                */
                //type: 'protobuf',
                vectorTileLayerStyles: vectorTileStyling,
                apikey: 'gCZXZglvRQa6sB2z7JzL1w'
            };

            return L.vectorGrid.protobuf(nextzenTilesUrl, options)
        },
        [nextzenTilesUrl, vectorTileStyling]
    );

    vectorGrid.on('click', function (e) {
        console.log('clicked', e)
    });
    
    vectorGrid.on('mouseover', function (e) {
        console.log('mouseover', e)
    });
    
    
    const slicedOptions = {
        //vector grid options
        redererFActory: L.svg.tile,
        interactive: true,
        vectorTileLayerStyles: {
            sliced: {
                fill: true,
                weight: 1,
                fillColor: '#06cccc',
                color: '#06cccc',
                fillOpacity: 0.2,
                opacity: 0.4
            }},
        //slicer options
        vectorTileLayerName: 'sliced',
        //geojson-vt options.
        maxZoom: 14,  // max zoom to preserve detail on; can't be higher than 24
        tolerance: 3, // simplification tolerance (higher means simpler)
        extent: 4096, // tile extent (both width and height)
        buffer: 64,   // tile buffer on each side
        debug: 0,     // logging level (0 to disable, 1 or 2)
        lineMetrics: false, // whether to enable line metrics tracking for LineString/MultiLineString features
        promoteId: null,    // name of a feature property to promote to feature.id. Cannot be used with `generateId`
        generateId: false,  // whether to generate feature ids. Cannot be used with `promoteId`
        indexMaxZoom: 5,       // max zoom in the initial tile index
        indexMaxPoints: 100000 // max number of points per tile in the index
    }

    //console.log(geoJson);
    const slicerVectorGrid = L.vectorGrid.slicer(geoJson, slicedOptions);
    
    /*
    //add vectorGrid to map
    useEffect(() => {
        map.addLayer(vectorGrid);
        return () => {
            map.removeLayer(vectorGrid);
        };
    }, [map, vectorGrid]);
    */
    
    //add vectorGrid to map
    useEffect(() => {
        map.addLayer(slicerVectorGrid);
        return () => {
            map.removeLayer(slicerVectorGrid);
        };
    }, [map, slicerVectorGrid]);

    return null;
};
