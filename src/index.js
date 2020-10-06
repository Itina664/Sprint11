import Api from './api.js';
import Card from './card.js';
import FormValidator from './formValidator.js';
import Popup from './popup.js';
import UserInfo from './userInfo.js';
import CardList from './cardList.js';
//import {serverUrl} from "../api.config";

import "./index.css"; 


(function () {
const placesList = document.querySelector('.places-list');
const buttonUserInfo = document.querySelector('.user-info__button');
const buttonClose = document.querySelector('.popup__card-close');
const popup = document.querySelector('.popup');
const buttonProfileEdit = document.querySelector('.profile__button-edit');
const buttonProfileClose = document.querySelector('.popup-profile__close');
const popupProfile = document.querySelector('.popup-profile');
const popupLargeImage = document.querySelector('.popup-large-image');
const largeImage = document.querySelector('.popup-large-image__image');
const buttonCloseLargeImage = document.querySelector('.popup-large-image__button-close');
const userInfoName = document.querySelector('.user-info__name');
const userInfoJob = document.querySelector('.user-info__job');
const userInfoPhoto = document.querySelector('.user-info__photo');
const formCard = document.forms.new;
const formProfile = document.forms.newProfile;
const buttonSubmitPopup = document.querySelector('.popup__button');
const errorNameProfile = document.querySelector('.popup-profile__field-error_name');
const errorAboutMe = document.querySelector('.popup-profile__field-error_aboutMe');
const errorName = document.querySelector('.popup__field-error_name');
const errorLink = document.querySelector('.popup__field-error_link');

//создаем шаблон карточки
const card = () => new Card(popupClass, largeImage);

//создаем "дорожную карту" где размещать и где брать данные для шаблона
const cardList = new CardList(placesList, card);

//создаем экземпляр класса Popup: у этого действа почти техническое назначение - чтобы добраться к методам этого класса
const popupClass = new Popup();

//создаем экземпляр класса UerInfo для записи обновленных данных профиля из popup на страницу
const userInfo = new UserInfo(userInfoName, userInfoJob, userInfoPhoto);

//создаем экземпляр класса FormValidator
const formValidatorCard = new FormValidator(formCard);
const formValidatorProfile = new FormValidator(formProfile);

formValidatorCard.setEventListeners();
formValidatorProfile.setEventListeners();

//запускаем процесс заполнения карточки вручную в popup
//и закрываем popup по кнопке submit
formCard.addEventListener('submit', (event) => {
  event.preventDefault();
  formValidatorCard.buttonBlock(buttonSubmitPopup);
  cardList.addCard(formCard.elements.name.value, formCard.elements.link.value);
  formValidatorCard.reset(formCard.elements.name, formCard.elements.link, errorName, errorLink);
  popupClass.togglePopup(popup,);
});

//открываем popup по кнопке для создания карточки вручную
buttonUserInfo.addEventListener('click', () => {
  formValidatorCard.buttonBlock(buttonSubmitPopup);
  popupClass.togglePopup(popup);
});

//закрываем popup для закрытия попап карточки по кнопке "крестик в углу"
buttonClose.addEventListener('click', () => {
  formValidatorCard.reset(formCard.elements.name, formCard.elements.link, errorName, errorLink);
  popupClass.togglePopup(popup);
});

//открываем popup по кнопке Edit для редактирования профиля
//в параметры экземпляра класса UserInfo (в форму) записываем значения полей со страницы (имя и "обо мне")
buttonProfileEdit.addEventListener('click', () => {
  formProfile.elements.nameProfile.value = userInfoName.textContent;
  formProfile.elements.aboutMe.value = userInfoJob.textContent;
  popupClass.togglePopup(popupProfile);
});

//закрываем popup для редактирования профиля по кнопке "крестик в углу"
buttonProfileClose.addEventListener('click', () => { 
  popupClass.togglePopup(popupProfile);
  formValidatorProfile.resetError(errorNameProfile);
  formValidatorProfile.resetError(errorAboutMe);
});

//закрытие popup увеличенной картинки по крестику
buttonCloseLargeImage.addEventListener('click', () => {
  popupClass.togglePopup(popupLargeImage);
});

//обновляем данные профиля на странице из полей ввода (из экземпляра класса UserInfo)
//и закрываем popup (toggle)
//и отправляем обновленные данные профиля на сервер
formProfile.addEventListener('submit', () => {
  event.preventDefault();
  //userInfo.setUserInfo(formProfile.elements.nameProfile.value, formProfile.elements.aboutMe.value);
  api.patchInfoProfile(formProfile.elements.nameProfile.value, formProfile.elements.aboutMe.value)
  .then(() => {
     userInfo.updateUserInfo(formProfile.elements.nameProfile.value, formProfile.elements.aboutMe.value);
     popupClass.togglePopup(popupProfile);
  })
  .catch((err) => {
    console.log(err);  
  });
}); 

//создаем экземпляр класса Api  для запросов на сервер
const api = new Api(`${(NODE_ENV==='development') ? 'http://nomoreparties.co/cohort12' : 'https://nomoreparties.co/cohort12'}`, 
  {
    authorization: 'ae521062-039b-4526-95e9-ec157c0881d4',
    'Content-Type': 'application/json'
  } 
);

//вызов запроса на сервер для получение данных профиля и запись их на страницу
api.getInfoProfile()
.then((result) => {
  userInfo.updateUserInfoServer(result);
})
.catch((err) => {
  console.log(err);  
});

//вызов запроса на сервер для загрузки карточек
api.getInfoCards()
.then((result) => {
  cardList.render(result);
})
.catch((err) => {
  console.log(err);  
});


} ())

