import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { personalDeckContext } from '../App/App';
import { useNavigate, useLocation } from 'react-router-dom';

import InfoCard from '../InfoCard/InfoCard';

import './SearchResults.css';

const SearchResult = () => {
  const { query } = useParams();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { addCard } = useContext(personalDeckContext);
  console.log(query);
  useEffect(() => {
    setIsLoading(true);
    const getResults = async () => {
      const response = await fetch(`https://api.scryfall.com/cards/search?q=${query}`);
      const apiResults = await response.json();
      console.log(results)
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

    console.log(results)
  

  return (
    <>
      {query === undefined && <h1 className='text-center'>Please enter a search above.</h1>}
      {results !== undefined && query !== undefined && <h2 className='searchTitle'>Results for "{decodeURIComponent(query)}"</h2>}
      <div className='cardContainer'>
        {isLoading && <h2>Loading...</h2>}
        {results !== undefined && !query && !isLoading && results.map((result, index) => <InfoCard card={result} key={result.id}><button onClick={ () => { addCard(result); } }>Add to Deck</button> | <button onClick={(()=>navigate(`/details/:${result.id}`, {state: result} ))}>View Details</button></InfoCard>)}
        {results === undefined && !isLoading && `No results found.`}
      </div>
    </>
  );
}

export default SearchResult;