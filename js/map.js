import { activateActiveState } from './user-form.js';

const START_LAT = 35.68469;
const START_LNG = 139.77086;
const MAIN_MARKER_WIDTH = 52;
const MAIN_MARKER_HEIGHT = 52;
const MAIN_MARKER_WIDTH_ANCHOR = 26;
const MAIN_MARKER_HEIGHT_ANCHOR = 52;
const ANNOUNCEMENT_MARKER_WIDTH = 40;
const ANNOUNCEMENT_MARKER_HEIGHT = 40;
const ANNOUNCEMENT_MARKER_WIDTH_ANCHOR = 20;
const ANNOUNCEMENT_MARKER_HEIGHT_ANCHOR = 40;


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
    iconSize: [MAIN_MARKER_WIDTH, MAIN_MARKER_HEIGHT],
    iconAnchor: [MAIN_MARKER_WIDTH_ANCHOR, MAIN_MARKER_HEIGHT_ANCHOR],
  },
);

const announcementIcon = L.icon(
  {
    iconUrl: 'img/pin.svg',
    iconSize: [ANNOUNCEMENT_MARKER_WIDTH, ANNOUNCEMENT_MARKER_HEIGHT],
    iconAnchor: [ANNOUNCEMENT_MARKER_WIDTH_ANCHOR, ANNOUNCEMENT_MARKER_HEIGHT_ANCHOR],
  },
);

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

const resetMainMarker = () => {
  mainMarker.setLatLng({
    lat: START_LAT,
    lng: START_LNG,
  });
};

const markerGroup = L.layerGroup().addTo(map);

const renderingBalloon = (ads, balloon) => {
  let j = 0;

  ads.forEach((ad) => {
    const {lat, lng} = ad.location;
    const markerAnnouncement = L.marker(
      {
        lat,
        lng,
      },
      {
        icon: announcementIcon,
      },
    );

    markerAnnouncement.addTo(markerGroup).bindPopup(balloon[j]);
    j++;
  });

  activateActiveState();
};

export { resetMainMarker, renderingBalloon, map, announcementIcon, markerGroup };


