import React from 'react'
import InfoCard from '../InfoCard';

import './CardList.css';

const CardList = ({ deck, allowRemove, handleRemove }) => {
    return (
        <>
            {deck || deck.length !== 0 ? deck.map((card, index) => <InfoCard key={`${index}-${card.id}`} index={index} card={card} allowRemove={allowRemove} handleRemove={handleRemove}></InfoCard>) : ``}
        </>
    )
}

export default CardList