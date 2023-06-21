import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { personalDeckContext } from '../App/App';

import InfoCard from '../InfoCard/InfoCard';

import './SearchResults.css';

const SearchResult = () => {
  const { query } = useParams();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { addCard } = useContext(personalDeckContext);

  useEffect(() => {
    setIsLoading(true);
    const getResults = async () => {
      const response = await fetch(`https://api.scryfall.com/cards/search?q=${query}`);
      const apiResults = await response.json();
      if (!ignore) {
        setResults(apiResults.data);
        setIsLoading(false);
      }
    };

    let ignore = false;
    getResults();
    return () => { ignore = true; setIsLoading(false); }
  }, [query]);

  return (
    <>
      <h2 className='searchTitle'>Results for "{decodeURIComponent(query)}"</h2>
      <div className='cardContainer'>
        {isLoading && <h2>Loading...</h2>}
        {results !== undefined && !isLoading && results.map((result, index) => <InfoCard card={result} key={result.id}><button onClick={ () => { addCard(result); } }>Add to Deck</button> | <button>View Details</button></InfoCard>)}
        {results === undefined && !isLoading && `No results found.`}
      </div>
    </>
  );
}

export default SearchResult;