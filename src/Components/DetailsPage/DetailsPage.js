import React, { useState , useEffect, useContext } from 'react';
import App from '../App/App';
import { Card as BootstrapCard} from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button'
import {useNavigate, useLocation} from 'react-router-dom'
import './DetailsPage.css'

const DetailsPage = (props) => {
//  const {pageSwitch , setPageSwitch, currentCard, setCurrentCard} = useContext (App)
  //const content = props.

  const navigate = useNavigate()
  const location = useLocation();

  let card = location.state;

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
            <BootstrapCard.Title>{card.name}</BootstrapCard.Title>
            <BootstrapCard.Subtitle>{card.artist}</BootstrapCard.Subtitle>
            <BootstrapCard.Text>ID: {card.id}</BootstrapCard.Text>
            <ListGroup id='details'> 
                <ListGroup.Item>Release Date: {card.released_at}</ListGroup.Item>
                <ListGroup.Item>Reprint: {(card.reprint)?'Yes':'No'}</ListGroup.Item>
                <ListGroup.Item>Rarity: {card.rarity.toUpperCase()}</ListGroup.Item>
                <ListGroup.Item>Price (USD): ${card.prices.usd}</ListGroup.Item>
                <ListGroup.Item className='list'>Colors: {card.color_identity.map(element=> <p className='item'>{element} </p>)}</ListGroup.Item>
                <ListGroup.Item className='list'>Games: {card.games.map(element=> <p className='item'>{element.toUpperCase()} </p>)}</ListGroup.Item>
            </ListGroup>
            
            <Button className='purchaseLink'>
                <BootstrapCard.Link id='link' href={(card.purchase_uris.tcgplayer)?card.purchase_uris.tcgplayer:(card.purchase_uris.cardmarket)?card.purchase_uris.cardmarket:card.purchase_uris.cardhoarder} target='_blank'>
                    Purchase Card
                </BootstrapCard.Link>
            </Button>
        </BootstrapCard.Body> 
        </BootstrapCard>
    </section>
)
}

export default DetailsPage