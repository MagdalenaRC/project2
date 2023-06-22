import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useNavigate, useParams } from 'react-router-dom';
import './Header.css'



const Header = () => {
    const [ searchTerm, setSearchTerm ] = useState('');
    const navigate = useNavigate();
    const {query} = useParams();
    const [optionList, setOptionList ] = useState([<option value='Loading...'></option>]);

    useEffect(()=>{
        if (query) {
            setSearchTerm(query);
        }
    }, [query]);

    useEffect(() => {
        let autoCompletes;
        const getAutoComplete = async () => {
            const response = await fetch(`https://api.scryfall.com/cards/autocomplete?q=${searchTerm}`);
            const apiData = await response.json();
            autoCompletes = apiData.data;
        }

        const handler = setTimeout(async () => {
            if (searchTerm) {
                console.log('do search now');
                await getAutoComplete();
                
                if(autoCompletes.length > 0) {
                    let newOptions = [];
                    for (let value of autoCompletes) {
                        newOptions.push(<option value={value}></option>);
                    }
                    setOptionList([...newOptions]);
                }
            } else {
                console.log('search is blank');
            }
        }, 1000);

        return () => { clearTimeout(handler); };
    }, [searchTerm]);

    const submitSearch = (event) => {
        event.preventDefault();
        navigate(`search/${encodeURIComponent(searchTerm)}`)
        setSearchTerm('');
    }

  return (
        <>
            <nav className='navBar'>
                <ul className='links'>
                    <li><Link className='Link' to = '/gettingStarted'>Getting Started</Link></li>
                    <li><Link className='Link' to = '/rules'>Rulebook</Link></li>
                    <li><Link className='Link' to = '/deckbuilder'>Deck Builder</Link></li>
                </ul>
            </nav>
            <header>
                <div className='headerBackground'></div>
                <img src='https://1000logos.net/wp-content/uploads/2022/10/Magic-The-Gathering-logo.png' alt='Magic Logo' />
                <form className='searchForm' onSubmit={submitSearch}>
                    <input type='search' list='searchSuggestions' placeholder='Search by card name' value={searchTerm} onChange={e => setSearchTerm(e.target.value)}/>
                  <datalist id="searchSuggestions">
                      {optionList}
                    </datalist>
                    <input className='submitBtn' type='submit' value='Explore!'/>
                    
                </form>
            </header>
        </>
  )
}

export default Header;