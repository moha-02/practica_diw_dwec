var map = L.map("map").setView([51.505, -0.09], 13);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 60,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

var myIcon = L.icon({
  iconUrl: "../assets/klipartz.com.png",
  iconSize: [50, 95],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
});

var beachesData = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {},
      geometry: {
        coordinates: [3.1222629999997196, 39.83529995422947],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {},
      geometry: {
        coordinates: [3.1182290000010937, 39.808469999999744],
        type: "Point",
      },
      id: 1,
    },
    {
      type: "Feature",
      properties: {},
      geometry: {
        coordinates: [3.2302330954923377, 39.73452866150288],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {},
      geometry: {
        coordinates: [3.461038783845055, 39.709515088862105],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {},
      geometry: {
        coordinates: [3.433579957671782, 39.74401849899027],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {},
      geometry: {
        coordinates: [3.440556138020071, 39.65657143073335],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {},
      geometry: {
        coordinates: [2.6628426962996627, 39.56199006824946],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {},
      geometry: {
        coordinates: [2.7194169999995665, 39.53445582358958],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {},
      geometry: {
        coordinates: [3.2800377375358494, 39.73802960523136],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {},
      geometry: {
        coordinates: [3.083451594015145, 39.907001387983854],
        type: "Point",
      },
    },
  ],
};


let marker,circle,zoomed;

function success(pos){
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    const accuracy = pos.coords.accuracy;

    if(marker){
        map.removeLayer(marker);
        map.removeLayer(circle);
    }

    marker = L.marker([lat,lng],{icon: myIcon}).addTo(map);
    circle = L.circle([lat,lng],{radius: accuracy},{icon: myIcon}).addTo(map);

    if(!zoomed){
        zoomed = map.fitBounds(circle.getBounds());
    }
    map.setView([lat,lng]);

    marker.bindPopup("Estas aqui");
    marker.on('mouseover', function (e) {
        this.openPopup();
    });
    marker.on('mouseout', function (e) {
        this.closePopup();
    });

    let beaches = L.geoJSON(beachesData).addTo(map);
    beaches.on('click',function(e){
      
    })
    
}
function error(err){
    if(err.code === 1){
        alert("Permitir acceso a ubucacion")
    }
} 
navigator.geolocation.watchPosition(success,error);
