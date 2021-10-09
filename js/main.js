const getRandomInteger = function(min, max) {
  if (min < 0 || min >= max) {
    throw new Error('Некорректный диапозон чисел');
  }

  return Math.floor(min + Math.random() * (max + 1 - min));
};

const getRandomFractionalNumber = function(min, max, numberOfSigns) {
  if (min < 0 || min >= max) {
    throw new Error('Некорректный диапозон чисел');
  }
  const randomNumber = min + Math.random() * (max - min);

  return +randomNumber.toFixed(numberOfSigns);
};

const AVATAR_NUMBER  = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const TITLE = 'Условия проживания';
const TYPE = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECKIN = ['12:00', '13:00', '14:00'];
const CHECKOUT = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const DESCRIPTION = 'Вам понравится!';
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const createAnnouncement = function () {
  const randomPrice = getRandomInteger(1, 100);
  const randomType = getRandomInteger(0, TYPE.length - 1);
  const randomRooms = getRandomInteger(1, 5);
  const randomGuests = getRandomInteger(1, 10);
  const randomCheckin = getRandomInteger(0, CHECKIN.length - 1);
  const randomCheckout = getRandomInteger(0, CHECKOUT.length - 1);
  const randomLat = getRandomFractionalNumber(35.65, 35.7, 5);
  const randomLng = getRandomFractionalNumber(139.7, 139.8, 5);
  let authorAvatar;

  const getAvatarNumber = function () {
    const randomAvatarNumber = getRandomInteger(0, AVATAR_NUMBER.length - 1);
    let numberAvatar = AVATAR_NUMBER[randomAvatarNumber];
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
      type: TYPE[randomType],
      rooms: randomRooms,
      guests: randomGuests,
      checkin: CHECKIN[randomCheckin],
      checkout: CHECKOUT[randomCheckout],
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

const similarAnnouncement = Array.from({length: 10}, createAnnouncement);

similarAnnouncement;
