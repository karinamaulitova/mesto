let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');

function openPopup () {
    popup.classList.add('popup_opened');
}


function closePopup () {
    popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);


let formElement = document.querySelector('.popup__form');
function handleFormSubmit (evt) {
    evt.preventDefault(); 
    let nameInput = formElement.querySelector('.popup__input_type_name');
    let jobInput = formElement.querySelector('.popup__input_type_job');

    let nameInputValue = nameInput.value;
    let jobInputValue = jobInput.value;
   
    let name = document.querySelector('.profile__heading');
    let job = document.querySelector('.profile__subheading');

    name.textContent = nameInputValue;
    job.textContent = jobInputValue;

    closePopup();
}

formElement.addEventListener('submit', handleFormSubmit); 