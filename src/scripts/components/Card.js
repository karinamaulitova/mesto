export default class Card {
  constructor(data, cardSelector, handleCardClick, handleDeleteClick) {
    this._image = data.link;
    this._description = data.name;
    this._likes = data.likes;
    this._id = data.id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._allowDelete = data.allowDelete;
    this._likedByMe = data.likedByMe;
  }

  getId() {
    return this._id;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.cloneNode(true);

    return cardElement;
  }

  _updateLikeState() {
    if (this._likedByMe) {
      this._likeButtonElement.classList.add("elements__like-button_active");
    } else {
      this._likeButtonElement.classList.remove("elements__like-button_active");
    }
    this._likesCounter.textContent = this._likes;
  }

  _handleLike() {
    if (this._likedByMe) {
      fetch(
        `https://mesto.nomoreparties.co/v1/cohort-21/cards/likes/${this._id}`,
        {
          method: "DELETE",
          headers: {
            authorization: "b2348cde-61a3-4142-9d82-9cb96e2dc5c9",
          },
        }
      )
        .then((res) => {
          if (res.status === 200) {
            this._likedByMe = false;
          }
          return res.json();
        })
        .then((data) => {
          this._likes = data.likes.length;
          this._updateLikeState();
        });
    } else {
      fetch(
        `https://mesto.nomoreparties.co/v1/cohort-21/cards/likes/${this._id}`,
        {
          method: "PUT",
          headers: {
            authorization: "b2348cde-61a3-4142-9d82-9cb96e2dc5c9",
          },
        }
      )
        .then((res) => {
          if (res.status === 200) {
            this._likedByMe = true;
          }
          return res.json();
        })
        .then((data) => {
          this._likes = data.likes.length;
          this._updateLikeState();
        });
    }
  }

  delete() {
    const cardItem = this._deleteButtonElement.closest(".elements__item");
    cardItem.remove();
  }

  _setEventListeners() {
    this._imageElement.addEventListener("click", () => {
      this._handleCardClick(this._image, this._description);
    });

    this._likeButtonElement.addEventListener("click", () => {
      this._handleLike();
    });

    this._deleteButtonElement.addEventListener("click", () => {
      this._handleDeleteClick(this);
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

    if (!this._allowDelete) {
      this._deleteButtonElement.classList.add("elements__delete-button_hidden");
    }

    this._likesCounter = this._element.querySelector(".elements__like-counter");
    this._setEventListeners();
    this._updateLikeState();

    this._likesCounter.textContent = this._likes;
    this._imageElement.src = this._image;
    this._imageElement.alt = this._description;
    this._element.querySelector(
      ".elements__description"
    ).textContent = this._description;

    return this._element;
  }
}
