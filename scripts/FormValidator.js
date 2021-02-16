export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
  }

  _showInputError(inputElement, errorMessage) {
    const { _formElement, _config } = this;
    const errorElement = _formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(_config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(_config.errorClass);
  }

  _hideInputError(inputElement) {
    const { _formElement, _config } = this;
    const errorElement = _formElement.querySelector(
      `.${inputElement.id}-error`
    );
    if (!errorElement) {
      console.log("selector ", `.${inputElement.id}-error`);
    }
    inputElement.classList.remove(_config.inputErrorClass);
    errorElement.classList.remove(_config.errorClass);
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
    const { _inputList } = this;
    return _inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    const { _buttonElement, _config } = this;
    if (this._hasInvalidInput()) {
      _buttonElement.classList.add(_config.inactiveButtonClass);
      _buttonElement.disabled = true;
    } else {
      _buttonElement.classList.remove(_config.inactiveButtonClass);
      _buttonElement.disabled = false;
    }
  }

  _setEventListeners() {
    const { _buttonElement, _inputList } = this;

    if (_buttonElement) {
      this._toggleButtonState();
    }
    _inputList.forEach((inputElement) => {
      inputElement.addEventListener("input",  () => {
        this._checkInputValidity(inputElement);
        if (_buttonElement) {
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

    this._formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}
