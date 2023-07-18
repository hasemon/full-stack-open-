/* eslint-disable no-mixed-spaces-and-tabs */
import { useState, useEffect } from "react";
import "./index.css";
import axios from "axios";

function App() {
	const [value, setValue] = useState('');
	const [countries, setCountries] = useState(null);

	useEffect(() => {
  if (!value) {
    return;
  }
  const refetch = async () => {
    try {
      const response = await axios.get('https://studies.cs.helsinki.fi/restcountries/api/all');
      const countryInfo = response.data.map(country => ({
        name: country.name.common,
        area: country.area,
        capital: country.capital,
        languages: country.languages,
        flag: country.flags.svg 
      }));
      setCountries(countryInfo);
    } catch (error) {
      console.log(error);
    }
  };
		refetch();

		return () => { 
			setCountries(null)
		 }

}, [value]);



	function handleChange(event) {
		setValue(event.target.value)
	}

	const filteredCountries = countries ? countries.filter(country =>
		country.name.toLowerCase().includes(value.toLowerCase())
	) : []

	const countryToShow =
		filteredCountries.length > 10 ? <p>Too many matches, specify another filter</p> :
			filteredCountries.length === 1 ? filteredCountries.map(country => (
				<div key={country.name}>
					<h2>{country.name}</h2>
					<p>Capital: {country.capital}</p>
					<p>Area: {country.area}</p>
					<ul>{Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}</ul>
					<img src={country.flag} />
				</div>
			))	:
			filteredCountries.map(country => <p key={country.name} >{country.name}</p>)

	return (
		<>
			<div>
				find countries: <input type="text" value={value} onChange={handleChange} />
			</div>
			{value ? countryToShow : null}
			
		</>
	);
}

export default App;
