import { createContext, useState } from 'react';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Outlet, Route } from 'react-router-dom'
import { ToastContainer, useToasts } from '../Toasts';
import { usePersonalDeck, PersonalDeckContext } from '../../Hooks';

import Header from '../Header';
import DeckBuilder from '../DeckBuilder'
import DetailsPage from '../DetailsPage'
import SearchResult from '../SearchResults';
import ErrorPage from './error-page';
import GettingStarted from '../GettingStarted'
import Rulebook from '../Rulebook';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css' 

// export const personalDeckContext = createContext({ deck: [], addCard: () => { }, removeCard: () => { }, emptyDeck: () => { } });

const Layout = () => {
  const { toastList, showSuccess, deleteToast } = useToasts();
  const { deck, addCard, removeCard, emptyDeck } = usePersonalDeck(showSuccess);

  return (
    <PersonalDeckContext.Provider value={ { deck, addCard, removeCard, emptyDeck } }>
        <ToastContainer toasts={toastList} deleteToast={deleteToast}></ToastContainer>
        <Header></Header>
        <div className = 'appContainer'>
          <Outlet />
        </div>
    </PersonalDeckContext.Provider>
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