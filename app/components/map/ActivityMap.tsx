import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxPolyline from '@mapbox/polyline';
import { MAP_GEOMETRY_COLOR } from '~/lib/colors';

interface ActivityMapProps {
    polyline: string;
    center?: [number, number];
    zoom?: number;
}


export default function ActivityMap({
    polyline,
    center = [-74.5, 40],
    zoom = 9
}: ActivityMapProps) {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);


    useEffect(() => {
        // return () => {
        //     if (map.current) {
        //         map.current.remove();
        //     }
        // };
    }, []);


    useEffect(() => {
        if (map.current || !polyline) return; // Initialize map only once

        mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_PUBLIC_KEY

        if (mapContainer.current && !map.current) {
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/light-v11',
                center: center,
                zoom: zoom
            });

            const coordinates = mapboxPolyline.decode(polyline);

            map.current.on('load', () => {
                if (map.current) {
                    addStartAndEndPoints(coordinates, map.current);
                    addPolyline(coordinates, map.current);
                    flyTo(coordinates);
                }
            });
        }
    }, [polyline, center, zoom]);

    function flyTo(coordinates: [number, number][]) {
        if (map.current) {
            // Calculate bounding box from coordinates
            const lngs = coordinates.map(coord => coord[1]);
            const lats = coordinates.map(coord => coord[0]);
            const bounds = new mapboxgl.LngLatBounds(
                [Math.min(...lngs), Math.min(...lats)],
                [Math.max(...lngs), Math.max(...lats)]
            );

            map.current.fitBounds(bounds, {
                padding: 50,
                essential: true,
                speed: 2.5
            });
        }
    }

    function addStartAndEndPoints(coordinates: [number, number][], map: mapboxgl.Map) {
        const startPoint = coordinates[0];
        const endPoint = coordinates[coordinates.length - 1];

        // Create start marker (green)
        new mapboxgl.Marker({
            color: '#22c55e',
            draggable: false
        })
            .setLngLat([startPoint[1], startPoint[0]])
            .addTo(map);

        // Create end marker (red)
        new mapboxgl.Marker({
            color: '#ef4444',
            draggable: false
        })
            .setLngLat([endPoint[1], endPoint[0]])
            .addTo(map);
    }



    function addPolyline(coordinates: [number, number][], map: mapboxgl.Map) {

        // Add source for the polyline
        map.addSource('route', {
            'type': 'geojson',
            'data': {
                'type': 'Feature',
                'properties': {},
                'geometry': {
                    'type': 'LineString',
                    'coordinates': coordinates.map(coord => [coord[1], coord[0]])
                }
            }
        });

        // Add layer for the purple line
        map.addLayer({
            'id': 'route',
            'type': 'line',
            'source': 'route',
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-color': MAP_GEOMETRY_COLOR,
                'line-width': 4
            }
        });
    }


    return <div ref={mapContainer} style={{ width: '100%', height: '700px', borderRadius: '10px' }} />;
}
