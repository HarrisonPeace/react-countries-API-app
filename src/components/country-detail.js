import React from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import NotFound from "./error/not-found";

//Index Component
const Index = ({ data }) => {
  //Create history reference
  let history = useHistory();

  let { countryCode } = useParams();

  let countryData = data.filter((country) =>
    country.alpha3Code.toLowerCase().includes(countryCode)
  )[0];

  if (!countryData) {
    return <NotFound />;
  } else {
    return (
      <main id="country-details">
        <button className="stand-alone-button" onClick={() => history.goBack()}>
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 330 330"
          >
            <path
              id="XMLID_29_"
              d="M100.606,100.606L150,51.212V315c0,8.284,6.716,15,15,15c8.284,0,15-6.716,15-15V51.212l49.394,49.394
          C232.322,103.535,236.161,105,240,105c3.839,0,7.678-1.465,10.606-4.394c5.858-5.857,5.858-15.355,0-21.213l-75-75
          c-5.857-5.858-15.355-5.858-21.213,0l-75,75c-5.858,5.857-5.858,15.355,0,21.213C85.251,106.463,94.749,106.463,100.606,100.606z"
            />
          </svg>
          Back
        </button>
        <img src={countryData.flag} alt={`${countryData.name}'s Flag`} />
        <div className="text-container">
          <h1>{countryData.name}</h1>
          <div>
            <span>
              <span>Native Name:</span> {countryData.nativeName}
            </span>
            <span>
              <span>Population:</span> {countryData.population}
            </span>
            <span>
              <span>Region:</span> {countryData.region}
            </span>
            <span>
              <span>Sub Region:</span> {countryData.subregion}
            </span>
            <span>
              <span>Capital:</span> {countryData.capital}
            </span>
          </div>
          <div className="container-margin-top">
            <span>
              <span>Top Level Domain:</span> {countryData.topLevelDomain[0]}
            </span>
            <span>
              <span>Currencies:</span>{" "}
              {countryData.currencies.map((currency, i, a) => {
                if (a.length === 0 || i === a.length - 1) return currency.name;
                else return `${currency.name}, `;
              })}
            </span>
            <span>
              <span>Languages:</span>{" "}
              {countryData.languages.map((language, i, a) => {
                if (a.length === 0 || i === a.length - 1) return language.name;
                else return `${language.name}, `;
              })}
            </span>
          </div>
          <div className="container-margin-top">
            <span>
              <span>Border Countries:</span>
            </span>
            <div className="border-countries-container">
              {countryData.borders[0]
                ? countryData.borders.map((border, i, a) => {
                    let borderData = data.filter((country) =>
                      country.alpha3Code.includes(border)
                    )[0];
                    return (
                      <Link
                        key={`button-${borderData.alpha3Code}`}
                        className="border-button"
                        to={`/country/${borderData.alpha3Code.toLowerCase()}`}
                      >
                        {borderData.name || "N/A"}
                      </Link>
                    );
                  })
                : "N/A"}
            </div>
          </div>
        </div>
      </main>
    );
  }
};

export default Index;
