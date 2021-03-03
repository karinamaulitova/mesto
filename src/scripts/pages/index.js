import "../../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import {
  editButton,
  editPopupFormElement,
  editPopupNameInput,
  editPopupJobInput,
  cardAddingButton,
  cardAddingPopupFormElement,
  formsConfig,
} from "../utils/constants.js";
import { initialCards } from "../utils/initial-cards.js";

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

  const card = new Card(newCardData, "#element-template", handleOpenPhotoPoup);

  cardsList.addItem(card.generateCard());
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
      const card = new Card(item, "#element-template", handleOpenPhotoPoup);
      const cardElement = card.generateCard();
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
