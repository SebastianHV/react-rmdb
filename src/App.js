import React from 'react';
// Routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// Compoenents
import Header from './components/Header'; // Module imported with ES6 Syntax
import Home from './components/Home';
import Movie from './components/Movie';
import NotFound from './components/NotFound';

// Styles
import { GlobalStyle } from './GlobalStyle'

const App = () => (
  // We write the router instead of the App component
  // The Router component will wrap our complete application
    <Router>
      {/* The header will be shown on every page, so we left it out of the Routes compoenent */}
      <Header />
      {/* Inside the routes component we put every Route */}
      <Routes>
        {/* Here we have our home page route */}
        <Route path='/' element={<Home/>} />
        {/* The route for every movie */}
        {/* When we fetch an individual movie, we are gonna need the mvoie id, and we can send along the route params for that. */}
        <Route path='/:movieId' element={<Movie/>} />
        {/* The asterisk make sure it routes to any page that is NOT specified or odes NOT exists */}
        <Route path='/*' element={<NotFound/>} />
      </Routes>
      <GlobalStyle />
    </Router>
  );

export default App;
