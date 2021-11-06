import {map, announcementIcon} from './map.js';

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

  similarAnnouncements.forEach((announcementItem) => {
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

    const removeBlockWithString = (block, template) => {
      if (block === '') {
        template.remove();
      }
    };

    titleTemplate.textContent = title;
    removeBlockWithString(title, timeTemplate);

    addressTemplate.textContent = address;
    removeBlockWithString(address, addressTemplate);

    priceTemplate.textContent = `${price} ₽/ночь`;
    removeBlockWithString(price, priceTemplate);

    const housing = housingTypesKeys.some((key) => type === key); // Проверяет наличие совпадений в словаре TYPE_OF_HOUSING с typeRandom, чтобы вывести соответвствующий тип жилья

    if (housing) {
      typeTemplate.textContent = TYPE_OF_HOUSING[type];
    }

    removeBlockWithString(type, typeTemplate);

    capacityTemplate.textContent = `${rooms} комнаты для ${guests} гостей`;

    if (rooms === '' || guests === '') {
      capacityTemplate.remove();
    }

    timeTemplate.textContent = `Заезд после ${arrival}, выезд до ${departure}`;

    if (arrival === '' || departure === '') {
      timeTemplate.remove();
    }

    const userFeatures = announcementItem.offer.features;
    const featuresTemplate = announcementTemplate.querySelector('.popup__features');
    const featuresList = featuresTemplate.querySelectorAll('.popup__feature');

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
    } else {
      photosTemplate.remove();
    }

    removeBlockWithString(arrayRandomPhotos, photosTemplate);

    descriptionTemplate.textContent = description;
    removeBlockWithString(description, descriptionTemplate);

    avatarTemplate.src = avatar;
    removeBlockWithString(avatar, avatarTemplate);

    templateContent.appendChild(announcementTemplate);
  });

  const balloon = Array.from(templateContent.querySelectorAll('.popup'));

  let j = 0;
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

    markerAnnouncement.addTo(map).bindPopup(balloon[j]);
    j++;
  });

  return templateContent;
};

export {getTemplate, templateContent};
