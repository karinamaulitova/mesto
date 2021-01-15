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

const cardContainer = document.querySelector("#elements-list");

const cardPopup = document.querySelector(".photo-popup");

const cardPopupCloseButton = document.querySelector(
  ".photo-popup__close-button"
);

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function createCard(cardData) {
  const cardTemplate = document.querySelector("#element-template").content;
  const cardElement = cardTemplate.cloneNode(true);

  const likeButton = cardElement.querySelector(".elements__like-button");

  const deleteButton = cardElement.querySelector(".elements__delete-button");

  const cardImage = cardElement.querySelector(".elements__photo");

  cardElement.querySelector(".elements__description").textContent =
    cardData.name;
  cardElement.querySelector(".elements__photo").src = cardData.link;
  cardElement.querySelector(".elements__photo").alt = cardData.name;

  cardImage.addEventListener("click", function () {

    openPopup(cardPopup);

    cardPopup.querySelector(".photo-popup__description").textContent =
      cardData.name;
    cardPopup.querySelector(".photo-popup__image").src = cardData.link;
    cardPopup.querySelector(".photo-popup__image").alt = cardData.name;
  });

  cardPopupCloseButton.addEventListener("click", () => {
    closePopup(cardPopup);
  });

  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("elements__like-button_active");
  });

  deleteButton.addEventListener("click", function () {
    const cardItem = deleteButton.closest(".elements__item");
    cardItem.remove();
  });
  return cardElement;
}

function addCard(container, cardElement) {
  container.prepend(cardElement);
}

function openEditPopup() {
  openPopup(editPopup);

  editPopupNameInput.value = editPopupName.textContent;
  editPopupJobInput.value = editPopupJob.textContent;
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();

  editPopupName.textContent = editPopupNameInput.value;
  editPopupJob.textContent = editPopupJobInput.value;

  closePopup(editPopup);
}

function handleCardAddingFormSubmit(evt) {
  evt.preventDefault();

  const newCard = {
    name: cardAddingPopupPlaceNameInput.value,
    link: cardAddingPopupImageLinkInput.value,
  };

  closePopup(cardAddingPopup);
  addCard(cardContainer, createCard(newCard));
  cardAddingPopupFormElement.reset();
}

initialCards.reverse().forEach((cardData) => {
  addCard(cardContainer, createCard(cardData));
});
editButton.addEventListener("click", () => {
  openPopup(editPopup);
});

editPopupCloseButton.addEventListener("click", () => {
  closePopup(editPopup);
});

editPopupFormElement.addEventListener("submit", handleEditFormSubmit);

cardAddingButton.addEventListener("click", () => {
  openPopup(cardAddingPopup);
});

cardAddingCloseButton.addEventListener("click", () => {
  closePopup(cardAddingPopup);
});

cardAddingPopupFormElement.addEventListener(
  "submit",
  handleCardAddingFormSubmit
);
