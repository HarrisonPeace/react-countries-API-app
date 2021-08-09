
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

function App() {

  let [results, setResults] = useState(null);

  useEffect(() => {
    axios.get(`https://restcountries.eu/rest/v2/all`)
    .then(response => setResults(response))
  }, []);

  useEffect(() => {
    console.log(results)
  }, [results]);

  return (
    <Router>
      <Header/>
      <Switch>
        <Route exact path="/"> <Home results/> </Route>
        <Route exact path="/:country"> <Country results/> </Route>
      </Switch>
    </Router>
  );
}

export default App;
