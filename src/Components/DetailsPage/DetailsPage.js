import React from 'react';
import { Card as BootstrapCard } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button'
import { useNavigate, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { usePersonalDeckContext } from '../../Hooks';
import './DetailsPage.css'

const DetailsPage = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const { addCard } = usePersonalDeckContext();

    let card = location.state;

    let imgSrc;

    if (card) {
        if (card['image_uris']) {
            imgSrc = card['image_uris']?.normal;
        } else if (card['card_faces'] !== undefined) {
            imgSrc = card['card_faces'][0]['image_uris']?.normal;
        }
    }

    return (
        <section className='details'>
            <BootstrapCard className='magic-card'>
                <button className='closeDetails' onClick={() => navigate(-1)}><FontAwesomeIcon icon={faArrowLeft} /></button>
                <BootstrapCard.Img className='magic-card-img' src={imgSrc} />
                <BootstrapCard.Body>
                    <BootstrapCard.Title id='title'>{card?.name}</BootstrapCard.Title>
                    <BootstrapCard.Subtitle>{card?.artist}</BootstrapCard.Subtitle>
                    <BootstrapCard.Text>ID: {card?.id}</BootstrapCard.Text>
                    <ListGroup id='detailList'>
                        <ListGroup.Item>Release Date: {card?.released_at}</ListGroup.Item>
                        <ListGroup.Item>Reprint: {card?.reprint ? 'Yes' : 'No'}</ListGroup.Item>
                        <ListGroup.Item>Rarity: {card?.rarity.toUpperCase()}</ListGroup.Item>
                        <ListGroup.Item>Market Price (USD): {(card?.prices.usd) ? `$${card?.prices.usd}` : 'Not Available'}</ListGroup.Item>
                        <ListGroup.Item className='list'>Colors: {card?.color_identity.map(element => <p className='item'>{element} </p>)}</ListGroup.Item>
                        <ListGroup.Item className='list'>Games: {card?.games.map(element => <p className='item'>{element.toUpperCase()} </p>)}</ListGroup.Item>
                    </ListGroup>

                    <div id='buttons'>
                        <Button className='purchaseLink' onClick={() => addCard(card)}>
                            Add To Deck
                        </Button>
                        <Button className='purchaseLink'>
                            <BootstrapCard.Link id='link' href={card?.purchase_uris ? card.purchase_uris.tcgplayer : '../App/error-page'} target='_blank'>
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