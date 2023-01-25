let select = document.getElementById('sel')
let selectt = document.getElementById('sell')
let selecttt = document.getElementById('selll')
let selectstartTime = document.getElementById('starttime')
let selectendTime = document.getElementById('endtime')
let chartTypee = document.getElementById('charttype')
let contenedorChart = document.getElementById('contenedorchart')
let contenedorChartBinance = document.getElementById('contenedorchartBinance')

function crearOptionsCandlesLimit()
 {
    let options = []
 }
 
function dibujarChart(data, symbol, chartType) {

     let options = {
                series: [{
                    data: []
                }],
                chart: {
                    type: chartType,
                    height: 480
                },
                title: {
                    text: symbol + ' Chart',
                    align: 'left'
                },
                xaxis: {
                    type: 'datetime'
                },
                yaxis: {
                    tooltip: {
                        enabled: true
                    }
                }
            };
        
            data.forEach(dato => {
                let datoparachart = []
                datoparachart.push(dato[0])
                datoparachart.push(parseFloat(dato[1]))
                datoparachart.push(parseFloat(dato[2]))
                datoparachart.push(parseFloat(dato[3]))
                datoparachart.push(parseFloat(dato[4]))
                options.series[0].data.push(datoparachart)
            });

        
            contenedorChartBinance.innerHTML = '<div id="chartBinance"></div>'
        
            let chartBinance = new ApexCharts(document.querySelector("#chartBinance"), options);
            chartBinance.render();

    

}

function traerKDatosBinance(symbol, interval, numerodevelas, chartType) {

    fetch('https://api.binance.com/api/v3/klines?symbol=' + symbol + '&interval=' + interval + '&limit=' + numerodevelas)
        .then(response => response.json())
        .then(data => {

            let today = Date.now()
            let date = new Date(today)
            date = date.toISOString().slice(0, 10)
            selectendTime.value = date

            let datee = new Date(data[0][0])
            datee = datee.toISOString().slice(0, 10)
            selectstartTime.value = datee

            dibujarChart(data, symbol, chartType)
            

        }
        )

}

function actualizarChart() {
    let opcionseleccionada = select.selectedOptions[0].value
    let limitevelasseleccionado = selecttt.selectedOptions[0].value
    let intervaloseleccionado = selectt.selectedOptions[0].value
    let typeseleccionado = chartTypee.selectedOptions[0].value
    traerKDatosBinance(opcionseleccionada, intervaloseleccionado, limitevelasseleccionado, typeseleccionado)
}

traerKDatosBinance('BTCUSDT', '1d', 100, 'line')





