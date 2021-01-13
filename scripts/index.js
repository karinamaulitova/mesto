const editPopup = document.querySelector("#edit-profile-popup");
const editButton = document.querySelector("#profile-edit-button");
const editPopupCloseButton = document.querySelector(
  "#edit-profile-popup-close-button"
);
const editPopupFormElement = document.querySelector("#edit-profile-popup-form");
const editPopupNameInput = editPopupFormElement.querySelector(
  "#edit-profile-popup-name-input"
);
const editPopupJobInput = editPopupFormElement.querySelector(
  "#edit-profile-popup-job-input"
);
const editPopupName = document.querySelector("#profile-heading");
const editPopupJob = document.querySelector("#profile-subheading");

const cardAddingPopup = document.querySelector("#card-adding-popup");
const cardAddingButton = document.querySelector("#card-adding-button");
const cardAddingCloseButton = document.querySelector(
  "#card-adding-popup-close-button"
);
const cardAddingPopupFormElement = document.querySelector(
  "#card-adding-popup-form"
);
const cardAddingPopupPlaceNameInput = cardAddingPopupFormElement.querySelector(
  "#card-adding-popup-place-name-input"
);
const cardAddingPopupImageLinkInput = cardAddingPopupFormElement.querySelector(
  "#card-adding-popup-image-link-input"
);

const cardsContainer = document.querySelector("#elements-list");
const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

function addCard(card) {
  const cardTemplate = document.querySelector("#element-template").content;
  const cardElement = cardTemplate.cloneNode(true);

  const likeButton = cardElement.querySelector(".elements__like-button");

  const deleteButton = cardElement.querySelector(".elements__delete-button");

  const cardImage = cardElement.querySelector(".elements__photo");

  cardElement.querySelector(".elements__description").textContent = card.name;
  cardElement.querySelector(".elements__photo").src = card.link;

  cardImage.addEventListener("click", function () {
    const cardPopupTemplate = document.querySelector("#photo-popup-template")
      .content;

    const cardPopupElement = cardPopupTemplate.cloneNode(true);

    const cardPopupCloseButton = cardPopupElement.querySelector(
      ".photo-popup__close-button"
    );

    cardPopupElement.querySelector(".photo-popup__description").textContent =
      card.name;
    cardPopupElement.querySelector(".photo-popup__image").src = card.link;

    cardPopupCloseButton.addEventListener("click", function() {
        const cardPopupItem = cardPopupCloseButton.closest(".photo-popup");
        cardPopupItem.remove();
    });

    document.body.append(cardPopupElement);
  });

  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("elements__like-button_active");
  });

  deleteButton.addEventListener("click", function () {
    const cardItem = deleteButton.closest(".elements__item");
    cardItem.remove();
  });

  cardsContainer.prepend(cardElement);
}

function openEditPopup() {
  editPopup.classList.add("popup_opened");

  editPopupNameInput.value = editPopupName.textContent;
  editPopupJobInput.value = editPopupJob.textContent;
}

function openCardAddingPopup() {
  cardAddingPopup.classList.add("popup_opened");
}

function closeEditPopup() {
  editPopup.classList.remove("popup_opened");
}

function closeCardAddingPopup() {
  cardAddingPopup.classList.remove("popup_opened");
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();

  editPopupName.textContent = editPopupNameInput.value;
  editPopupJob.textContent = editPopupJobInput.value;

  closeEditPopup();
}

function handleCardAddingFormSubmit(evt) {
  evt.preventDefault();

  const newCard = {};

  newCard.name = cardAddingPopupPlaceNameInput.value;
  newCard.link = cardAddingPopupImageLinkInput.value;

  closeCardAddingPopup();
  addCard(newCard);
}

initialCards.reverse().forEach(addCard);
editButton.addEventListener("click", openEditPopup);
editPopupCloseButton.addEventListener("click", closeEditPopup);
editPopupFormElement.addEventListener("submit", handleEditFormSubmit);
cardAddingButton.addEventListener("click", openCardAddingPopup);
cardAddingCloseButton.addEventListener("click", closeCardAddingPopup);
cardAddingPopupFormElement.addEventListener(
  "submit",
  handleCardAddingFormSubmit
);
