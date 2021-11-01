const START_LAT = 35.68469;
const START_LNG = 139.77086;

const address = document.querySelector('#address');
address.setAttribute('value', `${START_LAT}, ${START_LNG}`);

const map = L.map('map-canvas')
  .on('load', () => {
    console.log('Карта есть');
  })
  .setView({
    lat: START_LAT,
    lng: START_LNG,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon(
  {
    iconUrl: 'img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  },
);

const marker = L.marker(
  {
    lat: START_LAT,
    lng: START_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

marker.addTo(map);
console.log(marker);

marker.on('moveend', (evt) => {
  const newСoordinates = evt.target.getLatLng();
  const {lat, lng} = newСoordinates;
  address.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
});
