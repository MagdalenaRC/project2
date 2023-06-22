import React from 'react';
import InfoCard from '../InfoCard/InfoCard';
import { personalDeckContext } from '../App/App';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import './DeckBuilder.css';

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

  const handleRemove = (event, card) => {
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
        {deck && deck.map((card, index) => <InfoCard card={card} key={card.id}><button onClick={(e) => handleRemove(e, card)}>Remove</button> | <button onClick={(()=>navigate(`/details/${card.id}`, {state: card} ))}>View Details</button></InfoCard>)}
        {deck.length === 0 && <>
          <div className='noCards'>No cards in deck. Do a search above to add cards. Or use this random card </div> 
          {randomCard && !isLoading && <InfoCard card={randomCard}><button onClick={() => { addCard(randomCard); }}>Add to Deck</button> | <button onClick={(()=>navigate(`/details/${randomCard.id}`, {state: randomCard} ))}>View Details</button></InfoCard>}
          {isLoading && <p>Loading...</p>}
        </>}
      </div>
    </>
  )
}

export default DeckBuilder;