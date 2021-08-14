
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import Header from './components/Header'
import Home from './components/Index'
import Country from './components/Country'
import Loading from './components/Loading'

function App() {

  let [results, setResults] = useState(null);

  useEffect(() => {
    axios.get(`https://restcountries.eu/rest/v2/all`)
    .then(response => setResults(response))
  }, []);

  return (
    <Router>
      <Header />
      {
        results === null ?
        <Loading />
        :
        <Switch>
          <Route exact path="/"> <Home data={results.data}/> </Route>
          <Route path="/country/:countryName"> <Country data={results.data}/> </Route>
        </Switch>
      }
    </Router>
  );
}

export default App;
