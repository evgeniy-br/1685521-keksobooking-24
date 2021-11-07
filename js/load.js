import {userForm} from './user-form.js';

const createLoader = (onSuccess, onError, activatePage) => () => {
  fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error('Не удалось получить данные. Попробуйте перезагрузить страницу');
    })
    .then((data) => {
      onSuccess(data);
      activatePage();
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

export {createLoader, setUserFormSubmit};
