import { getByTestId, render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, MemoryRouter } from 'react-router-dom';
import App from './App';
import GettingStarted from '../GettingStarted/GettingStarted';
import Header from '../Header/Header';
import Rulebook from '../Rulebook/Rulebook';
import { personalDeckContext } from './App';
import TestComp from '../TestComp';
// import {create} from 'react-test-renderer';


describe('tests for personalDeckContextProvider', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = ({ children }) => (
      <div data-testid='personalDeckContextProvider'>
        <personalDeckContext.Provider value={{ deck: [], addCard: () => { }, removeCard: () => { } }}>
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
})

describe('Check that Rulebook is loading', () => {
  test('check that there are rules', () => {
    render(<Rulebook />)
    const rules = screen.getAllByText(/rules/i)
    expect(rules.length).toBeGreaterThan(0);
    expect(rules[0]).toBeInTheDocument();
  })
  test('check that rulebook is loading a card', () => {
    render(<Rulebook />)
    const randomCard = screen.getByRole('img')
    expect(randomCard).toBeInTheDocument();
  })
})



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


describe('tests of the App function', () => {
  test('checking that the search button is present', () => {
    const header = render(<Header />, { wrapper: Router });
    const submit = header.getByText('Explore!');
    expect(submit).toBeInTheDocument();
  });
  test('contains useState', () => {
    const stateSpy = jest.spyOn(React, 'useState');
    render(<App />);
    expect(stateSpy).toHaveBeenCalled();
  })
})

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

describe('tests of GettingStarted page', () => {
  test('What is MTG exists', () => {
    render(<MemoryRouter initialEntries={['/gettingStarted']}><GettingStarted /></MemoryRouter>);
    const childElement = screen.getByText('What is Magic the Gathering?');
    expect(childElement).toBeInTheDocument();
  });

  // test('check if there are link elements', ()=> {
  //   render(<GettingStarted />); 
  //   const linkelements = screen.getByAllRole('a')
  //   expect(linkelements.length).toBeGreaterThan(0);
  // });

  // test('How to nav exists', () => {
  //   render(<GettingStarted />)
  //   const childElement = screen.getByAltText('How to navigate our site?')
  //   expect(childElement).toBeInTheDocument()
  // });
  // test('Using Deck Builder exists', () => {
  //   render(<MemoryRouter initialEntries={['/gettingStarted']}>
  //   <Routes>
  //     <Route path='/gettingStarted' element={<GettingStarted />}>
  //     </Route>
  //   </Routes>
  //   </MemoryRouter>)
  //   const childElement = screen.getByAltText('Utilizing the Deck Builder')
  //   expect(childElement).toBeInTheDocument()
  // });
  // test ('Verify their are Link elements in GettingStarted component', ()=> {
  //   render(<GettingStarted />)
  //   const linkElements = screen.getAllByRole('Link');
  //   expect(LinkElements.length).toBeGreaterThan(0);
  // })
})






