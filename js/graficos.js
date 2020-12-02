function obtenerValores() {
    var fecha = [];
    var caldas = [];
    var risaralda = [];
    var valle = [];
    var quindio = [];
    var inicio = [];

    fetch('https://www.datos.gov.co/resource/8835-5baf.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                if (element.fecha != undefined && element.caldas != undefined && element
                    .risaralda != undefined && element.valle_del_cauca != undefined && element
                    .quindio != undefined) {
                    caldas.push(element.caldas);
                    risaralda.push(element.risaralda);
                    valle.push(element.valle_del_cauca);
                    quindio.push(element.quindio);
                    inicio.push(element.fecha.slice(0, 10));
                }
            });

            // Desde aquí se puede utilizar el arreglo

            for (let i = 0; i < caldas.length; i++) {
                fecha[i] = i;
            }

            console.log("fecha:");
            console.log(fecha);

            console.log("caldas:");
            console.log(caldas);

            console.log("risaralda:");
            console.log(risaralda);

            console.log("valle:");
            console.log(valle);

            console.log("quindio:");
            console.log(quindio);

            var graf1 = {
                y: caldas,
                x: fecha,
                name: 'Caldas',
                type: 'bar'
            };

            var graf2 = {
                y: risaralda,
                x: fecha,
                name: 'Risaralda',
                type: 'bar'
            };

            var graf3 = {
                y: valle,
                x: fecha,
                name: 'Valle del Cauca',
                type: 'bar'
            };

            var graf4 = {
                y: quindio,
                x: fecha,
                name: 'Quindío',
                type: 'bar'
            };

            var dados = [graf1, graf2, graf3, graf4];
            var layout = {
                barmode: 'group',
                title: {
                    text: 'Casos de COVID-19',
                    font: {
                        family: 'Courier New, monospace',
                        size: 24,
                    }
                },

                xaxis: {
                    title: {
                        text: 'Formato: AAAA-MM-DD <br> Desde:' + inicio[0] + " (Día 0) <br> Hasta " + inicio[(inicio.length - 1)] + " (Día " + inicio.length + ")"
                    }
                },

                yaxis: {
                    title: {
                        text: 'Número de casos'
                    }
                }

            };

            Plotly.newPlot('grafico', dados, layout);;

            // Hasta aquí se puede utilizar el arreglo
        });

}

obtenerValores();