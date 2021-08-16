import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import Home from "./components/Index";
import Country from "./components/Country";
import Loading from "./components/Loading";
import Error from "./components/Error_Unhandled";
import NotFound from "./components/NotFound";
import ErrorBoundary from "./components/Error_Boundary";

function App() {
  let [results, setResults] = useState(null);
  let [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://restcountries.eu/rest/v2/alld`)
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
