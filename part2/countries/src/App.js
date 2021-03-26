import React, { useState, useEffect } from "react";
import axios from "axios";
require("dotenv").config();

const CountryList = ({ countries, search, setSearch, weather, setWeather }) => {
  // filter for countries
  let filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase())
  );
  // event handlers
  const handleShow = (country) => {
    setSearch(country.name);
  };
  if (filteredCountries.length === 1) {
    const params = {
      access_key: process.env.REACT_APP_WEATHERSTACK_API_KEY,
      query: filteredCountries[0].capital,
    };

    // TODO 2.14
    // tired moving the call from country detail to here, it doesnt work
    // spams requests.
    // axios.get(`http://api.weatherstack.com/current`, { params }).then((res) => {
    //   setWeather(res.data);
    //   console.log("weather object", weather);
    // });

    return (
      <CountryDetail
        country={filteredCountries[0]}
        weather={weather}
        setWeather={setWeather}
      />
    );
  } else if (filteredCountries.length <= 10) {
    return (
      <ul>
        {filteredCountries.map((country) => (
          <li key={country.numericCode}>
            {country.name}{" "}
            <button onClick={() => handleShow(country)} type="button">
              show
            </button>
          </li>
        ))}
      </ul>
    );
  } else {
    return <div>Too many matches. Please specify country name further</div>;
  }
};

const CountryDetail = ({ country, weather, setWeather }) => {
  // pull lanuages out of country object
  const languages = country.languages.map((language) => (
    <li key={language.name}>{language.name}</li>
  ));

  if (weather === {}) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <h1>{country.name}</h1>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <h3>Languages</h3>
        <ul>{languages}</ul>
        <img
          src={country.flag}
          alt={`Flag of ${country.name}`}
          width="500"
          height="300"
        />
        <h3>Weather in {country.capital}</h3>
        <p>Temperature: </p>
        <p>this will be an img</p>
        <p>Wind Speed: wind-speed-here</p>
      </>
    );
  }
};

function App() {
  // state
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState();

  // hooks
  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((res) => {
      setCountries(res.data);
    });
  }, []);

  // event handlers
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className="App">
      <div>
        {" "}
        Search: <input value={search} onChange={handleSearchChange} />
      </div>
      <CountryList
        countries={countries}
        search={search}
        setSearch={setSearch}
        weather={weather}
        setWeather={setWeather}
      />
    </div>
  );
}

export default App;
