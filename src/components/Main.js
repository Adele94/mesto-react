import plusImg from '../images/plus.svg';
import avatarEditImg from '../images/Vector-avatar.svg';
import api from '../utils/Api'
import React, { useState } from 'react';
import Card from './Card';
import {currentUserContext} from '../contexts/CurrentUserContext';


function Main(props) {

  // Подписываемся на контекст CurrentUserContext
  const currentUser = React.useContext(currentUserContext);

  // Инициализация профиля и начальных карточек
  const [cards, setCards] = useState([]);

  React.useEffect(() => {
    api.getInitialCards()
      .then((result) => {
        setCards(result);
      }) 
      .catch((err) => {
        console.log(err);
      })
  }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.renderLikes(card._id, isLiked ? 'DELETE' : 'PUT').then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
}

function handleCardDelete(card) {
 // Отправляем запрос в API на удаление карточки
 api.deleteCard(card._id).then(
    setCards(cards.filter(item => item._id !== card._id))
 );
}

  return (
    <main className="content">
      <section className="profile">
        <button className="profile__avatar-button">
          <img className="profile__avatar" src={currentUser.avatar} alt="Аватар" />
          <img className="profile__avatar-edit" onClick={props.onEditAvatar} src={avatarEditImg} alt="Иконка редактирования" />
        </button>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button className="profile__button-edit" onClick={props.onEditProfile} type="button"></button>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button className="profile__button-add" onClick={props.onAddPlace} type="button">
          <img src={plusImg} alt="Знак '+'" />
        </button>
      </section>
      <section className="elements">
        {cards.map((item) => <Card key={item._id} cardItem={item} onCardClick={props.onCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete}/>)}
      </section>
    </main>
  );
}

export default Main;