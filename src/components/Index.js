import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

import PerPage from "./PerPage";
import SearchFrom from "./SearchForm";
import Pages from "./Pages";
import FilterByRegion from "./FilterByRegion";

import filterResults from "./filter-results";
import formatResults from "./format-results";

const queryString = require("query-string");

//Index Component
const Index = ({ data }) => {
  //Create location reference
  let location = useLocation();

  const query = queryString.parse(location.search);
  query.perPage = parseInt(query.perPage || 10);
  query.page = parseInt(query.page || 1);
  let { search, region, perPage, page } = query;

  const [totalPages, setTotalPages] = useState(1);
  const [formattedData, setFormattedData] = useState(null);

  useEffect(() => {
    let filteredData = filterResults(data, search, region);
    setFormattedData(formatResults(filteredData, setTotalPages, perPage));
  }, [data, region, perPage, search]);

  if (!formattedData) {
    return <div>Loading</div>;
  } else {
    return (
      <main>
        <SearchFrom query={query} />
        <div id="options-bar">
          <PerPage query={query} />
          <FilterByRegion query={query} />
        </div>
        {formattedData[page - 1].map((country) => (
          <Link
            key={country.name}
            to={`/country/${country.name.toLowerCase()}`}
          >
            <div className="country-container">
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
            </div>
          </Link>
        ))}
        <Pages
          query={query}
          totalPages={totalPages}
        />
      </main>
    );
  }
};

export default Index;
