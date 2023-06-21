import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import CardList from '../CardList/CardList';

const SearchResult = () => {
  const { query } = useParams();
  const [ results, setResults ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const getResults = async () => {
      const response = await fetch(`https://api.scryfall.com/cards/search?q=${query}`);
      const apiResults = await response.json();
      if(!ignore) {
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
    <h2>Results for "{decodeURIComponent(query)}"</h2>
    {isLoading && <h2>Loading...</h2>}
    {results !== undefined && !isLoading && <CardList cards={results}></CardList>}
    {results === undefined && !isLoading && `No results found.`}
    </>
  );
}

export default SearchResult;