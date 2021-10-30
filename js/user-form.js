const MIN_HEADLINE_LENGTH = 30;
const MAX_HEADLINE_LENGTH = 100;
const MAX_PRICE = 1000000;
const PRICE_OF_HOUSING = {
  flat: 1000,
  bungalow: 0,
  house: 5000,
  palace: 10000,
  hotel: 3000,
};

const headlineInput = document.querySelector('#title');
const priceInput = document.querySelector('#price');
const roomNumberSelect = document.querySelector('#room_number');
const capacitySelect = document.querySelector('#capacity');
const capacityOptions = capacitySelect.querySelectorAll('option');
const typeOfHousingSelect = document.querySelector('#type');
const priceOfHousingKeys = Object.keys(PRICE_OF_HOUSING);
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');

//Валидация заголовка объявления "на лету"

headlineInput.addEventListener('input', () => {
  const valueLength = headlineInput.value.length;

  if (valueLength < MIN_HEADLINE_LENGTH) {
    headlineInput.setCustomValidity(`Введите ещё не менее ${MIN_HEADLINE_LENGTH - valueLength} симв.`);
  } else if (valueLength > MAX_HEADLINE_LENGTH) {
    headlineInput.setCustomValidity(`Удалите ${valueLength - MAX_HEADLINE_LENGTH} симв.`);
  } else {
    headlineInput.setCustomValidity('');
  }

  headlineInput.reportValidity();
});

priceInput.addEventListener('input', () => {
  const value = priceInput.value;

  if (value > MAX_PRICE) {
    priceInput.setCustomValidity(`Цена не может быть более ${MAX_PRICE}`);
  } else {
    priceInput.setCustomValidity('');
  }

  priceInput.reportValidity();
});

// Синхронизация полей "количество комнат" и "количество мест"

roomNumberSelect.addEventListener('input', () => {
  const roomNumberValue = roomNumberSelect.value;

  capacityOptions.forEach((option) => {
    const optionValue = option.value;
    const addsDiasabled = () => option.setAttribute('disabled', '');

    option.removeAttribute('disabled', '');

    if (optionValue > roomNumberValue || Number(optionValue) === Number(0)) {
      addsDiasabled();
    }

    if (Number(roomNumberValue) === Number(100)) {
      addsDiasabled();
      capacityOptions[3].removeAttribute('disabled', '');
    }
  });
});

// Синхронизация полей "тип жилья" и "цена за ночь"

typeOfHousingSelect.addEventListener('input', () => {
  const typeOfHousingValue = typeOfHousingSelect.value;
  const priceOfHousing = PRICE_OF_HOUSING[typeOfHousingValue];

  priceOfHousingKeys.some((key) => key === typeOfHousingValue); // Поиск соответсвия типа жилья с ценой
  priceInput.min = priceOfHousing;
  priceInput.placeholder = priceOfHousing;
});

// Синхронизация времени заезда и выезда

timeIn.addEventListener('input', () => {
  if (timeIn.value !== timeOut.value) {
    timeOut.value = timeIn.value;
  }
});

timeOut.addEventListener('input', () => {
  if (timeOut.value !== timeIn.value) {
    timeIn.value = timeOut.value;
  }
});
