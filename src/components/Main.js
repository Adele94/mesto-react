import plusImg from '../images/plus.svg';
import avatarEditImg from '../images/Vector-avatar.svg';
import api from '../utils/Api'
import React, { useState } from 'react';
import Card from './Card';

function Main(props) {

  // Инициализация профиля и начальных карточек
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  React.useEffect(() => {
    api.getUserProfile()
      .then((result) => {
        setUserName(result.name);
        setUserDescription(result.about);
        setUserAvatar(result.avatar);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  React.useEffect(() => {
    api.getInitialCards()
      .then((result) => {
        setCards(result);
      }) 
      .catch((err) => {
        console.log(err);
      })
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <button className="profile__avatar-button">
          <img className="profile__avatar" src={userAvatar} alt="Аватар" />
          <img className="profile__avatar-edit" onClick={props.onEditAvatar} src={avatarEditImg} alt="Иконка редактирования" />
        </button>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button className="profile__button-edit" onClick={props.onEditProfile} type="button"></button>
          <p className="profile__description">{userDescription}</p>
        </div>
        <button className="profile__button-add" onClick={props.onAddPlace} type="button">
          <img src={plusImg} alt="Знак '+'" />
        </button>
      </section>
      <section className="elements">
        {cards.map((item) => <Card key={item._id} cardItem={item} onCardClick={props.onCardClick} />)}
      </section>
    </main>
  );
}

export default Main;