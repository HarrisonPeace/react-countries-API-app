import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

import PerPage from "./PerPage";
import SearchFrom from "./SearchForm";
import Pages from "./Pages";
import FilterByRegion from "./FilterByRegion";

import filterResults from "./filter-results";
import formatResults from "./format-results";
import Loading from "./Loading";

const queryString = require("query-string");

//Index Component
const Index = ({ data }) => {
  //Create location reference
  let location = useLocation();

  const query = queryString.parse(location.search);
  query.perPage = parseInt(query.perPage || 12);
  query.page = parseInt(query.page || 1);
  let { search, region, perPage, page } = query;

  const [totalPages, setTotalPages] = useState(1);
  const [formattedData, setFormattedData] = useState(null);

  useEffect(() => {
    let filteredData = filterResults(data, search, region);
    setFormattedData(formatResults(filteredData, setTotalPages, perPage));
  }, [data, region, perPage, search]);

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
        {
          formattedData.length === 0 ?
          <div className="not-found">
        <h2>Sorry no results where found</h2>
        <p>Please try again.</p>
      </div> :
      <>
      <div className="countries-container">
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
        }
      </main>
    );
  }
};

export default Index;
