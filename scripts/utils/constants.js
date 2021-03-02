export const editButton = document.querySelector("#profile-edit-button");

export const editPopupFormElement = document.querySelector(
  "#edit-profile-popup-form"
);
export const editPopupNameInput = editPopupFormElement.querySelector(
  "#edit-profile-popup-name-input"
);
export const editPopupJobInput = editPopupFormElement.querySelector(
  "#edit-profile-popup-job-input"
);

export const cardAddingButton = document.querySelector("#card-adding-button");

export const cardAddingPopupFormElement = document.querySelector(
  "#card-adding-popup-form"
);

export const formsConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

