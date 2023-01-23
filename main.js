let select = document.getElementById('sel')
let contenedorChart = document.getElementById('contenedorchart')

function traerPDatos(idcoin) {
    fetch()
}

function traerKDatos(idcoin) {

    fetch('https://api.coingecko.com/api/v3/coins/' + idcoin + '/ohlc?vs_currency=usd&days=max')
        .then(response => response.json())
        .then(data => {

            dibujarChart(data, idcoin)

        }
        )

}

traerKDatos('bitcoin')

function dibujarChart(data, idcoin) {

    let options = {
        series: [{
            data: []
        }],
        chart: {
            type: 'candlestick',
            height: 530
        },
        title: {
            text: idcoin + ' Chart',
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

    contenedorChart.innerHTML = '<div id="chart"></div>'

    let chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();

}

function actualizarChart() {
    let opcionseleccionada = select.selectedOptions[0].value
    traerKDatos(opcionseleccionada)
}





