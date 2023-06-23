import { getByTestId, render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import Rulebook from './Rulebook';

describe('tests for the Rulebook', () => {
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
  test('check that a new card is being generated when button is clicked', () => {
    render(<Rulebook/>)
    const oldName = screen.getByText(/Card Name:/)
    const oldCardName = oldName.nextSibling.textContent;
    const button = screen.getByText('Give it A Try')
    userEvent.click(button);
    const name = screen.getByText(/Card Name:/)
    const newCardName = name.nextSibling.textContent;
    expect(newCardName).not.toEqual(oldCardName);
  })
})