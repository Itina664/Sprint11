//класс для отрисовки карточек на странице при ее загрузке и с использованием данных из массива initialCards
export default class CardList {
  constructor(placesList, card) {
    this.container = placesList;
    //this.result = result;
    this.card = card;
  };

  //добавить карточку: куда - в контейнер placeList, какую - созданную методом create с параметрами name и link
  addCard = (name, link) => {
    this.container.
    appendChild(this.card().create(name, link));
  }

  //каждый элемент массива initialCards использовать при добавлении карточки в placesList
  render(result) {
    result.forEach((item) => {
      this.addCard(item.name, item.link);
    });
  }
}
 