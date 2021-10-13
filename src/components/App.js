import '../App.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from './ImagePopup';
import React from 'react';
import api from "../utils/Api";
import {currentUserContext} from '../contexts/CurrentUserContext';

function App() {

  const [isEditAvatarPopupOpen, setEditAvatarOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfileOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlaceOpen] = React.useState(false);
  const [selectedCard, setSelctedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    api.getUserProfile()
      .then((result) => {
        setCurrentUser(result);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

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
  function handleUpdateUser(user) {
    api.updateUserProfile(user.name,user.about)
    .then(result => {
      setCurrentUser(result);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleUpdateAvatar(user) {
    api.updateAvatarProfile(user.avatar.value)
    .then((result) => {
      setCurrentUser(result);
      //popupAvatarSubmitBtn.textContent = "Сохранить";
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function closeAllPopups() {
    setEditAvatarOpen(false);
    setEditProfileOpen(false);
    setAddPlaceOpen(false);
    setSelctedCard(null);
  }

  return (
    <currentUserContext.Provider value={currentUser}>
      <div className="App">
        <Header />
        <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} />
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>    
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
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
      </div>
    </currentUserContext.Provider>
  );
}

export default App;
