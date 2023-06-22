import { useEffect, useState } from "react";

const usePersonalDeck = (showSuccess) => {
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
    setDeck([...deck, card]);
    showSuccess("Card added to deck");
  };

  const removeCard = (card) => {
    let indexToRemove = deck.find((existingCard) => existingCard === card)
    let temp = [...deck];
    temp.splice(indexToRemove, 1)
    setDeck(temp)
    // setDeck(deck.filter((existingCard) => existingCard !== card));
    showSuccess("Card removed from deck");
  };

  return { deck, addCard, removeCard };
};

export default usePersonalDeck;
