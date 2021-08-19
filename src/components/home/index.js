import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

// Component Imports
import PerPage from "./custom-select/items-per-page";
import SearchFrom from "./search-form";
import Pages from "./pagination";
import FilterByRegion from "./custom-select/filter-by-region";
import Loading from "../loading";

// helper Imports
import filterResults from "../helpers/filter-results";
import formatResults from "../helpers/format-results";

const queryString = require("query-string");

const Index = ({ data }) => {
  //Create location reference
  let location = useLocation();

  const query = queryString.parse(location.search); //get query string from URL turn it into an object
  query.perPage = parseInt(query.perPage || 12); //turn perPage into number or 12
  query.page = parseInt(query.page || 1); //turn "current" page into number or "page" 1
  let { search, region, perPage, page } = query; //create variables for each query parameter

  const [totalPages, setTotalPages] = useState(1);
  const [formattedData, setFormattedData] = useState(null);

  /**
   * @description filter and format the data to be show on the page by passing it through both the filterResults and formatResults helpers (see individual documents for how these work)
   * @Return sets FormattedData state
   */
  useEffect(() => {
    let filteredData = filterResults(data, search, region);
    setFormattedData(formatResults(filteredData, setTotalPages, perPage));
  }, [data, region, perPage, search]);

  //if useEffect has not worked yet (initial mount) return loading
  if (formattedData === null) {
    return <Loading />;
  } else {
    return (
      <main>
        <div id="search-options-container">
          <SearchFrom query={query} />
          <div id="options-bar">
            <PerPage query={query} />
            <FilterByRegion query={query} />
          </div>
        </div>
        {formattedData.length === 0 ? (
          <div className="not-found-error-container">
            <h2>Sorry no results where found</h2>
            <p>Please try again.</p>
          </div>
        ) : (
          <>
            <div className="countries-container">
              {/* -- Map over all countries in the formatted results array and create a JSX element  */}
              {formattedData[page - 1].map((country) => (
                <div className="country-container" key={country.name}>
                  <Link to={`/country/${country.alpha3Code.toLowerCase()}`}>
                    <img src={country.flag} alt={`${country.name}'s Flag`} />
                    <div className="text-container">
                      <h1>{country.name}</h1>
                      <span>
                        <span>Population:</span> {country.population}
                      </span>
                      <span>
                        <span>Region:</span> {country.region}
                      </span>
                      <span>
                        <span>Capital:</span> {country.capital}
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            <Pages query={query} totalPages={totalPages} />
          </>
        )}
      </main>
    );
  }
};

export default Index;
