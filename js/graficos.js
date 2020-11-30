var man = [];

function obtenerValores(arreglo){

    fetch('https://www.datos.gov.co/resource/8835-5baf.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(element => {
            if (element.caldas != undefined) {
                arreglo.push(parseFloat(element.caldas));
            }
        });
        // Desde aquí se puede utilizar el arreglo

        console.log("Arreglo dentro de 'then.data':");
        console.log(arreglo);

        return arreglo;
        // Hasta aquí se puede utilizar el arreglo
    });


}

obtenerValores(man);

console.log("Arreglo por fuera de 'then.data':");
console.log(man);