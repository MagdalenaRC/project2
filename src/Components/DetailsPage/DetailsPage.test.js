import { getByTestId, render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, MemoryRouter, Link } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import DetailsPage from './DetailsPage';
import App from '../App';
import { waitFor } from '@testing-library/react';


describe('tests for DetailsPage component', () => {
    test('Details page Close button works', () => {
      const navigate = jest.fn();
      render (<MemoryRouter><DetailsPage navigate = {navigate}/></MemoryRouter>);
      const buttons = screen.getAllByRole('button');
      const closeButton = buttons[0]
      fireEvent.click(closeButton);
      waitFor(() => {
        expect(navigate).toHaveBeenCalledWith(-1);
      });
    })
    test('Add to deck button works ', () => {
      const addCard = jest.fn();
      render (<MemoryRouter><DetailsPage addCard = {addCard}/></MemoryRouter>);
      const buttons = screen.getAllByRole('button');
      const addButton = buttons[1]
      userEvent.click(addButton);
      waitFor(() => {
        expect(addCard).toHaveBeenCalledWith(card);
      });
    })
    // test('Purchase Card button works ', () => {
      
    //   render (<MemoryRouter><DetailsPage /></MemoryRouter>);
    //   const buttons = screen.getAllByRole('button');
    //   const purchaseButton = buttons[2]
    //   userEvent.
   
    // })
  })

