import "./styles.css"

function Forecast() {
    return (
        <div className="container">
            <h2 className="title-content">Previsão</h2>
            <div className="form-container">
                <div className="state-container form-input">
                    <label>Estado</label>
                    <select>
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
                <div className="city-container form-input">
                    <label>Cidade</label>
                    <input type="text" placeholder="Digite a cidade" />
                </div>
                <div className="climate-container form-input">
                    <label>Clima</label>
                    <input type="text" disabled placeholder="-" />
                </div>
                <div className="maximum-container form-input">
                    <label>Máxima</label>
                    <input type="text" disabled placeholder="-" />
                </div>
                <div className="minimum-container form-input">
                    <label>Mínima</label>
                    <input type="text" disabled placeholder="-" />
                </div>
                <div className="moon-container form-input">
                    <label>Fase da Lua</label>
                    <input type="text" disabled placeholder="-" />
                </div>
                <div className="submit-btn">
                    <button>Consultar</button>
                </div>
            </div>
        </div>
    )
}

export default Forecast