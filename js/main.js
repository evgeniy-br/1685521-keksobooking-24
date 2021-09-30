const getRandomInteger = function(min, max) {
  if (min < 0 || min >= max) {
    throw new Error('Некорректный диапозон чисел');
  }

  return Math.floor(min + Math.random() * (max + 1 - min));
};

getRandomInteger(10, 100);

const getRandomFractionalNumber = function(min, max, numberOfSigns) {
  if (min < 0 || min >= max) {
    throw new Error('Некорректный диапозон чисел');
  }
  const randomNumber = min + Math.random() * (max - min);

  return + randomNumber.toFixed(numberOfSigns);
};

getRandomFractionalNumber(15, 20, 10);
