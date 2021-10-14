import PopupWithForm from './PopupWithForm';
import React from 'react';
import { currentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  // Подписка на контекст
  const currentUser = React.useContext(currentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  // Обработчик изменения инпута обновляет стейт
  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm title="Редактировать профиль" name="edit" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <section className="popup__input-section">
        <input type="text" className="popup__input popup__input_edit_name" onChange={handleNameChange} defaultValue={name} name="name" placeholder="Имя" required minLength="2" maxLength="40" />
        <span className="popup__input-error name-input-error"></span>
      </section>
      <section className="popup__input-section">
        <input type="text" className="popup__input popup__input_edit_description" onChange={handleDescriptionChange} defaultValue={description} name="description" placeholder="О себе" required minLength="2" maxLength="200" />
        <span className="popup__input-error description-input-error"></span>
      </section>
    </PopupWithForm>
  );
}

export default EditProfilePopup;