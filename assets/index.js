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
    },
    districtsId:{
        Ag: "2525763",
        Cl: "2525447",
        Ct: "2525068",
        En: "2524818",
        Me: "2524169",
        Pa: "2523918",
        Rg: "2523649",
        Sr: "2523082",
        Tp: "2522875"
    }, 
}

//creazione della utility per l'URL di base
function getConstantUrl(cityId) {
    return `${state.config.base_url}?id=${cityId}&appid=${state.config.api_key}`
}

//creazione della utility che chiama i dati e gestisce l'errore nel caricamento
async function getData(url) {
    const weatherData = [];
    try {
        const response = await fetch (url);
        const result = await response.json();
        state.results = result
        console.log(state.results)
        if (!response.ok){
            throw result;
        }
        return result;    
    } catch (errorMsg) {
        console.log (errorMsg);
    }
}

//creazione della funzione utility per ottenere il meteo delle province
async function getWeather(districtId) {
    const WeatherId = getConstantUrl (districtId);
    const WeatherCard = await getData(WeatherId);
    
    return WeatherCard;
}

//Creazione della funzione che restituisce tutti gli oggetti della chiamata fetch (cioè tutti gli oggetti di tutte le province)
async function getAllWeatherDistObject(){
    for (const key in state.districtsId) {
        state.districts[key] = await getWeather(state.districtsId[key])
    }
}

//Creazione della funzione che, al cambio del valore della select, mi restituisce l'oggetto relativo a ciascuna provincia
districtSelect.addEventListener('change', (event) => {
    const target = event.target.value

    for (const key in state.districtsId) {
        if (key===target) {
            state.districts.key = getWeather(state.districtsId[key])
           
        }
            
    }
    
});


//Creazione della funzione che effettua tutte le chiamate fetch una volta caricata la pagina HTML
async function handleHTMLMounted() {
    await Promise.all([getAllWeatherDistObject()]);
    console.log("DISTRICTS",state.districts)
    
        
}
document.addEventListener("DOMContentLoaded",handleHTMLMounted, {
    once: true
});
