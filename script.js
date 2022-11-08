const htmlTag = {
    startPeriod: document.getElementById('data-inicio'),
    endPeriod: document.getElementById('data-final'),
    countryCode: document.getElementById('codigo-pais'),
    searchBtn: document.getElementById('btn'),
    countryCurrency: document.getElementById('moedapais')
}
const getHistoricalRates = async(start_date, end_date, country_code) =>{
    let historicalRateUrl = `https://api.exchangerate.host/timeseries?start_date=${start_date}&end_date=${end_date}&base=${country_code}`;
    let response = await fetch(historicalRateUrl);
    if(response.status === 200){
        let data = await response.json();
        return data;
    }
}

const showRatesByPeriod = async(start_date, end_date, country_code) =>{
    let data = await getHistoricalRates(start_date, end_date, country_code);
    let cotacao = [];
    for(let value in data.rates){
        cotacao.push(Number(data.rates[value][htmlTag.countryCurrency.value.toUpperCase()]).toFixed(2));
    }
    let xValue = Object.keys(data.rates);
    let yValue = cotacao;
    new Chart('myChart', {
        type: 'line',
        data: {
            labels: xValue,
            datasets: [{
                label: "cotação do Real",
                borderColor: "rgba(75,192,192)",
                tension: 0.1,
                data: yValue
            }]
        },
        options:{}
    });
}

htmlTag.searchBtn.addEventListener('click', (event=>{
    event.preventDefault();
    showRatesByPeriod(htmlTag.startPeriod.value, htmlTag.endPeriod.value, htmlTag.countryCode.value);
    htmlTag.countryCurrency.value;
    htmlTag.startPerido.value = '';
    htmlTag.endPeriod.value = '';
    htmlTag.countryCode.value = '';
}));

