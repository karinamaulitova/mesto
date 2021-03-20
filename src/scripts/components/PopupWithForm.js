import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._form = this._popup.querySelector("form");
    this._submitButton = this._form.querySelector('.popup__save-button');
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList = Array.from(this._form.querySelectorAll("input"));
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  renderLoading(isLoading) {
    if(isLoading) {
      this._submitButton.textContent = "Сохранение...";
    } else {
      this._submitButton.textContent = this._submitButton.value;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.renderLoading(true);
      Promise.resolve(this._handleFormSubmit(this._getInputValues())).finally(() => {
        this.renderLoading(false);
        this.close();
      });
     
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
