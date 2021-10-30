const map = L.map('map-canvas')
  .on('load', () => {
    console.log('Карта есть');
  })
  .setView({
    lat: 35.68950,
    lng: 139.69200,
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
    lat: 35.68950,
    lng: 139.69200,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

marker.addTo(map);


