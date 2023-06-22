import { getByTestId, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import CardList from '../CardList/CardList';
import DeckBuilder from '../DeckBuilder/DeckBuilder';
import GettingStarted from '../GettingStarted/GettingStarted';
import Header from '../Header/Header';
import InfoCard from '../InfoCard/InfoCard';
import Rulebook from '../Rulebook/Rulebook';
import SearchResult from '../SearchResults/SearchResults';
import { personalDeckContext } from './App';
import userEvent from '@testing-library/user-event' ;
import React, {useState, useContext} from 'react';
import { BrowserRouter as Router,  createRoutesFromElements, createBrowserRouter, Route} from 'react-router-dom';
//  import context from 'react-bootstrap/esm/AccordionContext';
 import { ToastContainer, useToasts } from '../Toasts';

let wrapper;
beforeEach(() => {
  wrapper = ({ children }) => (
    <div data-testid = 'personalDeckContextProvider'>
    <personalDeckContext.Provider value={{ deck: [], addCard: () => {}, removeCard: () => {} }}>
      {children}
    </personalDeckContext.Provider>
    </div>
  );
});

test('testing that personal deck context provider is present', () => {
  const { getByTestId } = render(<App />, { wrapper: wrapper });
  const contextProvider = getByTestId('personalDeckContextProvider')
  expect(contextProvider).toBeInTheDocument();
  const context = personalDeckContext._currentValue;
  expect(context.deck).toEqual([])
});

/*
let wrapper
beforeEach(() => {
  wrapper = ({ children }) => (
      value={{
        movies: [{
          "movieId": 1,
          "title": "Guardians of the Galaxy Vol. 2",
          "poster": "https://m.media-amazon.com/images/M/MV5BMTg2MzI1MTg3OF5BMl5BanBnXkFtZTgwNTU3NDA2MTI@._V1_SX300.jpg"
        }],
      }}
    >
      {children}
    </AppContext.Provider>
  );
});
*/

test('checking that the search button is present', () => {
  const header = render(<Header />, { wrapper: Router });
  const submit = header.getByText('Explore!');
  expect(submit).toBeInTheDocument();
});

// jest.mock('react-router-dom', ()=> ({
//   createRoutesFromElements: jest.fn(),
//   createBrowserRouter: jest.fn().mockReturnValue({
//     navigate: jest.fn()
//   })
// }));

// jest.mock("./Layout", () => <div data-testid='layout'>Layout</div>)
// jest.mock('./ErrorPage', () => <div data-testid='error-page'>Error Page</div>)
// jest.mock('./RuleBook', () => <div data-testid='rulebook'>Rulebook</div>)
// jest.mock('./SearchResult', () => <div data-testid='search-result'>Search Result</div>)
// jest.mock('./GettingStarted', () => <div data-testid='getting-started'>Getting Started</div>)
// jest.mock('./Deckbuilder', () => <div data-testid='deck-builder'>Deck Builder</div>)
// jest.mock('./DetailsPage', () => <div data-testid='details-page'>Details Page</div>)

describe('tests of the App function', () => {
  test('contains useState', () => {
    const stateSpy = jest.spyOn(React, 'useState');
    render(<App />);
    expect(stateSpy).toHaveBeenCalled();
  })
  
  // test('contains useToast', () => {
  //   const toastSpy = jest.spyOn(useToasts, 'useToast');
  //   render(<App />);
  //   expect(toastSpy).toHaveBeenCalled();
  // })

  // test('renders layout for "/" route path', () => {
  //   createRoutesFromElements.mockImpementationOnce((routes) => routes);
  //   const router = createBrowserRouter([]);
  //   render(<App router={router} />);
  //   expect(screem.getByTestId('layout')).toBeInTheDocument();
  // })

  // test('verify createBrowserRouter is being called', () => {
  //   const routeSpy = jest.spyOn(react-router-dom, 'createBrowserRouter');
  //   render (<App />);
  //   expect(routeSpy).toHaveBeenCalled()
  // })
})



    
    
   
  
  