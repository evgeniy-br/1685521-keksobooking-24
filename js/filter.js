import {isArrayInclude} from './util.js';

const PRICE = {
  LOW: 10000,
  HIGHT: 50000,
};

const determinePrice = (price) => {
  const housingPriceFilter = document.querySelector('#housing-price');

  let isRequiredPrice;
  switch (housingPriceFilter.value) {
    case 'middle':
      isRequiredPrice = (price >= PRICE.LOW) && (price < PRICE.HIGHT);
      break;
    case 'low':
      isRequiredPrice = (price < PRICE.LOW);
      break;
    case 'high':
      isRequiredPrice = (price >= PRICE.HIGHT);
      break;
    default:
      isRequiredPrice = true;
  }

  return isRequiredPrice;
};

const determineFeatures = (serverFeatures) => {
  const features = document.querySelector('#housing-features');
  const checkedFeatures = features.querySelectorAll('input:checked');
  const checkedFeaturesArray = [];

  for (let i = 0; i < checkedFeatures.length; i++) {
    checkedFeaturesArray.push(checkedFeatures[i].value);
  }

  return isArrayInclude(serverFeatures, checkedFeaturesArray);
};
// Функция рассчёта рейтинга объявления по общему числу удобств

const getAdRank = (similarAd) => {
  const features = document.querySelector('#housing-features');
  const checkedFeatures = Array.from(features.querySelectorAll('input:checked'));
  let serverFeatures = similarAd.offer.features;
  let rank = 0;

  if (serverFeatures === undefined) {
    serverFeatures = [];
  }

  rank += serverFeatures.length - checkedFeatures.length;

  return rank;
};

// Коллбэк для фильтрации объявлений по общему числу удобств

const compareAds = (adA, adB) => {
  const rankA = getAdRank(adA);
  const rankB = getAdRank(adB);

  return rankB - rankA;
};
export {determinePrice, determineFeatures, compareAds};
