import React from 'react'
import { useState, useEffect} from 'react'
import './CardList.css';

const Card = (props) => {
    const cardInfo = props.card;
    const isSearch = props.isSearch;
    
    let imgSrc;

    if (cardInfo['image_uris']) {
        imgSrc = cardInfo['image_uris']?.normal;
    } else if (cardInfo['card_faces'] !== undefined) {
        imgSrc = cardInfo['card_faces'][0]['image_uris']?.normal;
    }

    let cardLinksText;
    if (isSearch) {
        cardLinksText = <a href="#">Add to Deck</a> &124; <a href="#">View Details</a>;
    }

    return (
        <div key={cardInfo?.id} className='cardInfo'>
            <img src={ imgSrc } alt={cardInfo.name} />
            <div className='cardDetails'>
                <p className='cardTitle'>{cardInfo.name}</p>
                {isSearch ? <p className='cardLinks'><a href="#">Add to Deck</a> | <a href="#">View Details</a></p> : <p className='cardLinks'><a href="#">View Details</a></p>}
            </div>
        </div>
    )
}

const CardList = (props) => {
    const cards = props.cards;
    
    return (
        <div className='cardList'>
            {cards !== undefined || cards.length !== 0 ? cards.map((card, index) => <Card key={index} card={card} isSearch={props.isSearch}></Card>) : `No cards to show.`}
        </div>
    )
}

export default CardList