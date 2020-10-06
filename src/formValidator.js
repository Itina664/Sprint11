export default class FormValidator {
  constructor(form) {
    this.form = form;
  };

  //валидация полей input. Ошибки при валидации
  checkInputValidity(input, error) {
    if (input.validity.valueMissing) { //если поле пустое
      error.textContent = "Это обязательное поле";
      error.classList.add('error_active');

    } else if (input.validity.tooShort || input.validity.tooLong) {
      //если количество символов не соответствует 2<х<30
      error.textContent = "Должно быть от 2 до 30 символов";
      error.classList.add('error_active');

    } else if (!input.validity.valid) {
      //если в поле вбита не ссылка
      error.textContent = "Здесь должна быть ссылка";
      error.classList.add('error_active');

    } else { //если ошибок нет, то поле валидно
      error.textContent = "";
    }
  }

  //установление кнопки submit активной/неактивной в зависимоти от проверки на валидность
  setSubmitButtonState = (buttonSubmit) => {
    if (this.form.checkValidity()) {
      buttonSubmit.removeAttribute('disabled');
    } else {
      buttonSubmit.setAttribute('disabled', true);
    }
  }

  //добавление обработчиков валидации всем полям форм 
  setEventListeners() {
    this.form.addEventListener('input', (event) => {
      this.checkInputValidity(event.target, event.target.closest('div').querySelector('.error'));
      this.setSubmitButtonState(this.form.querySelector('button'));
    })
  }

  reset(name, link, errorName, errorLink) {
    name.value = '';
    link.value = '';
    errorName.textContent = '';
    errorLink.textContent = '';
  };

  resetError(error) {
    error.textContent = '';
  }

  buttonBlock = (buttonSubmitPopup) => {
    buttonSubmitPopup.setAttribute('disabled', true);
  };

}