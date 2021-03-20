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
  avatarEditButton,
  avatarEditFormElement,
  avatarEditUrlInput,
} from "../scripts/utils/constants.js";
import CardDeletePopup from "../scripts/components/CardDeletePopup.js";
import Api from "../scripts/components/Api.js";

let cardsList = null;

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-21",
  headers: {
    authorization: "b2348cde-61a3-4142-9d82-9cb96e2dc5c9",
    "Content-Type": "application/json",
  },
});

const photoPopup = new PopupWithImage(".photo-popup");
photoPopup.setEventListeners();

const userInfo = new UserInfo({
  usernameSelector: "#profile-heading",
  jobSelector: "#profile-subheading",
  avatarSelector: ".profile__avatar",
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

const avatarEditPopup = new PopupWithForm(
  "#avatar-edit-popup",
  handleAvatarEditFormSubmit
);
avatarEditPopup.setEventListeners();

const cardDeletingPopup = new CardDeletePopup(
  "#card-deleting-popup",
  handleDeleteForm
);
cardDeletingPopup.setEventListeners();

function handleDeleteForm(card) {
  const cardId = card.getId();
  return api
    .deleteCard(cardId)
    .then(() => {
      card.delete();
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleDeletePopupOpen(card) {
  cardDeletingPopup.open(card);
}

function openEditPopup() {
  editPopup.open();

  editPopupNameInput.value = userInfo.getUserInfo().name;
  editPopupJobInput.value = userInfo.getUserInfo().job;
}

function handleAvatarEditFormSubmit(data) {
  return api
    .changeUserAvatar(data)
    .then(() => {
      userInfo.setUserAvatar({ avatar: data.avatar });
    })
    .catch((err) => {
      console.log(err);
    });
}

function openAvatarEditPoup() {
  avatarEditPopup.open();

  avatarEditUrlInput.value = userInfo.getUserInfo().avatar;
}

function handleEditFormSubmit(data) {
  return api
    .changeUserInfo(data)
    .then(() => {
      userInfo.setUserInfo(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleOpenPhotoPoup(image, description) {
  photoPopup.open(image, description);
}

function handleCardAddingFormSubmit(data) {
  const newCardData = {
    name: data["place-name"],
    link: data["image-link"],
  };

  return api
    .createNewCard(newCardData)
    .then((data) => {
      const newCardElement = createCard({
        name: data.name,
        link: data.link,
        likes: 0,
        id: data._id,
        allowDelete: true,
      });

      cardsList.addItem(newCardElement);
    })
    .catch((err) => {
      console.log(err);
    });
}

function createCard(data) {
  const card = new Card(
    data,
    "#element-template",
    handleOpenPhotoPoup,
    handleDeletePopupOpen
  );
  return card.generateCard();
}

editButton.addEventListener("click", () => {
  openEditPopup();
});

cardAddingButton.addEventListener("click", () => {
  cardAddingPopup.open();
});

avatarEditButton.addEventListener("click", () => {
  openAvatarEditPoup();
});

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

const avatarEditPopupFormValidator = new FormValidator(
  formsConfig,
  avatarEditFormElement
);
avatarEditPopupFormValidator.enableValidation();

api
  .getMyInfo()
  .then((result) => {
    userInfo.setUserInfo({
      name: result.name,
      job: result.about,
    });
    userInfo.setUserAvatar({ avatar: result.avatar });
    return result._id;
  })
  .then((myId) => {
    return api.getInitialCards().then((data) => {
      cardsList = new Section(
        {
          items: data.reverse(),
          renderer: (dataItem) => {
            const cardData = {
              name: dataItem.name,
              link: dataItem.link,
              likes: dataItem.likes.length,
              id: dataItem._id,
              allowDelete: dataItem.owner._id === myId,
              likedByMe: dataItem.likes.some((element) => element._id === myId),
            };
            const cardElement = createCard(cardData);
            cardsList.addItem(cardElement);
          },
        },
        "#elements-list"
      );
      cardsList.renderItems();
    });
  })
  .catch((err) => {
    console.log(err);
  });
