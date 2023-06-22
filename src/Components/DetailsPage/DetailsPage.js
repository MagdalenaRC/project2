import React, { useState , useEffect, useContext } from 'react';
import App from '../App/App';
import { Card as BootstrapCard} from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button'
import {useNavigate, useLocation} from 'react-router-dom'
import { personalDeckContext } from '../App/App';
import ErrorPage from '../App/error-page';

import './DetailsPage.css'

const DetailsPage = (props) => {
//  const {pageSwitch , setPageSwitch, currentCard, setCurrentCard} = useContext (App)
  //const content = props.

  const location = useLocation();
  const { addCard } = useContext(personalDeckContext);


  let card = location.state;

  console.log(card)

  let imgSrc;

    if (card['image_uris']) {
        imgSrc = card['image_uris']?.normal;
    } else if (card['card_faces'] !== undefined) {
        imgSrc = card['card_faces'][0]['image_uris']?.normal;
    }
    
    // console.log(card)
  
  return (
    <section className='details'>
       < BootstrapCard className='magic-card' 
            // onClick={() => {
            // setPageSwitch(!pageSwitch)
            // setCurrentCard()
            // }}
        >
        <BootstrapCard.Img className='magic-card-img' src = {imgSrc}  />    
        <BootstrapCard.Body>  
            <BootstrapCard.Title id='title'>{card.name}</BootstrapCard.Title>
            <BootstrapCard.Subtitle>{card.artist}</BootstrapCard.Subtitle>
            <BootstrapCard.Text>ID: {card.id}</BootstrapCard.Text>
            <ListGroup id='details'> 
                <ListGroup.Item>Release Date: {card.released_at}</ListGroup.Item>
                <ListGroup.Item>Reprint: {(card.reprint)?'Yes':'No'}</ListGroup.Item>
                <ListGroup.Item>Rarity: {card.rarity.toUpperCase()}</ListGroup.Item>
                <ListGroup.Item>Market Price (USD): {(card.prices.usd)?`$${card.prices.usd}`:'Not Available'}</ListGroup.Item>
                <ListGroup.Item className='list'>Colors: {card.color_identity.map(element=> <p className='item'>{element} </p>)}</ListGroup.Item>
                <ListGroup.Item className='list'>Games: {card.games.map(element=> <p className='item'>{element.toUpperCase()} </p>)}</ListGroup.Item>
            </ListGroup>
            
            <div id='buttons'>
                <Button className='purchaseLink' onClick={(()=>addCard(card))}>
                        Add To Deck
                </Button>
                <Button className='purchaseLink'>
                    <BootstrapCard.Link id='link' href={(card.purchase_uris)?card.purchase_uris.tcgplayer:'../App/error-page'}target='_blank'>
                        Purchase Card
                    </BootstrapCard.Link>
                </Button>
            </div>
            
        </BootstrapCard.Body> 
        </BootstrapCard>
    </section>
)
}

export default DetailsPage