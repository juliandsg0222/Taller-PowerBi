const enlace = 'https://www.datos.gov.co/resource/2x55-9wxm.json';
const instituciones = '?$select=distinct inst_nombre_institucion';
const limite = '&$limit=260756&$offset=0';
const datos_importantes = '?$select=inst_nombre_institucion,%20punt_global,%20mod_ingles_punt,%20mod_razona_cuantitat_punt,%20mod_lectura_critica_punt,%20mod_competen_ciudada_punt,%20mod_comuni_escrita_punt&$where=inst_nombre_institucion=';
const comillas = '%27';
var insti = 'UNIVERSIDAD NACIONAL DE COLOMBIA-MANIZALES';

// Estructura para consultar datos completos de una sola institucion:
// enlace + datos_importantes + comillas + insti + comillas + limite

class InstitucionesICFES {

    constructor(nombre, pg, pi, pr, pl, pcc, pce) {
        this.nombre = nombre;
        this.pg = pg;
        this.pi = pi;
        this.pr = pr;
        this.pl = pl;
        this.pcc = pcc;
        this.pce = pce;
    }

}


conta = 1;

function llenarArreglo() {

    var arregloICFES = [];

    // Inicio arreglo de instituciones
    fetch(enlace + instituciones)
        .then(response => response.json())
        .then(arreglo_uni => {
            var tam = arreglo_uni.length - 2;
            arreglo_uni.forEach(unive => {
                let sentencia = enlace + datos_importantes + comillas + unive.inst_nombre_institucion + comillas + limite;

                let malo1 = "https://www.datos.gov.co/resource/2x55-9wxm.json?$select=inst_nombre_institucion,%20punt_global,%20mod_ingles_punt,%20mod_razona_cuantitat_punt,%20mod_lectura_critica_punt,%20mod_competen_ciudada_punt,%20mod_comuni_escrita_punt&$where=inst_nombre_institucion=%27UNIVERSIDAD DEL SINÚ 'Elías Bechara Zainúm' - UNISINÚ-CARTAGENA%27&$limit=260756&$offset=0";

                let malo2 = "https://www.datos.gov.co/resource/2x55-9wxm.json?$select=inst_nombre_institucion,%20punt_global,%20mod_ingles_punt,%20mod_razona_cuantitat_punt,%20mod_lectura_critica_punt,%20mod_competen_ciudada_punt,%20mod_comuni_escrita_punt&$where=inst_nombre_institucion=%27UNIVERSIDAD DEL SINÚ 'Elías Bechara Zainúm' - UNISINÚ-MONTERIA%27&$limit=260756&$offset=0";



                if (sentencia != malo1 && sentencia != malo2) {

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
                            let p_cc = 0;
                            let d_cc = 0;
                            let p_ce = 0;
                            let d_ce = 0;
                            unicos_datos_uni.forEach(uni => {
                                if (uni.punt_global != undefined) {
                                    p_g += parseInt(uni.punt_global);
                                } else {
                                    d_g += 1;
                                }

                                if (uni.mod_ingles_punt != undefined) {
                                    p_i += parseInt(uni.mod_ingles_punt);
                                } else {
                                    d_i += 1;
                                }

                                if (uni.mod_razona_cuantitat_punt != undefined) {
                                    p_r += parseInt(uni.mod_razona_cuantitat_punt);
                                } else {
                                    d_r += 1;
                                }

                                if (uni.mod_lectura_critica_punt != undefined) {
                                    p_l += parseInt(uni.mod_lectura_critica_punt);
                                } else {
                                    d_l += 1;
                                }

                                if (uni.mod_competen_ciudada_punt != undefined) {
                                    p_cc += parseInt(uni.mod_competen_ciudada_punt);
                                } else {
                                    d_cc += 1;
                                }

                                if (uni.mod_comuni_escrita_punt != undefined) {
                                    p_ce += parseInt(uni.mod_comuni_escrita_punt);
                                } else {
                                    d_ce += 1;
                                }
                            });

                            let obj = new InstitucionesICFES(unive.inst_nombre_institucion, p_g / (unicos_datos_uni.length - d_g), p_i / (unicos_datos_uni.length - d_i), p_r / (unicos_datos_uni.length - d_r), p_l / (unicos_datos_uni.length - d_l), p_cc / (unicos_datos_uni.length - d_cc), p_ce / (unicos_datos_uni.length - d_ce));

                            arregloICFES.push(obj);

                            if (conta == tam) {
                                funcionMagica(arregloICFES, 'PG DESC');
                            }
                            conta++;

                        });

                }

            });

        });
}


function funcionMagica(vectorX, ordenamiento) {
    var j = 1;
    tablaICFES = '';

    switch (ordenamiento) {
        case 'PG ASC':
            vectorX.sort(((a, b) => a.pg - b.pg));
            break;

        case 'PG DESC':
            vectorX.sort(((a, b) => b.pg - a.pg));
            break;

        case 'PI ASC':
            vectorX.sort(((a, b) => a.pi - b.pi));
            break;

        case 'PI DESC':
            vectorX.sort(((a, b) => b.pi - a.pi));
            break;

        case 'PR ASC':
            vectorX.sort(((a, b) => a.pr - b.pr));
            break;

        case 'PR DESC':
            vectorX.sort(((a, b) => b.pr - a.pr));
            break;

        case 'PL ASC':
            vectorX.sort(((a, b) => a.pl - b.pl));
            break;

        case 'PL DESC':
            vectorX.sort(((a, b) => b.pl - a.pl));
            break;

        case 'PCC ASC':
            vectorX.sort(((a, b) => a.pcc - b.pcc));
            break;

        case 'PCC DESC':
            vectorX.sort(((a, b) => b.pcc - b.pcc));
            break;

        case 'PCE ASC':
            vectorX.sort(((a, b) => a.pce - b.pce));
            break;

        case 'PCE ASC':
            vectorX.sort(((a, b) => b.pce - a.pce));
            break;


        default:

            break;
    }

    vectorX.forEach(i => {
        tablaICFES += `<tr>
        <td>${j++}</td>
        <td>${i.nombre}</td>
        <td>${Math.round(i.pg)}</td>
        <td>${Math.round(i.pi)}</td>
        <td>${Math.round(i.pr)}</td>
        <td>${Math.round(i.pl)}</td>
        <td>${Math.round(i.pcc)}</td>
        <td>${Math.round(i.pce)}</td>
    </tr>`;

        document.querySelector("#tablaICFES").innerHTML = tablaICFES;
    })

}

llenarArreglo();