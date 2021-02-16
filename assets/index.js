const choosenDistrict = document.querySelector('.choosen_district');
const districtsCardWrapper = document.querySelector('.district_card_wrapper');
const districtSelect = document.querySelector('select[name="district-name"]');

const state = {
    config: {
        base_url: "https://api.openweathermap.org/data/2.5/weather",
        api_key: "31084f8d8bf5a0b1ff5b97691899d11a"
    },
    districts:{
        Ag: null,
        Cl: null,
        Ct: null,
        En: null,
        Me: null,
        Pa: null,
        Rg: null,
        Sr: null,
        Tp: null
    } 
}

//creazione della utility per l'URL di base
function getConstantUrl(cityId) {
    return `${state.config.base_url}?id=${cityId}&appid=${state.config.api_key}`
}

//creazione della utility che chiama i dati e gestisce l'errore nel caricamento
async function getData(url) {
    try {
        const response = await fetch (url);
        const result = await response.json();
        if (!response.ok){
            throw result;
        }
        return result;    
    } catch (errorMsg) {
        console.log (errorMsg);
    }
}

//CREAZIONE DELLE FUNZIONI PER OTTENERE IL METEO DI OGNI PROVINCIA

//creazione della funzione per ottenere il meteo della provincia di Agrigento
async function getAgWeather() {
    const AgWeatherId = getConstantUrl ("2525763");
    const AgWeatherCard = await getData(AgWeatherId);
    
    state.districts.Ag = AgWeatherCard.results
    return AgWeatherCard;
}


//creazione della funzione per ottenere il meteo della provincia di Caltanissetta
async function getClWeather() {
    const ClWeatherId = getConstantUrl ("2525447");
    const ClWeatherCard = await getData(ClWeatherId);
    
    state.districts.Cl = ClWeatherCard.results
    return ClWeatherCard;
}

//creazione della funzione per ottenere il meteo della provincia di Catania
async function getCtWeather() {
    const CtWeatherId = getConstantUrl ("2525068");
    const CtWeatherCard = await getData(CtWeatherId);
    
    state.districts.Ct = CtWeatherCard.results
    return CtWeatherCard;
}

//creazione della funzione per ottenere il meteo della provincia di Enna
async function getEnWeather() {
    const EnWeatherId = getConstantUrl ("2524818");
    const EnWeatherCard = await getData(EnWeatherId);
    
    state.districts.En = EnWeatherCard.results
    return EnWeatherCard;
}

//creazione della funzione per ottenere il meteo della provincia di Messina
async function getMeWeather() {
    const MeWeatherId = getConstantUrl ("2524169");
    const MeWeatherCard = await getData(MeWeatherId);
    
    state.districts.Me = MeWeatherCard.results
    return MeWeatherCard;
}

//creazione della funzione per ottenere il meteo della provincia di Palermo
async function getPaWeather() {
    const PaWeatherId = getConstantUrl ("2523918");
    const PaWeatherCard = await getData(PaWeatherId);
    
    state.districts.Pa = PaWeatherCard.results
    return PaWeatherCard;
}

//creazione della funzione per ottenere il meteo della provincia di Ragusa
async function getRgWeather() {
    const RgWeatherId = getConstantUrl ("2523649");
    const RgWeatherCard = await getData(RgWeatherId);
    
    state.districts.Rg = RgWeatherCard.results
    return RgWeatherCard;
}

//creazione della funzione per ottenere il meteo della provincia di Siracusa
async function getSrWeather() {
    const SrWeatherId = getConstantUrl ("2523082");
    const SrWeatherCard = await getData(SrWeatherId);
    
    state.districts.Sr = SrWeatherCard.results
    return SrWeatherCard;
}

//creazione della funzione per ottenere il meteo della provincia di Trapani
async function getTpWeather() {
    const TpWeatherId = getConstantUrl ("2522875");
    const TpWeatherCard = await getData(TpWeatherId);
    
    state.districts.Tp = TpWeatherCard.results
    return TpWeatherCard;
}

