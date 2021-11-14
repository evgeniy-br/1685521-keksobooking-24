import { renderingBalloon } from './map.js';
import { determinePrice, determineFeatures, compareAds } from './filter.js';
import { markerGroup } from './map.js';

const TYPE_OF_HOUSING = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};
const templateContent = document.querySelector('#card').content; // Контент шаблона
const cardTemplate = templateContent.querySelector('.popup'); // Шаблон

const getTemplate = (similarAnnouncements) => {
  let announcementTemplate = cardTemplate.cloneNode(true); // Клон шаблона
  document.querySelector('#card').innerHTML = '';

  const housingTypeFilter = document.querySelector('#housing-type');
  const housingRoomsFilter = document.querySelector('#housing-rooms');
  const housingGuestsFilter = document.querySelector('#housing-guests');
  const typeValue = housingTypeFilter.value;
  const roomsValue = housingRoomsFilter.value;
  const guestsValue = housingGuestsFilter.value;

  // Получаем отфильтрованный массив с предпочтениями пользователя

  const similarAds = similarAnnouncements.filter((similarAnnouncement) => {
    const housingTypeFiltered = similarAnnouncement.offer.type === typeValue || typeValue === 'any';
    const priceFiltered = determinePrice(similarAnnouncement.offer.price);
    const roomsFiltered = similarAnnouncement.offer.rooms === +roomsValue || roomsValue === 'any';
    const guestsFiltered = similarAnnouncement.offer.guests === +guestsValue || guestsValue === 'any';
    const featuresFilter = determineFeatures(similarAnnouncement.offer.features);
    return housingTypeFiltered && priceFiltered && roomsFiltered && guestsFiltered && featuresFilter;
  });

  similarAds
    .slice()
    .sort(compareAds)
    .forEach((announcementItem) => {
      announcementTemplate = cardTemplate.cloneNode(true); // Клон шаблона
      const avatar = announcementItem.author.avatar;
      const description = announcementItem.offer.description;
      const title = announcementItem.offer.title;
      const address = announcementItem.offer.address;
      const housingTypesKeys = Object.keys(TYPE_OF_HOUSING);  // Массив ключей объекта TYPE_OF_HOUSING
      const type = announcementItem.offer.type;
      const price = announcementItem.offer.price;
      const rooms = announcementItem.offer.rooms;
      const guests = announcementItem.offer.guests;
      const arrival = announcementItem.offer.checkin;
      const departure = announcementItem.offer.checkout;
      const photosTemplate = announcementTemplate.querySelector('.popup__photos');
      const photosCollection = photosTemplate.children;
      const photoTemplate = photosTemplate.querySelector('.popup__photo');
      const arrayRandomPhotos = announcementItem.offer.photos;
      const titleTemplate = announcementTemplate.querySelector('.popup__title');
      const addressTemplate = announcementTemplate.querySelector('.popup__text--address');
      const priceTemplate = announcementTemplate.querySelector('.popup__text--price');
      const typeTemplate = announcementTemplate.querySelector('.popup__type');
      const capacityTemplate = announcementTemplate.querySelector('.popup__text--capacity');
      const timeTemplate = announcementTemplate.querySelector('.popup__text--time');
      const descriptionTemplate = announcementTemplate.querySelector('.popup__description');
      const avatarTemplate = announcementTemplate.querySelector('.popup__avatar');
      const userFeatures = announcementItem.offer.features;
      const featuresTemplate = announcementTemplate.querySelector('.popup__features');
      const featuresList = featuresTemplate.querySelectorAll('.popup__feature');

      const housing = housingTypesKeys.some((key) => type === key); // Проверяет наличие совпадений в словаре TYPE_OF_HOUSING с typeRandom, чтобы вывести соответвствующий тип жилья

      titleTemplate.textContent = title;

      addressTemplate.textContent = address;

      priceTemplate.textContent = `${price} ₽/ночь`;

      if (housing) {
        typeTemplate.textContent = TYPE_OF_HOUSING[type];
      }

      capacityTemplate.textContent = `${rooms} комнаты для ${guests} гостей`;

      timeTemplate.textContent = `Заезд после ${arrival}, выезд до ${departure}`;

      if (userFeatures) {
        featuresList.forEach((featuresListItem) => {
          const isNecessary = userFeatures.some(
            (userFeature) => featuresListItem.classList.contains(`popup__feature--${userFeature}`),
          );

          if (!isNecessary) {
            featuresListItem.remove();
          }
        });
      } else {
        featuresTemplate.remove();
      }

      photosTemplate.innerHTML = ''; // Чистит элемент с фото жилья
      if (arrayRandomPhotos) {
        let i = 0;
        while (photosCollection.length < arrayRandomPhotos.length) {
          const clonePhoto = photoTemplate.cloneNode(true);
          clonePhoto.src = arrayRandomPhotos[i];
          photosTemplate.appendChild(clonePhoto);
          i++;
        }
      }

      descriptionTemplate.textContent = description;

      avatarTemplate.src = avatar;

      templateContent.appendChild(announcementTemplate);
    });

  const balloons = Array.from(templateContent.querySelectorAll('.popup'));

  markerGroup.clearLayers();

  renderingBalloon(similarAds.slice(0, 10), balloons);
};

export { getTemplate, templateContent };
