import axios from "axios";
import { Feature, View } from "ol";
import Map from 'ol/Map';
import { Point } from "ol/geom";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import { fromLonLat } from "ol/proj";
import { OSM } from "ol/source";
import VectorSource from "ol/source/Vector";
import Icon from "ol/style/Icon";
import Style from "ol/style/Style";
import { useEffect, useState } from "react";
import "./styles.css";

function MapWrapper({ cityName }: { cityName: string }) {
    const [coordinates, setCoordinates] = useState<[number, number] | null>(null);

    useEffect(() => {
        if (!cityName) return;

        const fetchCoordinates = async () => {
            try {
                const apiKey = '54faef5a822f42bca4618f73ef2961d9';
                const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
                    params: {
                        q: cityName,
                        key: apiKey
                    }
                });

                const { lat, lng } = response.data.results[0].geometry;
                setCoordinates([lng, lat]);
            } catch (error) {
                console.error('Error to fetch coordinates:', error);
            }
        };

        fetchCoordinates();
    }, [cityName]);

    useEffect(() => {
        if (!coordinates) return;

        const mapElement = document.getElementById('map');
        if (!mapElement) return;

        const pointFeature = new Feature({
            geometry: new Point(fromLonLat(coordinates)),
        });

        pointFeature.setStyle(new Style({
            image: new Icon({
                src: 'https://openlayers.org/en/latest/examples/data/icon.png',
                scale: 0.1
            })
        }));

        const initialFeaturesLayer = new VectorLayer({
            source: new VectorSource({
                features: [pointFeature]
            })
        });

        const initialMap = new Map({
            target: mapElement,
            layers: [
                new TileLayer({
                    source: new OSM()
                }),
                initialFeaturesLayer
            ],
            view: new View({
                projection: 'EPSG:3857',
                center: fromLonLat(coordinates),
                zoom: 10
            }),
            controls: []
        });

        return () => {
            initialMap.dispose();
        }
    }, [coordinates]);

    return (
        <div id="map" className="map-container" style={{ width: '800px', height: '500px', border: '1px solid green' }}></div>
    );
}

export default MapWrapper;