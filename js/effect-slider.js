/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
const uploadForm = document.querySelector('.img-upload__form');
const effectList = uploadForm.querySelector('.effects__list');
const imgUploadWrapper = document.querySelector('.img-upload__wrapper');
const slider = imgUploadWrapper.querySelector('.effect-level__slider');
const effectLevel = imgUploadWrapper.querySelector('.img-upload__effect-level');
const effectLevelValue = imgUploadWrapper.querySelector('.effect-level__value');
const imgPreview = imgUploadWrapper.querySelector('.img-upload__preview');

const EFFECTS = [
  {
    name: 'none',
    style: '',
    min: 0,
    max: 1,
    start: 100,
    step: 1,
    unit: ''
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    start: 100,
    step: 0.1,
    unit: ''
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    start: 100,
    step: 0.1,
    unit: ''
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    start: 100,
    step: 1,
    unit: '%'
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    start: 100,
    step: 0.1,
    unit: 'px'
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    start: 100,
    step: 0.1,
    unit: ''
  },
];

let currentEffect = EFFECTS[0];

noUiSlider.create(slider, {
  start: currentEffect.max,
  connect: 'lower',
  range: {
    min: currentEffect.min,
    max: currentEffect.max,
  },
});

slider.noUiSlider.on('update', () => {
  effectLevelValue.value = slider.noUiSlider.get();
});

const hideEffectSlider = () => {
  effectLevel.classList.add('hidden');
};

const showEffectSlider = () => {
  effectLevel.classList.remove('hidden');
};

const updateEffectSlider = () => {
  slider.noUiSlider.updateOptions({
    range: {
      min: currentEffect.min,
      max: currentEffect.max,
    },
    start: currentEffect.start,
    step: currentEffect.step,
  });
  slider.noUiSlider.on('update', () => {
    imgPreview.style.filter = `${currentEffect.style}(${effectLevelValue.value}${currentEffect.unit})`;
  });
};

const onEffectListChange = (evt) => {
  const effect = evt.target.value;

  if (effect === 'none') {
    hideEffectSlider();
    resetEffectSlider();
  } else {
    showEffectSlider();
  }

  currentEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  imgPreview.className = `img-upload__preview effects__preview--${currentEffect.name}`;
  updateEffectSlider();
};

const resetEffectSlider = () => {
  imgPreview.className = 'img-upload__preview';
  imgPreview.style = 'none';
  effectLevelValue.value = 0;
};

hideEffectSlider();

effectList.addEventListener('change', onEffectListChange);
