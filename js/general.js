const enlace = 'https://www.datos.gov.co/resource/2x55-9wxm.json';
const instituciones = '?$select=distinct inst_nombre_institucion';
const limite = '&$limit=260756&$offset=0';
const datos_importantes = '?$select=inst_nombre_institucion,%20punt_global,%20mod_ingles_punt,%20mod_razona_cuantitat_punt,%20mod_lectura_critica_punt,%20mod_competen_ciudada_punt,%20mod_comuni_escrita_punt&$where=inst_nombre_institucion=';
const comillas = '%27';
var insti = 'UNIVERSIDAD NACIONAL DE COLOMBIA-MANIZALES';

// Estructura para consultar datos completos de una sola institucion:
// enlace + datos_importantes + comillas + insti + comillas + limite

conta = 1;

function llenarArreglo() {

    // Inicio arreglo de instituciones
    fetch(enlace + instituciones)
        .then(response => response.json())
        .then(arreglo_uni => {
            arreglo_uni.forEach(unive => {
                let sentencia = enlace + datos_importantes + comillas + unive.inst_nombre_institucion + comillas + limite;

                let malo1 = "https://www.datos.gov.co/resource/2x55-9wxm.json?$select=inst_nombre_institucion,%20punt_global,%20mod_ingles_punt,%20mod_razona_cuantitat_punt,%20mod_lectura_critica_punt,%20mod_competen_ciudada_punt,%20mod_comuni_escrita_punt&$where=inst_nombre_institucion=%27UNIVERSIDAD DEL SINÚ 'Elías Bechara Zainúm' - UNISINÚ-CARTAGENA%27&$limit=260756&$offset=0";
                let malo2 = "https://www.datos.gov.co/resource/2x55-9wxm.json?$select=inst_nombre_institucion,%20punt_global,%20mod_ingles_punt,%20mod_razona_cuantitat_punt,%20mod_lectura_critica_punt,%20mod_competen_ciudada_punt,%20mod_comuni_escrita_punt&$where=inst_nombre_institucion=%27UNIVERSIDAD DEL SINÚ 'Elías Bechara Zainúm' - UNISINÚ-MONTERIA%27&$limit=260756&$offset=0";

                if (sentencia != malo1 && sentencia != malo2) {
                    tablaICFES = '';
                    // Inicio total registros de cada institucion
                    fetch(enlace + datos_importantes + comillas + unive.inst_nombre_institucion + comillas + limite)
                        .then(response => response.json())
                        .then(unicos_datos_uni => {
                            let p_g = 0;
                            let d_g = 0
                            let p_i = 0;
                            let d_i = 0;
                            let p_r = 0;
                            let d_r = 0;
                            let p_l = 0;
                            let d_l = 0;
                            let p_cp = 0;
                            let d_cp = 0;
                            let p_co = 0;
                            let d_co = 0;
                            unicos_datos_uni.forEach(uni => {
                                if (uni.punt_global != undefined) {
                                    p_g += parseInt(uni.punt_global);
                                }
                                else{
                                    d_g += 1;
                                }

                                if (uni.mod_ingles_punt != undefined) {
                                    p_i += parseInt(uni.mod_ingles_punt);
                                }
                                else{
                                    d_i += 1;
                                }

                                if (uni.mod_razona_cuantitat_punt != undefined) {
                                    p_r += parseInt(uni.mod_razona_cuantitat_punt);
                                }
                                else{
                                    d_r += 1;
                                }

                                if (uni.mod_lectura_critica_punt != undefined) {
                                    p_l += parseInt(uni.mod_lectura_critica_punt);
                                }
                                else{
                                    d_l += 1;
                                }

                                if (uni.mod_competen_ciudada_punt != undefined) {
                                    p_cp += parseInt(uni.mod_competen_ciudada_punt);
                                }
                                else{
                                    d_cp += 1;
                                }

                                if (uni.mod_comuni_escrita_punt != undefined) {
                                    p_co += parseInt(uni.mod_comuni_escrita_punt);
                                }
                                else{
                                    d_co += 1;
                                }
                            });

                            tablaICFES += `<tr>
                                <td>${conta++}</td>
                                <td>${unive.inst_nombre_institucion}</td>
                                <td>${Math.round(p_g/(unicos_datos_uni.length - d_g))}</td>
                                <td>${Math.round(p_i/(unicos_datos_uni.length - d_i))}</td>
                                <td>${Math.round(p_r/(unicos_datos_uni.length - d_r))}</td>
                                <td>${Math.round(p_l/(unicos_datos_uni.length - d_l))}</td>
                                <td>${Math.round(p_cp/(unicos_datos_uni.length - d_cp))}</td>
                                <td>${Math.round(p_co/(unicos_datos_uni.length - d_co))}</td>
                            </tr>`;

                            document.querySelector("#tablaICFES").innerHTML = tablaICFES;
                        });
                }
            });
        });
}

llenarArreglo();