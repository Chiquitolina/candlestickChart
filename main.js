let select = document.getElementById('sel')
let contenedorChart = document.getElementById('contenedorchart')

function traerDatos(idcoin) {

fetch('https://api.coingecko.com/api/v3/coins/'+idcoin+'/ohlc?vs_currency=usd&days=max')
    .then(response => response.json())
    .then(data => {
                
                   let options = {
                    series: [{
                    data: []
                  }],
                    chart: {
                    type: 'candlestick',
                    height: 580
                  },
                  title: {
                    text: 'BTC/USD Chart',
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
                options.series[0].data.push(dato)                
            });

            console.log(options.series[0].data)

            contenedorChart.innerHTML = '<div id="chart"></div>'

            let chart = new ApexCharts(document.querySelector("#chart"), options);
            chart.render();

            }
                )

        }

traerDatos('bitcoin')

function actualizarChart () {
    let opcionseleccionada = select.selectedOptions[0].value
    console.log(opcionseleccionada)
    traerDatos(opcionseleccionada)
}





