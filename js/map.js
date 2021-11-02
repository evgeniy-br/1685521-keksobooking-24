import {similarAnnouncements} from './data.js';
import {getTemplate} from './popup.js';
import {activateActiveState} from './user-form.js';

const START_LAT = 35.68469;
const START_LNG = 139.77086;

const address = document.querySelector('#address');

address.setAttribute('value', `${START_LAT}, ${START_LNG}`);

const map = L.map('map-canvas')
  .on('load', () => {
    activateActiveState();
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

const announcementIcon = L.icon(
  {
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  },
);

const balloon = getTemplate().querySelectorAll('.popup');
let i = 0;


similarAnnouncements.forEach((data) => {
  const newСoordinates = data.location;
  const {lat, lng} = newСoordinates;
  const markerAnnouncement = L.marker(
    {
      lat,
      lng,
    },
    {
      icon: announcementIcon,
    },
  );

  markerAnnouncement.addTo(map).bindPopup(balloon[i]);
  i++;
});

const mainMarker = L.marker(
  {
    lat: START_LAT,
    lng: START_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainMarker.addTo(map);

mainMarker.on('moveend', (evt) => {
  const newСoordinates = evt.target.getLatLng();
  const {lat, lng} = newСoordinates;
  address.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
});
