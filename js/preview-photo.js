const FILE_TYPES = ['gif', 'jpeg', 'jpg', 'png'];

const fileChooserFotoForMap = document.querySelector('.ad-form__field input[type=file]');
const previewFotoForMap = document.querySelector('.ad-form-header__preview img');
const fileChooserHousesFoto = document.querySelector('.ad-form__upload input[type=file]');
const housesFotoContainer = document.querySelector('.ad-form__photo');

const createElementfoto = () => {
  const newElementImg = document.createElement('img');
  newElementImg.setAttribute('src', '');
  newElementImg.setAttribute('alt', 'Предпросмотр загруженной фотографии жилья');
  newElementImg.setAttribute('width', '70');
  newElementImg.setAttribute('height', '70');
  newElementImg.style.objectFit = 'contain';
  housesFotoContainer.appendChild(newElementImg);

  return newElementImg;
};

fileChooserFotoForMap.addEventListener('change', () => {
  const file = fileChooserFotoForMap.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((filetype) => fileName.endsWith(filetype));

  if (matches) {
    previewFotoForMap.src = URL.createObjectURL(file);
  }
});

fileChooserHousesFoto.addEventListener('change', () => {
  const file = fileChooserHousesFoto.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((filetype) => fileName.endsWith(filetype));

  if (matches) {
    createElementfoto()
      .src = URL.createObjectURL(file);
  }
});
