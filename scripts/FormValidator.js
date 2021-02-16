export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  _hideInputError(inputElement) {
  
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    if (!errorElement) {
      console.log("selector ", `.${inputElement.id}-error`);
    }
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _disableButton() {
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
      this._buttonElement.disabled = true;
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  _setEventListeners() {
    if (this._buttonElement) {
      this._toggleButtonState();
    }
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input",  () => {
        this._checkInputValidity(inputElement);
        if (this._buttonElement) {
          this._toggleButtonState();
        }
      });
    });
  }

  enableValidation() {
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._config.submitButtonSelector
    );

    this._formElement.addEventListener("submit",  (evt) =>
    {
      evt.preventDefault();
      this._disableButton();
    });
    this._setEventListeners();
  }
}
