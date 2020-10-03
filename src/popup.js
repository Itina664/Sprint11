//класс для открытия/закрытия любого popup
export default class Popup {
  togglePopup(popup) {
    popup.classList.toggle('popup_is-opened');
  }
}