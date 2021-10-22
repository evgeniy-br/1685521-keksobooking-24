import {similarAnnouncements} from './data.js';

const TYPE_OF_HOUSING = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};
const templateContent = document.querySelector('#card').content; // Контент шаблона
const cardTemplate = templateContent.querySelector('.popup'); // Шаблон
let announcementTemplate = cardTemplate.cloneNode(true); // Клон шаблона
const mapCanvas = document.querySelector('#map-canvas');

similarAnnouncements.forEach((announcementItem) => {
  announcementTemplate = cardTemplate.cloneNode(true); // Клон шаблона
  const housingTypesKeys = Object.keys(TYPE_OF_HOUSING);  // Массив ключей объекта TYPE_OF_HOUSING
  const typeRandom = announcementItem.offer.type;
  const price = announcementItem.offer.price;
  const rooms = announcementItem.offer.rooms;
  const guests = announcementItem.offer.guests;
  const arrival = announcementItem.offer.checkin;
  const departure = announcementItem.offer.checkout;
  const photosTemplate = announcementTemplate.querySelector('.popup__photos');
  const photosCollection = photosTemplate.children;
  const photoTemplate = photosTemplate.querySelector('.popup__photo');
  const arrayRandomPhotos = announcementItem.offer.photos;

  announcementTemplate.querySelector('.popup__title').textContent = announcementItem.offer.title;
  announcementTemplate.querySelector('.popup__text--address').textContent = announcementItem.offer.address;
  announcementTemplate.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`;

  const housing = housingTypesKeys.some((key) => typeRandom === key); // Проверяет наличие совпадений в словаре TYPE_OF_HOUSING с typeRandom, чтобы вывести соответвствующий тип жилья

  if (housing) {
    announcementTemplate.querySelector('.popup__type').textContent = TYPE_OF_HOUSING[typeRandom];
  }

  announcementTemplate.querySelector('.popup__text--capacity').textContent = `${rooms} комнаты для ${guests} гостей`;
  announcementTemplate.querySelector('.popup__text--time').textContent = `Заезд после ${arrival}, выезд до ${departure}`;

  const userFeatures = announcementItem.offer.features;
  const featuresContainerClone = announcementTemplate.querySelector('.popup__features');
  const featuresList = featuresContainerClone.querySelectorAll('.popup__feature');

  featuresList.forEach((featuresListItem) => {
    const isNecessary = userFeatures.some(
      (userFeature) => featuresListItem.classList.contains(`popup__feature--${userFeature}`),
    );

    if (!isNecessary) {
      featuresListItem.remove();
    }
  });

  photosTemplate.innerHTML = ''; // Чистит элемент с фото жилья

  let i = 0;
  while (photosCollection.length < arrayRandomPhotos.length) {
    const clonePhoto = photoTemplate.cloneNode(true);
    clonePhoto.src = arrayRandomPhotos[i];
    photosTemplate.appendChild(clonePhoto);
    i++;
  }

  announcementTemplate.querySelector('.popup__description').textContent = announcementItem.offer.description;
  announcementTemplate.querySelector('.popup__avatar').src = announcementItem.author.avatar;
});

mapCanvas.appendChild(announcementTemplate);
