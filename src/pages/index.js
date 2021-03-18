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
import CardDeletePopup from "../scripts/components/CardDeletePopup.js";

let cardsList = null;

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

const cardDeletingPopup = new CardDeletePopup(
  "#card-deleting-popup",
  handleDeleteForm
);
cardDeletingPopup.setEventListeners();

function handleDeleteForm(card) {
  const cardId = card.getId();
  fetch(`https://mesto.nomoreparties.co/v1/cohort-21/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: "b2348cde-61a3-4142-9d82-9cb96e2dc5c9",
    },
  }).then((res) => {
    if (res.status === 200) {
      card.delete();
    }
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

function handleEditFormSubmit(data) {
  userInfo.setUserInfo(data);
  fetch("https://mesto.nomoreparties.co/v1/cohort-21/users/me", {
    method: "PATCH",
    headers: {
      authorization: "b2348cde-61a3-4142-9d82-9cb96e2dc5c9",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: data.name,
      about: data.job,
    }),
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

  fetch("https://mesto.nomoreparties.co/v1/cohort-21/cards", {
    method: "POST",
    headers: {
      authorization: "b2348cde-61a3-4142-9d82-9cb96e2dc5c9",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCardData),
  })
    .then((res) => res.json())
    .then((data) => {
      const newCardElement = createCard({
        name: data.name,
        link: data.link,
        likes: 0,
        id: data._id,
        allowDelete: true,
      });

      cardsList.addItem(newCardElement);
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

const userAvatar = document.querySelector(".profile__avatar");

fetch("https://mesto.nomoreparties.co/v1/cohort-21/users/me", {
  headers: {
    authorization: "b2348cde-61a3-4142-9d82-9cb96e2dc5c9",
  },
})
  .then((res) => res.json())
  .then((result) => {
    userAvatar.src = result.avatar;
    userInfo.setUserInfo({
      name: result.name,
      job: result.about,
    });
    return result._id;
  })
  .then((myId) => {
    fetch("https://mesto.nomoreparties.co/v1/cohort-21/cards", {
      headers: {
        authorization: "b2348cde-61a3-4142-9d82-9cb96e2dc5c9",
      },
    })
      .then((res) => res.json())
      .then((data) => {
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
              };
              const cardElement = createCard(cardData);
              cardsList.addItem(cardElement);
            },
          },
          "#elements-list"
        );
        cardsList.renderItems();
      });
  });