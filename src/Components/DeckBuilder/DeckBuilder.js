import React from 'react';
import InfoCard from '../InfoCard/InfoCard';
import { personalDeckContext } from '../App/App';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import './DeckBuilder.css';

const InfoCardBuilder = ({ card, handleClick, btnText }) => {
  const navigate = useNavigate();

  return (
    <InfoCard card={card} key={card.id}>
      <button onClick={() => { handleClick(card) }}>{btnText}</button> | 
      <button onClick={() => { navigate(`/details/${card.id}`, { state: card }) } }>View Details</button>
    </InfoCard>
  )
}

const DeckBuilder = () => {
  const [ randomCard, setRandomCard ] = useState({});
  const { deck, removeCard, addCard } = useContext(personalDeckContext);
  const [ isLoading, setIsLoading ] = useState(false);
  const navigate = useNavigate();

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

  return (
    <>
      <h1>Deck Builder</h1>
      {deck.length > 0 && <p>{deck.length} cards in deck</p>}
      <div className='cardContainer'>
        {deck && deck.map( (card, index) => <InfoCardBuilder card={card} handleClick={handleRemove} btnText={'Remove'}></InfoCardBuilder> )}
        {deck.length === 0 && <>
          <div className='noCards'>No cards in deck. Do a search above to add cards. Or use this random card:</div> 
          {isLoading && <p>Loading...</p>}
          {randomCard && !isLoading && <InfoCardBuilder card={randomCard} handleClick={addCard} btnText={'Add to Deck'}></InfoCardBuilder>}
        </>}
      </div>
    </>
  )
}

export default DeckBuilder;