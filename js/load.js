import {userForm} from './user-form.js';

const createLoader = (onSuccess, onError) => () => {
  fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        onError('Не удалось получить данные. Попробуйте перезагрузить страницу');
      }
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      onError('Не удалось получить данные. Попробуйте перезагрузить страницу');
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

export {createLoader, setUserFormSubmit};
