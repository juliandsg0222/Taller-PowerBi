const enlace = 'https://www.datos.gov.co/resource/2x55-9wxm.json';
const instituciones = '?$select=distinct inst_nombre_institucion';
const limite = '&$limit=260756&$offset=0';
const datos_importantes = '?$select=inst_nombre_institucion,%20punt_global,%20mod_ingles_punt,%20mod_razona_cuantitat_punt,%20mod_lectura_critica_punt,%20mod_competen_ciudada_punt,%20mod_comuni_escrita_punt&$where=inst_nombre_institucion=';
const comillas = '%27';
var insti = 'UNIVERSIDAD NACIONAL DE COLOMBIA-MANIZALES';

// Estructura para consultar datos completos de una sola institucion:
// enlace + datos_importantes + comillas + insti + comillas + limite


function DibujarTabla() {
    
    // Inicio arreglo de instituciones
    fetch(enlace + instituciones)
    .then(response => response.json())
    .then(arreglo_uni => {
        let tablaICFES = '';
        let conta = 0;
        arreglo_uni.forEach(uni => {
            fetch(enlace + datos_importantes + comillas + uni.inst_nombre_institucion + comillas + limite)
            .then(response => response.json())
            .then(unicos_datos_uni => {
                unicos_datos_uni.forEach(registro => {
                tablaICFES += `<tr>
                    <td>${conta++}</td>
                    <td>${registro.inst_nombre_institucion}</td>
                    <td>${registro.punt_global}</td>
                    <td>${registro.mod_ingles_punt}</td>
                    <td>${registro.mod_razona_cuantitat_punt}</td>
                    <td>${registro.mod_lectura_critica_punt}</td>
                    <td>${registro.mod_competen_ciudada_punt}</td>
                    <td>${registro.mod_comuni_escrita_punt}</td>
                </tr>`;
                })
            document.querySelector("#tablaICFES").innerHTML = tablaICFES;
            })
            
        });

    });


}



//     fetch(enlace)
//         .then(response => response.json())
//         .then(data => {
//             let tablaICFES = '';
//             let conta = 0;
//             console.log("Número de registros:" + data.length);
//             data.forEach(element => {
//                 tablaICFES += `<tr>
//             <td>${conta++}</td>
//             <td>${element.inst_nombre_institucion}</td>
//             <td>${element.punt_global}</td>
//             <td>${element.mod_ingles_punt}</td>
//             <td>${element.mod_razona_cuantitat_punt}</td>
//             <td>${element.mod_lectura_critica_punt}</td>
//             <td>${element.mod_competen_ciudada_punt}</td>
//             <td>${element.mod_comuni_escrita_punt}</td>
//             </tr>`;
//             });

//             document.querySelector("#tablaICFES").innerHTML = tablaICFES;
//         });
        
// }

DibujarTabla();