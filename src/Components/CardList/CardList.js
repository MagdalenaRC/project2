import React from 'react'
import { useState, useEffect} from 'react'
import './CardList.css';

const Card = (props) => {
    const cardInfo = props.card;
    console.log('card info', cardInfo);
    let imgSrc;

    if (cardInfo['image_uris']) {
        imgSrc = cardInfo['image_uris']?.normal;
    } else if (cardInfo['card_faces'] !== undefined) {
        imgSrc = cardInfo['card_faces'][0]['image_uris']?.normal;
    }

    return (
        <div key={cardInfo?.id} className='cardInfo'>
            <img src={ imgSrc } alt={cardInfo.name} />
            <div className='cardDetails'>
                <p>{cardInfo.name}</p>
                <p>Add to Deck</p>
            </div>
        </div>
    )
}

const CardList = (props) => {
    const cards = props.cards;
    const [deck, setDeck] = useState([])

    return (
        <div className='cardList'>
            {cards !== undefined ? cards.map((card, index) => <Card key={index} card={card}></Card>) : `No cards to show.`}
        </div>
    )
}

export default CardList