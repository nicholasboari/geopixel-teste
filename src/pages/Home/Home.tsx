import Forecast from "../../components/forecast/Forecast";
import MapWrapper from "../../components/map/MapWrapper";
import "./styles.css";

const Home: React.FC = () => {
    return (
        <div className="home-container">
            <div className="forecast-container">
                <Forecast />
            </div>
            <div className="map-container">
                <MapWrapper />
            </div>
        </div>
    );
};

export default Home