import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { personalDeckContext } from '../App';
import { usePersonalDeckContext } from '../../Hooks';

import InfoCard from '../InfoCard';
import CardList from '../CardList';

import './DeckBuilder.css';

const DeckBuilder = () => {
  const [ randomCard, setRandomCard ] = useState({});
  const { deck, removeCard, addCard, emptyDeck } = usePersonalDeckContext();
  const [ isLoading, setIsLoading ] = useState(false);

  const getRandomCard = async (ignore) => {
    setIsLoading(true);
    const response = await fetch('https://api.scryfall.com/cards/random');
    const apiData = await response.json();
    if (!ignore) {
      setRandomCard(apiData);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    let ignore = false;
    
    if (deck.length === 0) {
      getRandomCard(ignore);
    }
    
    return () => { ignore = true; setIsLoading(false); }
  }, []);

  const handleRemove = (card) => {
    removeCard(card);
    // assume with 1 card left that there will be no cards left in the deck
    if (deck.length < 2) {
      getRandomCard(false);
    }
  };

  const handleEmpty = () => {
    emptyDeck()
    getRandomCard(false);
  }

  return (
    <>
      <h1>Deck Builder</h1>
      {deck.length > 0 && <p>{deck.length} card{deck.length > 1 && 's'} in deck</p>}
      {deck.length > 0 && <Button id='empty' onClick={handleEmpty}>
        Empty Deck
        <FontAwesomeIcon id='trashcan' icon={faTrashCan} />
      </Button>}
      <div className='cardContainer'>
        {deck && <CardList deck={deck} allowRemove={true} handleRemove={handleRemove}></CardList>}
        {deck.length === 0 && <>
          <div className='noCards'>No cards in deck. Do a search above to add cards. Or use this random card:</div> 
          {isLoading && <p>Loading...</p>}
          {randomCard && !isLoading && <InfoCard card={randomCard}></InfoCard>}
        </>}
      </div>
      
    </>
  )
}

export default DeckBuilder;