import { useEffect, useState } from "react";
import connection from "./connection";
import ReactCountryFlag from "react-country-flag";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState([]);

  useEffect(() => {
    console.log("effect");
    connection.getAll().then((initialCountries) => {
      setCountries(initialCountries);
    });
  }, []);

  useEffect(() => {
    let filtered = countries.filter((country) => {
      return country.name.common.toLowerCase().includes(query.toLowerCase());
    });
    setSearch(filtered);
    console.log(filtered.length);
  }, [countries, query]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <>
      <div>
        Find countries: <input onChange={handleInputChange}></input>
      </div>
      <div>
        {search.length > 10 && <p>Too many matches, specify another filter</p>}
        {search.length <= 10 &&
          search.length >= 2 &&
          search.map((country) => {
            return (
              <div key={country.name.common} className="search">
                <p key={country.name.common}>{country.name.common}</p>
                <button
                  onClick={() => {
                    setQuery(country.name.common);
                  }}
                >
                  show
                </button>
              </div>
            );
          })}
        {search.length === 1 &&
          search.map((item) => {
            console.log(item);
            console.log(Object.values(item.languages));
            return (
              <>
                <h2 key={item.name.common}>{item.name.common}</h2>
                <p key={item.capital}>Capital: {item.capital}</p>
                <p key={item.area}>
                  Area: {parseFloat(item.area).toLocaleString("pt-BR")}
                </p>
                <h3>Languages:</h3>
                <ul>
                  {Object.values(item.languages).map((el) => {
                    return <li key={el}>{el}</li>;
                  })}
                </ul>
                <ReactCountryFlag
                  countryCode={item.cca2}
                  style={{
                    width: "10em",
                    height: "10em",
                  }}
                  svg
                />
                <h3>Weather in {item.capital}</h3>
              </>
            );
          })}
      </div>
    </>
  );
}
export default App;
