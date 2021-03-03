import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._photoPopupDescriptionElement = this._popup.querySelector(
      ".photo-popup__description"
    );
    this._photoPopupImageElement = this._popup.querySelector(
      ".photo-popup__image"
    );
  }
  open(imageSrc, description) {
    super.open();
    this._photoPopupDescriptionElement.textContent = description;
    this._photoPopupImageElement.src = imageSrc;
    this._photoPopupImageElement.alt = description;
  }
}
