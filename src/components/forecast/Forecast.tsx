import axios from "axios";
import { useState } from "react";
import "./styles.css";

function Forecast({ onCityChange }: { onCityChange: (city: string) => void }) {
    const [stateSelected, setStateSelected] = useState<string>('');
    const [citySelected, setCitySelected] = useState<string>('');
    const [cities, setCities] = useState<string[]>([]);
    const [weatherData, setWeatherData] = useState<any>(null);

    const handleChangeEstado = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const state = event.target.value;
        setStateSelected(state);

        const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios?orderBy=nome`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Error to fetch cities');
            }
            const data: { nome: string }[] = await response.json();
            const namesCity: string[] = data.map(city => city.nome);
            setCities(namesCity);
        } catch (err) {
            console.error(err);
            setCities([]);
        }
    };

    const handleChangeCity = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const city = event.target.value;
        setCitySelected(city);
        onCityChange(city);
    };

    const handleFetchWeather = async () => {
        if (!citySelected || !stateSelected) {
            console.error('City or state not selected');
            return;
        }

        const apiKey = '96269290';
        const cityName = `${citySelected}`;
        const url = `https://api.hgbrasil.com/weather?key=${apiKey}&city_name=${cityName}&format=json-cors`;

        try {
            const response = await axios.get(url);
            const data = response.data.results;
            console.log('Weather data:', data);
            const translatedPhase = translateMoonPhase(response.data.results.moon_phase);
            setWeatherData({
                ...data,
                moon_phase: translatedPhase
            });
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    function translateMoonPhase(phase: string): string {
        const phases: { [key: string]: string } = {
            new: 'Lua nova',
            waxing_crescent: 'Lua crescente',
            first_quarter: 'Quarto crescente',
            waxing_gibbous: 'Gibosa crescente',
            full: 'Lua cheia',
            waning_gibbous: 'Gibosa minguante',
            last_quarter: 'Quarto minguante',
            waning_crescent: 'Lua minguante'
        };
        return phases[phase] || phase;
    }

    return (
        <div className="container">
            <h2 className="title-content">Previsão</h2>
            <div className="form-container">
                <div className="state-container form-input">
                    <label>Estado</label>
                    <select value={stateSelected} onChange={handleChangeEstado}>
                        <option value="">Selecione o estado</option>
                        <option value="AC">Acre</option>
                        <option value="AL">Alagoas</option>
                        <option value="AP">Amapá</option>
                        <option value="AM">Amazonas</option>
                        <option value="BA">Bahia</option>
                        <option value="CE">Ceará</option>
                        <option value="DF">Distrito Federal</option>
                        <option value="ES">Espírito Santo</option>
                        <option value="GO">Goiás</option>
                        <option value="MA">Maranhão</option>
                        <option value="MT">Mato Grosso</option>
                        <option value="MS">Mato Grosso do Sul</option>
                        <option value="MG">Minas Gerais</option>
                        <option value="PA">Pará</option>
                        <option value="PB">Paraíba</option>
                        <option value="PR">Paraná</option>
                        <option value="PE">Pernambuco</option>
                        <option value="PI">Piauí</option>
                        <option value="RJ">Rio de Janeiro</option>
                        <option value="RN">Rio Grande do Norte</option>
                        <option value="RS">Rio Grande do Sul</option>
                        <option value="RO">Rondônia</option>
                        <option value="RR">Roraima</option>
                        <option value="SC">Santa Catarina</option>
                        <option value="SP">São Paulo</option>
                        <option value="SE">Sergipe</option>
                        <option value="TO">Tocantins</option>
                    </select>
                </div>
                {stateSelected && (
                    <div className="city-container form-input">
                        <label>Cidade</label>
                        <select value={citySelected} onChange={handleChangeCity}>
                            <option value="">Selecione a cidade</option>
                            {cities.map((city, index) => (
                                <option key={index} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>
                )}
                <div className="climate-container form-input">
                    <label>Clima</label>
                    <input type="text" disabled value={weatherData ? weatherData.description : '-'} />
                </div>
                <div className="maximum-container form-input">
                    <label>Máxima</label>
                    <input type="text" disabled value={weatherData ? weatherData.forecast[0].max + "°C" : '-'} />
                </div>
                <div className="minimum-container form-input">
                    <label>Mínima</label>
                    <input type="text" disabled value={weatherData ? weatherData.forecast[0].min + "°C" : '-'} />
                </div>
                <div className="moon-container form-input">
                    <label>Fase da Lua</label>
                    <input type="text" disabled value={weatherData ? weatherData.moon_phase : '-'} />
                </div>
                <div className="submit-btn">
                    <button onClick={handleFetchWeather}>Consultar</button>
                </div>
            </div>
        </div>
    );
}

export default Forecast