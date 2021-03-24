import React, { useState, useEffect } from "react";
import axios from "axios";

const CountryList = ({ countries, search }) => {
  // filter for countries
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase())
  );
  if (filteredCountries.length === 1) {
    return <CountryDetail country={filteredCountries[0]} />;
  } else if (filteredCountries.length <= 10) {
    return (
      <ul>
        {filteredCountries.map((country) => (
          <li key={country.numericCode}>{country.name}</li>
        ))}
      </ul>
    );
  } else {
    return <div>Too many matches. Please specify country name further</div>;
  }
};

const CountryDetail = ({ country }) => {
  const languages = country.languages.map((language) => (
    <li key={language.name}>{language.name}</li>
  ));
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
    </>
  );
};

function App() {
  // state
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

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
      <CountryList countries={countries} search={search} />
    </div>
  );
}

export default App;
