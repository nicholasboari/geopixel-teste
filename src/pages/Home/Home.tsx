import { useState } from "react";
import Forecast from "../../components/forecast/Forecast";
import MapWrapper from "../../components/map/MapWrapper";
import "./styles.css";

const Home: React.FC = () => {
    const [selectedCity, setSelectedCity] = useState<string>('');
    return (
        <div className="home-container">
            <div className="forecast-container">
                <Forecast onCityChange={setSelectedCity} />
            </div>
            <div className="map-container">
                <MapWrapper cityName={selectedCity} />
            </div>
        </div>
    );
};

export default Home