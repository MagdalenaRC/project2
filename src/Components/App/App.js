import 'bootstrap/dist/css/bootstrap.css';
import './App.css' 
import Header from '../Header/Header';
import DeckBuilder from '../DeckBuilder/DeckBuilder'
import DetailsPage from '../DetailsPage/DetailsPage'
import CardList from '../CardList/CardList'
import SearchResult from '../SearchResults/SearchResults';
import ErrorPage from './error-page';
import GettingStarted from '../GettingStarted/GettingStarted'
import Rulebook from '../Rulebook/Rulebook';
import { ToastContainer, useToasts } from '../Toasts';
import { usePersonalDeck } from '../../Hooks';
import { createContext, useState } from 'react';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Outlet, Route } from 'react-router-dom'

export const personalDeckContext = createContext({ deck: [], addCard: () => { }, removeCard: () => { } });

const Layout = () => {
  const { toastList, showSuccess, deleteToast } = useToasts();
  const { deck, addCard, removeCard } = usePersonalDeck(showSuccess);

  return (
    <personalDeckContext.Provider value={ { deck, addCard, removeCard } }>
        <ToastContainer toasts={toastList} deleteToast={deleteToast}></ToastContainer>
        <Header></Header>
        <div className = 'appContainer'>
          <Outlet />
        </div>
    </personalDeckContext.Provider>
  );
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}  errorElement={<ErrorPage/>}>
      <Route path='/' element={<GettingStarted />} />
      <Route path='/rules' element={<Rulebook />} />
      <Route path='search' element={<SearchResult />} />
      <Route path='search/:query' element={<SearchResult />} />
      <Route path= '/gettingStarted' element={<GettingStarted />} />
      <Route path= '/deckBuilder' element={<DeckBuilder />} />
      <Route path= '/details/:id' element={<DetailsPage />} />
    </Route>
  )
);

function App() {
  return (
    <RouterProvider  router={router} fallbackElement={<div>Loading... </div>}></RouterProvider>
  );
}

export default App;