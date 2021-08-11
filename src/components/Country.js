import React, { useState, useEffect } from "react";
import { useHistory, useLocation, useParams, Link } from "react-router-dom";

//Index Component
const Index = ({ data }) => {
  //Create history reference
  let history = useHistory();
  let location = useLocation();

  let { countryName } = useParams();

  let countryData = data.filter((country) => country.name.toLowerCase().includes(countryName))[0];

  return (
    <main>
      <Link to="/">Back</Link>
      <img src={countryData.flag} alt={`${countryData.name}'s Flag`} />
      <div>
        <h1>{countryData.name}</h1>
        <h2>Native Name: {countryData.nativeName}</h2>
        <h2>Population: {countryData.population}</h2>
        <h2>Region: {countryData.region}</h2>
        <h2>Sub Region: {countryData.subregion}</h2>
        <h2>Capital: {countryData.capital}</h2>
        <h2>Top Level Domain: {countryData.topLevelDomain[0]}</h2>
        {/* <h2>Currencies: {countryData.currencies}</h2>
        <h2>Languages: {countryData.languages}</h2> */}
      </div>
      <h2>Border Countries:</h2>
      <Link to="/">Back</Link>
    </main>
  );
};

export default Index;