function Card({cardItem, onCardClick}) {
    
  function handleClick() {
    onCardClick(cardItem);
  }

  return (
    <div className="element">
      <img className="element__image" onClick={handleClick} src={cardItem.link} alt={cardItem.name} />
      <button className="element__trash" type="button"></button>
      <div className="element__info">
        <h2 className="element__text">{cardItem.name}</h2>
        <div>
            <button className="element__like" type="button"></button>
            <h2 className="element__like-count">{cardItem.likes.length}</h2>
        </div>
      </div>
    </div>
    );
}

export default Card;