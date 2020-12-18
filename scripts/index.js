let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_job');
let name = document.querySelector('.profile__heading');
let job = document.querySelector('.profile__subheading');


function openPopup () {
    popup.classList.add('popup_opened');

    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
}


function closePopup () {
    popup.classList.remove('popup_opened');
}


function handleFormSubmit (evt) {
    evt.preventDefault(); 

    name.textContent = nameInput.value;
    job.textContent = jobInput.value;;

    closePopup();
}


editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit); 