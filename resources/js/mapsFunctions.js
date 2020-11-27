// Inicializar y añadir el mapa
function initMap() {

  // La localización de Neiva
  const neiva = {lat: 2.93537, lng: -75.288911};

  // El mapa, centrado en Neiva
  let zoom = parseInt(document.querySelector("#txtZoom").value);
  if(zoom == undefined || zoom == null || zoom == ""){
    zoom = 12;
  }

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: zoom,
    center: neiva,
  });
  
  addMarkers(map);
}

//Añadir marcadores en el mapa
function addMarkers(map) {
  fetch('https://www.datos.gov.co/resource/knjs-bqqm.json')
    .then(response => response.json())
    .then(data => {
      data.forEach(element => {
        let image = getMarkerImage(element.tipo);
        let location = {lat: parseFloat(element.geocoded_column.latitude), lng: parseFloat(element.geocoded_column.longitude)};
        const marker = new google.maps.Marker({
          position: location, 
          map: map,
          title: element.nombre_del_establecimiento,
          icon: image,
          draggable: true
        });
      });
    });
}

function getMarkerImage(type){
  let image = "";
  switch (type) {
    case 'RESTAURANTE':
      image = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
      break;

    case 'BAR':
      image = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
      break;

      case 'PIZZERIA':
        image = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
        break;

      case 'DISCOTECA':
        image = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
        break;

    default:
      image = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
      break;
  }

  return image;
}


function refreshZoom(){
  initMap();
}