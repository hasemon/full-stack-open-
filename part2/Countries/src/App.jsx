/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "./index.css";
import axios from "axios";
import { CountryDetails } from "./components/CountryDetails";


function App() {
	const [value, setValue] = useState("");
	const [countries, setCountries] = useState(null);
	const [showDetails, setShowDetails] = useState(false);
	const [selectedCountry, setSelectedCountry] = useState(null);

	useEffect(() => {
		if (!value) {
			return;
		}
		const refetch = async () => {
			try {
				const response = await axios.get(
					"https://studies.cs.helsinki.fi/restcountries/api/all"
				);
				const countryInfo = response.data.map((country) => ({
					name: country.name.common,
					area: country.area,
					capital: country.capital?.[0],
					languages: country.languages,
					flag: country.flags?.svg,
				}));
				setCountries(countryInfo);
			} catch (error) {
				console.log(error);
			}
		};
		refetch();

		return () => {
			setCountries([]);
		};
	}, [value]);

	function handleShow(country) {
		setShowDetails(true);
		setSelectedCountry(country);
	}

	function handleChange(event) {
		setValue(event.target.value);
		setShowDetails(false);
		setSelectedCountry(null);
	}

	const filteredCountries = countries
		? countries.filter((country) =>
				country.name.toLowerCase().includes(value.toLowerCase())
		  )
		: [];

	const countryToShow =
		filteredCountries.length > 10 ? (
			<p>Too many matches, specify another filter</p>
		) : filteredCountries.length === 1 ? (
			<CountryDetails country={filteredCountries[0]} />
		) : (
			filteredCountries.map((country) => (
				<div key={country.name}>
					{country.name}
					<button onClick={() => handleShow(country)}>Show</button>
				</div>
			))
		);

	return (
		<>
			<div>
				find countries:{" "}
				<input
					type="text"
					value={value}
					onChange={handleChange}
				/>
			</div>
			{showDetails && selectedCountry ? (
				<CountryDetails country={selectedCountry} />
			) : (
				countryToShow
			)}
		</>
	);
}

export default App;
