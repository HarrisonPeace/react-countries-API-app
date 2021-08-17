import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/header";
import Home from "./components/home";
import Country from "./components/country-detail";
import Loading from "./components/loading";
import Error from "./components/error/error";
import NotFound from "./components/error/not-found";
import ErrorBoundary from "./components/error/error-boundary";

function App() {
  let [results, setResults] = useState(null);
  let [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://restcountries.eu/rest/v2/all`)
      .then((response) => setResults(response))
      .catch((e) => setError(true));
  }, []);

  return (
    <Router>
      <Header />
      <ErrorBoundary>
        {error ? (
          <Error />
        ) : (
          <>
            {results === null ? (
              <Loading />
            ) : (
              <Switch>
                <Route exact path="/">
                  {" "}
                  <Home data={results.data} />{" "}
                </Route>
                <Route path="/country/:countryCode">
                  {" "}
                  <Country data={results.data} />{" "}
                </Route>
                <Route exact path="/">
                  {" "}
                  <Home data={results.data} />{" "}
                </Route>
                <Route>
                  {" "}
                  <NotFound />{" "}
                </Route>
              </Switch>
            )}
          </>
        )}
      </ErrorBoundary>
    </Router>
  );
}

export default App;
