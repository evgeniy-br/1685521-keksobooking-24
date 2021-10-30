const MIN_HEADLINE_LENGTH = 30;
const MAX_HEADLINE_LENGTH = 100;
const MAX_PRICE = 1000000;

const headlineInput = document.querySelector('#title');
const priceInput = document.querySelector('#price');
const roomNumberSelect = document.querySelector('#room_number');
const capacitySelect = document.querySelector('#capacity');
const capacityOptions = capacitySelect.querySelectorAll('option');

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

const formAnnouncement = document.querySelector('.ad-form');
const formAnnouncementFieldsets = formAnnouncement.querySelectorAll('fieldset');
const formMapFilters = document.querySelector('.map__filters');
const formMapFiltersFieldset = formMapFilters.querySelector('.map__features');
const formMapFiltersSelect = formMapFilters.querySelectorAll('.map__filter');

const activateInactiveState = () => {
  // Блокировка формы нового объявления
  formAnnouncement.classList.add('ad-form--disabled');
  formAnnouncementFieldsets.forEach((fieldset) => {
    fieldset.setAttribute('disabled', '');
  });
  // Блокировка фильтров
  formMapFilters.classList.add('map__filters--disabled');
  formMapFiltersFieldset.setAttribute('disabled', '');
  formMapFiltersSelect.forEach((select) => {
    select.setAttribute('disabled', '');
  });
};

activateInactiveState();

const activateActiveState = () => {
  // Разблокировка формы нового объявления
  formAnnouncement.classList.remove('ad-form--disabled');
  formAnnouncementFieldsets.forEach((fieldset) => {
    fieldset.removeAttribute('disabled', '');
  });
  // Разблокировка фильтров
  formMapFilters.classList.remove('map__filters--disabled');
  formMapFiltersFieldset.removeAttribute('disabled', '');
  formMapFiltersSelect.forEach((select) => {
    select.removeAttribute('disabled', '');
  });
};

activateActiveState();
