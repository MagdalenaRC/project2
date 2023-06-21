import './App.css';
import Header from '../Header/Header';
import DeckBuilder from '../DeckBuilder/DeckBuilder'
// import DetailsPage from '../DetailsPage/DetailsPage'
import CardList from '../CardList/CardList'
import SearchResult from '../SearchResults/SearchResults';
import ErrorPage from './error-page';
import GettingStarted from '../GettingStarted/GettingStarted'
import Rulebook from '../Rulebook/Rulebook';
import {createBrowserRouter, createRoutesFromElements, RouterProvider, Outlet, Route } from 'react-router-dom'

const Layout = () => {
  return (
    <>
      <Header></Header>
      <Outlet />
    </>
  );
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<ErrorPage/>}>
      {/* <Route index element={<DeckBuilder />} /> */}
      <Route path='/' element={<GettingStarted />} />
      <Route path='/rules' element={<Rulebook />} />
      <Route path='search/:query' element={<SearchResult />} />
      <Route path= '/gettingStarted' element={<GettingStarted />} />
      <Route path= '/deckBuilder' element={<DeckBuilder />} />
    </Route>
  )
);

// navigate(`search/${inputVal}`)

function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;