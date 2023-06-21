import './InfoCard.css';

const InfoCard = ({ card, children }) => {
  let imgSrc;

  if (card['image_uris']) {
    imgSrc = card['image_uris']?.normal;
  } else if (card['card_faces'] !== undefined) {
    imgSrc = card['card_faces'][0]['image_uris']?.normal;
  }

  return (
    <div key={card?.id} className='cardInfo'>
      <img src={imgSrc} alt={card.name} />
      <div className='cardDetails'>
        <p className='cardTitle'>{card.name}</p>
        <p className='cardLinks'>{children}</p>
      </div>
    </div>
  )
}

export default InfoCard;