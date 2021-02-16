const photoPopupElement = document.querySelector(".photo-popup");
const photoPopupDescriptionElement = photoPopupElement.querySelector(".photo-popup__description");
const photoPopupImageElement = photoPopupElement.querySelector(".photo-popup__image");

export default class Card {
  constructor(data, cardSelector) {
    this._image = data.link;
    this._description = data.name;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.cloneNode(true);

    return cardElement;
  }

  _handleOpenPopup() {
    photoPopupElement.classList.add("popup_opened");
    photoPopupDescriptionElement .textContent = this._description;
    photoPopupImageElement.src = this._image;
    photoPopupImageElement.alt = this._description;
  }

  _handleLike() {
    this._likeButtonElement.classList.toggle("elements__like-button_active");
  }

  _hadleDeleteCard() {
    const cardItem = this._deleteButtonElement.closest(".elements__item");
    cardItem.remove();
  }

  _setEventListeners() {
    this._imageElement.addEventListener("click", () => {
      this._handleOpenPopup();
    });

    this._likeButtonElement.addEventListener("click", () => {
      console.log("меня нажали");
      this._handleLike();
    });

    this._deleteButtonElement.addEventListener("click", () => {
      this._hadleDeleteCard();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._imageElement = this._element.querySelector(".elements__photo");
    this._likeButtonElement = this._element.querySelector(
      ".elements__like-button"
    );
    this._deleteButtonElement = this._element.querySelector(
      ".elements__delete-button"
    );
    this._setEventListeners();

    this._element.querySelector(".elements__photo").src = this._image;
    this._element.querySelector(
      ".elements__description"
    ).textContent = this._description;

    return this._element;
  }
}
