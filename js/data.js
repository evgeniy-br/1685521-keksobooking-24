import {getRandomInteger, getRandomFractionalNumber} from './util.js';

const AVATAR_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const TITLE = 'Условия проживания';
const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECKIN_TIME_OPTIONS = ['12:00', '13:00', '14:00'];
const CHECKOUT_TIME_OPTIONS = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const DESCRIPTION = 'Вам понравится!';
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const createAnnouncement = function () {
  const randomPrice = getRandomInteger(1, 100);
  const randomType = getRandomInteger(0, TYPES.length - 1);
  const randomRooms = getRandomInteger(1, 5);
  const randomGuests = getRandomInteger(1, 10);
  const randomCheckin = getRandomInteger(0, CHECKIN_TIME_OPTIONS.length - 1);
  const randomCheckout = getRandomInteger(0, CHECKOUT_TIME_OPTIONS.length - 1);
  const randomLat = getRandomFractionalNumber(35.65, 35.7, 5);
  const randomLng = getRandomFractionalNumber(139.7, 139.8, 5);
  let authorAvatar;

  const getAvatarNumber = function () {
    const randomAvatarNumber = getRandomInteger(0, AVATAR_NUMBERS.length - 1);
    let numberAvatar = AVATAR_NUMBERS[randomAvatarNumber];
    if (numberAvatar < 10) {
      numberAvatar = `0${numberAvatar}`;
    }
    authorAvatar = `img/avatars/user${numberAvatar}.png`;

    return authorAvatar;
  };

  getAvatarNumber();

  const randomArrayFeatures = [];

  const getRandomFeatures = function () {
    const lengthRandom = getRandomInteger(1, FEATURES.length);
    while (randomArrayFeatures.length < lengthRandom) {
      const index = getRandomInteger(0, FEATURES.length - 1);
      if (!randomArrayFeatures.includes(FEATURES[index])) {
        randomArrayFeatures.push(FEATURES[index]);
      }
    }

    return randomArrayFeatures;
  };

  getRandomFeatures();

  const randomArrayPhotos = [];

  const getRandomPhotos = function () {
    const lengthArrayPhoto = getRandomInteger(1, PHOTOS.length);
    while (randomArrayPhotos.length < lengthArrayPhoto) {
      const index = getRandomInteger(0, PHOTOS.length - 1);
      if (!randomArrayPhotos.includes(PHOTOS[index])) {
        randomArrayPhotos.push(PHOTOS[index]);
      }
    }
  };

  getRandomPhotos();

  const announcement = {
    author:{
      avatar: authorAvatar,
    },
    offer:{
      title: TITLE,
      address: `${randomLat}, ${randomLng}`,
      price: randomPrice,
      type: TYPES[randomType],
      rooms: randomRooms,
      guests: randomGuests,
      checkin: CHECKIN_TIME_OPTIONS[randomCheckin],
      checkout: CHECKOUT_TIME_OPTIONS[randomCheckout],
      features: randomArrayFeatures,
      description: DESCRIPTION,
      photos: randomArrayPhotos,
    },
    location:{
      lat: randomLat,
      lng: randomLng,
    },
  };

  const orderOfObjects = [
    'author',
    'offer',
    'location',
  ];

  orderOfObjects.forEach((value) => {
    const order = value;
    return order;
  });

  return announcement;
};

const similarAnnouncements = Array.from({length: 10}, createAnnouncement);

export {similarAnnouncements};
