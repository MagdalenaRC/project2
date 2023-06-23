import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { personalDeckContext } from '../App';
import { usePersonalDeckContext } from '../../Hooks';

import CardList from '../CardList';

import './SearchResults.css';

const SearchResult = () => {
  const { query } = useParams();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addCard } = usePersonalDeckContext();
  
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
    if (query) {
      getResults();
    } else {
      setIsLoading(false);
    }
    return () => { ignore = true; setIsLoading(false); }
  }, [query]); 

  return (
    <>
      {query === undefined && <h1 className='text-center'>Please enter a search above.</h1>}
      {results !== undefined && query !== undefined && <h2 className='searchTitle'>Results for "{decodeURIComponent(query)}"</h2>}
      <div className='cardContainer'>
        {isLoading && <h2>Loading...</h2>}
        {results !== undefined && query && !isLoading && <CardList deck={results}></CardList>}
        {results === undefined && !isLoading && `No results found.`}
      </div>
    </>
  );
}

export default SearchResult;