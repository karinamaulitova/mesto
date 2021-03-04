import "./index.css";
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import {
  editButton,
  editPopupFormElement,
  editPopupNameInput,
  editPopupJobInput,
  cardAddingButton,
  cardAddingPopupFormElement,
  formsConfig,
} from "../scripts/utils/constants.js";
import { initialCards } from "../scripts/utils/initial-cards.js";

const photoPopup = new PopupWithImage(".photo-popup");
photoPopup.setEventListeners();

const userInfo = new UserInfo({
  usernameSelector: "#profile-heading",
  jobSelector: "#profile-subheading",
});

const editPopup = new PopupWithForm(
  "#edit-profile-popup",
  handleEditFormSubmit
);
editPopup.setEventListeners();

const cardAddingPopup = new PopupWithForm(
  "#card-adding-popup",
  handleCardAddingFormSubmit
);
cardAddingPopup.setEventListeners();

function openEditPopup() {
  editPopup.open();

  editPopupNameInput.value = userInfo.getUserInfo().name;
  editPopupJobInput.value = userInfo.getUserInfo().job;
}

function handleEditFormSubmit(data) {
  userInfo.setUserInfo(data);
}

function handleOpenPhotoPoup(image, description) {
  photoPopup.open(image, description);
}

function handleCardAddingFormSubmit(data) {
  const newCardData = {
    name: data["place-name"],
    link: data["image-link"],
  };

  const newCardElement = createCard(newCardData);

  cardsList.addItem(newCardElement);
}

function createCard(data) {
  const card = new Card(data, "#element-template", handleOpenPhotoPoup);
  return card.generateCard();
}

editButton.addEventListener("click", () => {
  openEditPopup();
});

cardAddingButton.addEventListener("click", () => {
  cardAddingPopup.open();
});

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardsList.addItem(cardElement);
    },
  },
  "#elements-list"
);

cardsList.renderItems();

const editPopupFormValidator = new FormValidator(
  formsConfig,
  editPopupFormElement
);
editPopupFormValidator.enableValidation();

const cardAddingPopupFormValidator = new FormValidator(
  formsConfig,
  cardAddingPopupFormElement
);
cardAddingPopupFormValidator.enableValidation();
