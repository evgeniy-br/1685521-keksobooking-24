import { userForm, setFilterChange } from './user-form.js';
import { debounce } from './utils/debounce.js';
import { compareAds } from './filter.js';

const RERENDER_DELAY = 500;

const createLoader = (onSuccess, onError) => () => {
  fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error('Не удалось получить данные с сервера. Попробуйте позже');
    })
    .then((data) => {
      onSuccess(data.slice().sort(compareAds).slice(0, 10));
      setFilterChange(debounce(() => onSuccess(data), RERENDER_DELAY));
    })
    .catch((err) => {
      onError(err);
    });
};

const setUserFormSubmit = (onSuccess, onError) => {
  userForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    fetch(
      'https://24.javascript.pages.academy/keksobooking',
      {
        method: 'POST',
        body: formData,
      },
    )
      .then((responce) =>  {
        if (responce.ok) {
          onSuccess();
        } else {
          onError();
        }
      })
      .catch(() => {
        onError();
      });
  });
};

export { createLoader, setUserFormSubmit };
