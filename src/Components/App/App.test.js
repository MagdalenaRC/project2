import { getByTestId, render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, MemoryRouter, Link } from 'react-router-dom';
import App from './App';
import GettingStarted from '../GettingStarted/GettingStarted';
import Header from '../Header/Header';
import Rulebook from '../Rulebook/Rulebook';
import { PersonalDeckContext } from '../../Hooks';
import TestComp from '../TestComp';
import DetailsPage from '../DetailsPage/DetailsPage';
import DeckBuilder from '../DeckBuilder/DeckBuilder';
import userEvent from '@testing-library/user-event';


describe('tests for personalDeckContextProvider', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = ({ children }) => (
      <div data-testid='PersonalDeckContextProvider'>
        <PersonalDeckContext.Provider value={{ deck: [], addCard: () => { }, removeCard: () => { } }}>
          {children}
        </PersonalDeckContext.Provider>
      </div>
    );
  });
  test('testing that personal deck context provider is present', () => {
    const { getByTestId } = render(<App />, { wrapper: wrapper });
    const contextProvider = getByTestId('PersonalDeckContextProvider')
    expect(contextProvider).toBeInTheDocument();
    const context = PersonalDeckContext._currentValue;
    expect(context.deck).toEqual([])
  });
})

describe('tests of the App function', () => {
  test('checking that the search button is present', () => {
    const header = render(<MemoryRouter><Header /></MemoryRouter>);
    const submit = header.getByText('Explore!');
    expect(submit).toBeInTheDocument();
  });
  test('contains useState', () => {
    const stateSpy = jest.spyOn(React, 'useState');
    render(<App />);
    expect(stateSpy).toHaveBeenCalled();
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })
})
// describe('tests for Deck Builder', () => {
//   test('check that there is at least one card loaded', () => {
//     render(<MemoryRouter initialEntries={['/deckBuilder']}><DeckBuilder /></MemoryRouter>);
//     const cards = screen.getByAllRoles('img')
//     expect(cards.length).toGreaterThan(0)
//   }) 
// })

// Moved rulebook to rulebook.test.js in applicable folder

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

/**it('shows movie details from the context', () => {

  render(

  //let renderer= create(
    <MemoryRouter initialEntries={['/gettingStarted']}>
      <Routes>
        <Route path='/gettingStarted' element={<GettingStarted />}>
        </Route>
      </Routes>
    </MemoryRouter>,
    { wrapper }
  )

  const titleText = screen.getByText(/Guardians/i);
  expect(titleText).toBeInTheDocument();
})
*/




