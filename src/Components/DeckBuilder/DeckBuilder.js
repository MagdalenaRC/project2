import React from 'react';
import InfoCard from '../InfoCard/InfoCard';
import { personalDeckContext } from '../App/App';
import { useContext } from 'react';

const DeckBuilder = () => {
  const { deck } = useContext(personalDeckContext)
    
  return (
    <>
      <h1>Deck Builder</h1>
      <div className='cardContainer'>
        {deck && deck.map((card, index) => <InfoCard card={card} key={card.id}><button>Remove</button> | <button>View Details</button></InfoCard>)}
      </div>
    </>
  )
}

export default DeckBuilder;