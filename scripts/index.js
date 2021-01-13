const editPopup = document.querySelector('#edit-profile-popup');
const editButton = document.querySelector('#profile-edit-button');
const editPopupCloseButton = document.querySelector('#edit-profile-popup-close-button');
const editPopupFormElement = document.querySelector('#edit-profile-popup-form');
const editPopupNameInput = editPopupFormElement.querySelector('#edit-profile-popup-name-input');
const editPopupJobInput = editPopupFormElement.querySelector('#edit-profile-popup-job-input');
const editPopupName = document.querySelector('#profile-heading');
const editPopupJob = document.querySelector('#profile-subheading');
const cardsContainer = document.querySelector('#elements-list');

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

  function addCard(nameValue, linkValue) {
    const cardTemplate = document.querySelector('#element-template').content;
    const cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.elements__description').textContent = nameValue;
    cardElement.querySelector('.elements__photo').src = linkValue;

    cardsContainer.append(cardElement);
  }

  addCard(initialCards[0].name, initialCards[0].link);

function openPopup () {
    editPopup.classList.add('popup_opened');

    editPopupNameInput.value = editPopupName.textContent;
    editPopupJobInput.value = editPopupJob.textContent;
}


function closePopup () {
    editPopup.classList.remove('popup_opened');
}


function handleFormSubmit (evt) {
    evt.preventDefault(); 

    editPopupName.textContent = editPopupNameInput.value;
    editPopupJob.textContent = editPopupJobInput.value;;

    closePopup();
}


editButton.addEventListener('click', openPopup);
editPopupCloseButton.addEventListener('click', closePopup);
editPopupFormElement.addEventListener('submit', handleFormSubmit); 