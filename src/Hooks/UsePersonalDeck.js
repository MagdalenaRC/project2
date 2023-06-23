import { createContext, useContext, useEffect, useState, useRef } from "react";

export const PersonalDeckContext = createContext({ deck: [], addCard: () => { }, removeCard: () => { }, emptyDeck: () => { } });

const usePersonalDeck = (showSuccess) => {
  const id = useRef(0);

  const getFromStorage = () => {
    if (localStorage.personalDeck) {
      return JSON.parse(localStorage.personalDeck);
    }
    return [];
  };

  const [deck, setDeck] = useState(getFromStorage());

  const saveToStorage = () => {
    console.log("saved");
    localStorage.personalDeck = JSON.stringify([...deck]);
  };

  useEffect(() => {
    saveToStorage();
  }, [deck]);

  const addCard = (card) => {
    let copy = Object.create(card);
    copy.uuid = `${id.current++}-${copy.id}`;
    setDeck([...deck, copy]);
    showSuccess("Card added to deck");
  };

  const removeCard = (card, index) => {
    console.log(index, card);
    let indexToRemove = deck.findIndex((existingCard) => existingCard.uuid === card.uuid)
    let temp = [...deck];
    temp.splice(indexToRemove, 1)
    setDeck(temp)
    // setDeck(deck.filter((existingCard) => existingCard !== card));
    showSuccess("Card removed from deck");
  };

  const emptyDeck = () => {
    setDeck([])
    showSuccess("Deck has been emptied");
  }


  return { deck, addCard, removeCard, emptyDeck };
};

export const usePersonalDeckContext = () => { return useContext(PersonalDeckContext) }

export default usePersonalDeck;
