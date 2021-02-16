import Card from "./Card.js";

const editPopup = document.querySelector("#edit-profile-popup");
const editButton = document.querySelector("#profile-edit-button");

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

const popups = document.querySelectorAll(".popup");

function addCard(data) {
  const card = new Card(data,"#element-template");
  cardContainer.prepend(card.generateCard());
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
}

popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close-button")) {
      closePopup(popup);
    }
  });
});

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
  addCard(newCard);
  cardAddingPopupFormElement.reset();
}


editButton.addEventListener("click", () => {
  openEditPopup();
});

editPopupFormElement.addEventListener("submit", handleEditFormSubmit);

cardAddingButton.addEventListener("click", () => {
  openPopup(cardAddingPopup);
});

cardAddingPopupFormElement.addEventListener(
  "submit",
  handleCardAddingFormSubmit
);

initialCards.reverse().forEach((cardData) => {
  addCard(cardData);
})

