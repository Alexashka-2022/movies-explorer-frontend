import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(true);
  const cards = Array(12).fill(null);
  const cardsSaved = Array(3).fill(null);
  return (
    <div className="page">
      <Routes>
        <Route path='/' element={<Main loggedIn={loggedIn} />} />
        <Route path='/movies' element={<Movies loggedIn={loggedIn} cards={cards} />} />
        <Route path='/saved-movies' element={<SavedMovies loggedIn={loggedIn} cards={cardsSaved} />} />
        <Route path='/profile' element={<Profile loggedIn={loggedIn} />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/signin' element={<Login />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
