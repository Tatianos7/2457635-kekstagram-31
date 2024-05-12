/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import { isEscapeKey } from './util.js';
import { arrayPhotos } from './data.js';

const thumbnailsList = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const userModalClosePicture = bigPicture.querySelector('.big-picture__cancel');
const body = document.querySelector('body');
const commentTemplate = bigPicture.querySelector('.social__comment');
const commentSection = bigPicture.querySelector('.social__comments');
const commentsShowCount = bigPicture.querySelector(
  '.social__comment-shown-count'
);
const commentsTotalCount = bigPicture.querySelector(
  '.social__comment-total-count'
);
const showMoreBtn = bigPicture.querySelector('.comments-loader');

let loadingStep = 1;
let temporaryComments = null;
const COMMENTS_PER_PERTION = 5;

const onEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
  }
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');

  document.removeEventListener('keydown', onEscKeydown);
  showMoreBtn.removeEventListener('click', onShowMoreBtnClick);
  userModalClosePicture.removeEventListener('click', closeBigPicture);
};

const renderPictureComments = (initialComments, comments) => {
  clearCommentsList();

  initialComments.forEach(({ avatar, message }) => {
    const comment = commentTemplate.cloneNode(true);
    comment.querySelector('.social__picture').src = avatar;
    comment.querySelector('.social__text').textContent = message;
    commentsShowCount.textContent = initialComments.length;
    commentsTotalCount.textContent = comments.length;
    commentSection.appendChild(comment);
  });
};

const onShowMoreBtnClick = () => {
  loadingStep += 1;
  const commentsToShowCount = COMMENTS_PER_PERTION * loadingStep;
  const commentsToShow = temporaryComments.slice(0, commentsToShowCount);
  renderPictureComments(commentsToShow, temporaryComments);
};

const renderBigPicture = ({ url, description, likes, comments }) => {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = url;
  bigPicture.querySelector('.big-picture__img').querySelector('img').alt =
    description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
};

const clearCommentsList = () => {
  commentSection.innerHTML = '';
};

const showBigPicture = ({ url, description, likes, comments }) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  renderBigPicture({ url, description, likes, comments });

  loadingStep = 1;
  temporaryComments = comments.slice(0);

  const initialComments = comments.slice(0, 5);
  renderPictureComments(initialComments, comments);

  document.addEventListener('keydown', onEscKeydown);
  showMoreBtn.addEventListener('click', onShowMoreBtnClick);
  userModalClosePicture.addEventListener('click', closeBigPicture);
};

thumbnailsList.addEventListener('click', (evt) => {
  if (!evt.target.closest('.picture')) {
    return;
  }

  const clickedId = evt.target.closest('.picture').dataset.id;
  const thumbnailsData = arrayPhotos.find(
    (item) => item.id === Number(clickedId)
  );

  showBigPicture(thumbnailsData);
});
