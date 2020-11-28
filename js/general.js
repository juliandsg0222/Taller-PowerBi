function DibujarTabla() {
    fetch('https://www.datos.gov.co/resource/2x55-9wxm.json')
        .then(response => response.json())
        .then(data => {
            let tablaICFES = '';
            let conta = 0;
            console.log("Número de registros:" + data.length);
            data.forEach(element => {
                tablaICFES += `<tr>
            <td>${conta++}</td>
            <td>${element.inst_nombre_institucion}</td>
            <td>${element.punt_global}</td>
            <td>${element.mod_ingles_punt}</td>
            <td>${element.mod_razona_cuantitat_punt}</td>
            <td>${element.mod_lectura_critica_punt}</td>
            <td>${element.mod_competen_ciudada_punt}</td>
            <td>${element.mod_comuni_escrita_punt}</td>
            </tr>`;
            });

            document.querySelector("#tablaICFES").innerHTML = tablaICFES;
        });
        
}

DibujarTabla()