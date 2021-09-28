import '../App.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import React from 'react';

function App() {

  const [isEditAvatarPopupOpen, setEditAvatarOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfileOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlaceOpen] = React.useState(false);
  const [selectedCard, setSelctedCard] = React.useState(null);

  function handleEditAvatarClick() {
    setEditAvatarOpen(true);
  }
  function handleEditProfileClick() {
    setEditProfileOpen(true);
  }
  function handleAddPlaceClick() {
    setAddPlaceOpen(true);
  }

  function handleCardClick(card) {
    setSelctedCard(card)
  }

  function closeAllPopups() {
    setEditAvatarOpen(false);
    setEditProfileOpen(false);
    setAddPlaceOpen(false);
    setSelctedCard(null);
  }

  return (
    <div className="App">
      <Header />
      <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} />
      <Footer />
      <PopupWithForm title="Редактировать профиль" name="edit" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
        <section className="popup__input-section">
          <input type="text" className="popup__input popup__input_edit_name" defaultValue="" name="name" placeholder="Имя" required minLength="2" maxLength="40" />
          <span className="popup__input-error name-input-error"></span>
        </section>
        <section className="popup__input-section">
          <input type="text" className="popup__input popup__input_edit_description" defaultValue="" name="description" placeholder="О себе" required minLength="2" maxLength="200" />
          <span className="popup__input-error description-input-error"></span>
        </section>
      </PopupWithForm>
      <PopupWithForm title="Новое место" name="place" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
        <section className="popup__input-section">
          <input type="text" className="popup__input popup__input_place_name" defaultValue="" name="name" placeholder="Название" minLength="2" maxLength="30" required />
          <span className="popup__input-error name-input-error"></span>
        </section>
        <section className="popup__input-section">
          <input type="url" className="popup__input popup__input_place_link" defaultValue="" name="link" placeholder="Ссылка на картинку" required />
          <span className="popup__input-error link-input-error"></span>
        </section>
      </PopupWithForm>
      <ImagePopup onClose={closeAllPopups} card={selectedCard} />
      <PopupWithForm title="Вы уверены" name="delete-card" />
      <PopupWithForm title="Обновить аватар" name="avatar" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
        <section className="popup__input-section">
          <input type="url" className="popup__input popup__input_place_link" defaultValue="" name="link" placeholder="Ссылка на аватар" required />
          <span className="popup__input-error link-input-error"></span>
        </section>
      </PopupWithForm>
    </div>
  );
}

export default App;
