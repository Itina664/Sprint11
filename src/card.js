//класс для создания шаблона карточки: структуры карточки с ее элементами: названием, ссылкой на картинку, иконкой like и иконкой корзина
export default class Card {
  constructor(popup, largeImage) {
    this.popup = popup;
    this.largeImage = largeImage;
  }

  create(name, link) {
    const placeCard = document.createElement('div');
    const cardImage = document.createElement('div');
    const buttonDelete = document.createElement('button');
    const cardDescription = document.createElement('div');
    const cardName = document.createElement('h3');
    const buttonLike = document.createElement('button');

    placeCard.classList.add('place-card');
    cardImage.classList.add('place-card__image');
    buttonDelete.classList.add('place-card__delete-icon');
    cardDescription.classList.add('place-card__description');
    cardName.classList.add('place-card__name');
    buttonLike.classList.add('place-card__like-icon');

    placeCard.appendChild(cardImage);
    cardImage.appendChild(buttonDelete);
    placeCard.appendChild(cardDescription);
    cardDescription.appendChild(cardName);
    cardDescription.appendChild(buttonLike);

    cardName.textContent = name;
    cardImage.style.backgroundImage = `url(${link})`;

    this.cardElement = placeCard;
    this.buttonLike = buttonLike;
    this.buttonDelete = buttonDelete;
    this.cardImage = cardImage;
    this.setEventListeners();

    return placeCard;
  }

  setEventListeners() {
      this.buttonLike.addEventListener('click', this.like);
      this.buttonDelete.addEventListener('click', this.remove);
      this.cardImage.addEventListener('click', this.largeOpen);
    }
    removeEventListeners() {
      this.buttonLike.removeEventListener('click', this.like);
      this.buttonDelete.removeEventListener('click', this.remove);
      this.cardImage.removeEventListener('click', this.largeOpen);
    };

  //объявляем функцию like
  like(event) {
    event.target.classList.toggle('place-card__like-icon_liked');
  }

  //объявляем функцию remove
  remove = () => {
    this.cardElement.remove();
    this.removeEventListeners();
  };

  //объявляем метод для открытия увеличенной картинки
  largeOpen = (event) => {
      this.largeImage.src = event.target.style.backgroundImage.slice(5, -2);
      this.popup.togglePopup(document.querySelector('.popup-large-image'));
  };
}
