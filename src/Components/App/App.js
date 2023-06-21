import 'bootstrap/dist/css/bootstrap.css';
import './App.css' 
import Header from '../Header/Header';
import DeckBuilder from '../DeckBuilder/DeckBuilder'
// import DetailsPage from '../DetailsPage/DetailsPage'
import CardList from '../CardList/CardList'
import SearchResult from '../SearchResults/SearchResults';
import ErrorPage from './error-page';
import GettingStarted from '../GettingStarted/GettingStarted'
import Rulebook from '../Rulebook/Rulebook';
import ToastContainer from '../ToastContainer/ToastContainer';
import { createContext, useState } from 'react';
import {createBrowserRouter, createRoutesFromElements, RouterProvider, Outlet, Route } from 'react-router-dom'


export const personalDeckContext = createContext({ deck: [], addCard: () => { } });
let _toastIndex = 0;

export const ToastContext = createContext({
  toastList: [],
  deleteToast: () => { },
});

const Layout = () => {
  const [ deck, setDeck ] = useState([]);
  const [toastList, setToastList] = useState([]);

  const showError = (message) => {
    const errToast = {
      id: _toastIndex,
      message: message,
      type: "error",
    };

    setToastList([...toastList, errToast]);
    _toastIndex++;
  };

  const showSuccess = (message) => {
    const successToast = {
      id: _toastIndex,
      message: message,
      type: "success",
    };

    setToastList([...toastList, successToast]);
    _toastIndex++;
  };

  const deleteToast = (id) => {
    setToastList([...toastList.filter(item => item.id !== id)]);
  };

  const addCard = (card) => {
    setDeck([...deck, card]);
    showSuccess('Card added to deck');
  };

  return (
    <personalDeckContext.Provider value={ { deck, addCard } }>
      <ToastContext.Provider value={{ toastList, deleteToast }}>
        <ToastContainer></ToastContainer>
      </ToastContext.Provider>
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
      {/* <Route index element={<DeckBuilder />} /> */}
      <Route path='/' element={<GettingStarted />} />
      <Route path='/rules' element={<Rulebook />} />
      <Route path='search/:query' element={<SearchResult />} />
      <Route path= '/gettingStarted' element={<GettingStarted />} />
      <Route path= '/deckBuilder' element={<DeckBuilder />} />
      {/* <Route path= '/detailPage' element={<DetailsPage />} /> */}
    </Route>
  )
);

// navigate(`search/${inputVal}`)

function App() {
  return (
    <RouterProvider  router={router} fallbackElement={<div>Loading... </div>}></RouterProvider>
  );
}

export default App;