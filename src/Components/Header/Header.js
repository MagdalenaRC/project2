import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useNavigate, useParams } from 'react-router-dom';
import './Header.css'

const Header = () => {
    const [ searchTerm, setSearchTerm] = useState('')
    const navigate = useNavigate();
    const {query} = useParams();

    useEffect(()=>{
        if (query) {
            setSearchTerm(query);
        }
    }, [query])

    const submitSearch = (event) => {
        event.preventDefault();
        navigate(`search/${encodeURIComponent(searchTerm)}`)
        setSearchTerm('');
    }

  return <header>
            <img src='https://1000logos.net/wp-content/uploads/2022/10/Magic-The-Gathering-logo.png' alt='Magic Logo' />
            <form onSubmit={submitSearch}>
                <input type='text' value={searchTerm} onChange={e => setSearchTerm(e.target.value)}/>
                <input type='submit'/>
            </form>
            <nav>
                <div className='links'>
                    <Link to = '/gettingStarted'>Getting Started</Link>
                    <Link to = '/rules'>Rulebook</Link>
                    <Link to = '/deckbuilder'>Deck Builder</Link>
                </div>
            </nav>
        </header>
 
}

export default Header;