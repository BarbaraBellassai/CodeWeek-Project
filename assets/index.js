const districtsCardWrapper = document.querySelector('#DistrictsCardWrapper');
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
    
    try {
        const response = await fetch (url);
        const result = await response.json();
        state.results = result
        //console.log(state.results)
        if (!response.ok){
            throw result;
        }
        return result;    
    } catch (errorMsg) {
        console.log (errorMsg);
    }
}

//creazione della funzione utility per ottenere il nome delle province dall'oggetto d'origine
async function getWeatherName(districtId) { 
    const WeatherId = getConstantUrl (districtId);
    const WeatherCard = await getData(WeatherId);

    
    console.log("name",WeatherCard.name)
    return WeatherCard.name
    
}

//creazione della funzione utility per ottenere il meteo (chiave "weather") delle province
async function getWeather(districtId) {
    const WeatherId = getConstantUrl (districtId);
    const WeatherCard = await getData(WeatherId);

    
    console.log(WeatherCard.weather)
    return WeatherCard.weather
    
}

//Creazione delle card del meteo
function createCard(name, weather) {
         
    const cardWrapper = document.createElement("div");
    const cardDistrictName = document.createElement("h2");
    const cardWeatherWrapper = document.createElement("div");
    const mainWeatherCard = document.createElement("h3");
    const descriptionCard = document.createElement("p");
    
    cardDistrictName.textContent = name
    mainWeatherCard.textContent = weather.main
    descriptionCard.textContent = weather.description
    cardWrapper.classList.add ("district_card_wrapper")


    //cardName.classList.add ("")
    //cardWeatherWrapper.classList.add ("")
    
    cardWeatherWrapper.append(mainWeatherCard, descriptionCard );
    cardWrapper.append(cardDistrictName, cardWeatherWrapper);
    return cardWrapper;
}

//Creazione della funzione render delle card
function renderWeatherCards() {
    for (const key in state.districts) {
        const meteoCard = createCard(state.districts[key].name, state.districts[key][0]); 
        districtsCardWrapper.appendChild(meteoCard)
        //console.log (state.districts[key][0]) 
    }
} 

//Creazione della funzione render solo della provincia selezionata
function renderWeatherSelectedCard(distrKey) {
   
        const meteoCard = createCard(state.districts[distrKey].name, state.districts[distrKey][0]); 
        districtsCardWrapper.appendChild(meteoCard)
        console.log (state.districts[distrKey][0]) 
    
} 

//Creazione della funzione che salva nello state tutti gli oggetti della chiamata fetch 
async function getAllWeatherDistObject(){
    for (const key in state.districtsId) {
        state.districts[key] = await getWeather(state.districtsId[key])  // salva l'oggetto weather
        state.districts[key].name = await getWeatherName(state.districtsId[key]) //salva il nome del district
    }
}

//Creazione della funzione che, al cambio del valore della select, mi restituisce la chiave weather relativa a ciascuna provincia
districtSelect.addEventListener('change', (event) => {
    const target = event.target.value
    const allWrapDiv = districtsCardWrapper.querySelectorAll ("div");
    console.log (allWrapDiv)
    for (let index = 0; index < allWrapDiv.length; index++) {
        allWrapDiv[index].remove();
        
    }
    
    for (const key in state.districtsId) {
        if (key===target) {
            renderWeatherSelectedCard(target)
           
        }              
    }

    if (target==="NDS"){
        renderWeatherCards()
    }
    //console.log(target)
});

//Creazione della funzione che effettua tutte le chiamate fetch una volta caricata la pagina HTML
async function handleHTMLMounted() {
    await Promise.all([getAllWeatherDistObject()]).then (
        () => {
            renderWeatherCards() 
        }
    )
    console.log("DISTRICTS",state.districts)
    //console.log("WeatherObjectDistrict",state.districts.Ag[0])
    
        
}
document.addEventListener("DOMContentLoaded",handleHTMLMounted, {
    once: true
});
