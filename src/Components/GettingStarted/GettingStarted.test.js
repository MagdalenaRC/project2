import { render, screen,  } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as MemoryRouter } from 'react-router-dom';
// import userEvent from '@testing-library/user-event';
import GettingStarted from './GettingStarted'


describe('tests of GettingStarted page', () => {
    test('What is MTG exists', () => {
      render(<MemoryRouter initialEntries={['/gettingStarted']}><GettingStarted /></MemoryRouter>);
      const childElement = screen.getByText('What is Magic the Gathering?');
      expect(childElement).toBeInTheDocument();
    });
  
    test('How to nav exists', () => {
      render(<MemoryRouter initialEntries={['/gettingStarted']}><GettingStarted /></MemoryRouter>)
      const childElement = screen.getByText('How to navigate our site?');
      expect(childElement).toBeInTheDocument()
    });
    test('Using Deck Builder exists', () => {
      render(<MemoryRouter initialEntries={['/gettingStarted']}><GettingStarted /></MemoryRouter>)
      const childElement = screen.getByText('Utilizing the Deck Builder');
      expect(childElement).toBeInTheDocument()
    });
    test ('Verify their are Link elements in GettingStarted component', ()=> {
      render(<MemoryRouter initialEntries={['/gettingStarted']}><GettingStarted /></MemoryRouter>)
      const linkElements = screen.getAllByRole('link');
      expect(linkElements.length).toBeGreaterThan(0);
    })
  })
  