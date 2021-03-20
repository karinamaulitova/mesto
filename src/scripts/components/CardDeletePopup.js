import Popup from "./Popup.js";

export default class CardDeletePopup extends Popup {
    constructor(popupSelector, handleDeleteCard){
        super(popupSelector);
        this._handleDeleteCard = handleDeleteCard;
        this._card = null;
        this._form = this._popup.querySelector("form");
    }

    open(card) {
        this._card = card;
        super.open();
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (evt) => {
          evt.preventDefault();
          Promise.resolve(this._handleDeleteCard(this._card)).then(()=>{this.close()});

        });
      }
}