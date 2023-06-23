import { useNavigate } from "react-router-dom";
import { usePersonalDeckContext } from "../../Hooks";

import './InfoCard.css';

const InfoCard = ({ allowRemove, handleRemove, card, index }) => {
  const navigate = useNavigate();
  const { addCard } = usePersonalDeckContext();
  let imgSrc;

  if (card['image_uris']) {
    imgSrc = card['image_uris']?.normal;
  } else if (card['card_faces'] !== undefined) {
    imgSrc = card['card_faces'][0]['image_uris']?.normal;
  }

  return (
    <div className='cardInfo'>
      { allowRemove && handleRemove && <span className="delete-btn text-danger"><button type="button" className="btn-close" onClick={() => { handleRemove(card) }}></button></span>}
      <img src={imgSrc} alt={card?.name} />
      <div className='cardDetails'>
        <p className='cardTitle'>{card?.name}</p>
        <p className='cardLinks'>
          <button onClick={() => { addCard(card) }}>Add to Deck</button>
          <button onClick={() => { navigate(`/details/${card.id}`, { state: card }) }}>View Details</button></p>
      </div>
    </div>
  )
}

export default InfoCard;