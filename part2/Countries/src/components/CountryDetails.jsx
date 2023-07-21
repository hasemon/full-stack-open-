/* eslint-disable react/prop-types */
import { Weather } from "./Weather";

export function CountryDetails({ country }) {
	return (
		<div>
			<h2>{country.name}</h2>
			{country.capital && <p>Capital: {country.capital}</p>}
			{country.area && <p>Area: {country.area}</p>}
			{country.languages && Object.keys(country.languages).length > 0 && (
				<div>
					<p>Languages:</p>
					<ul>
						{Object.values(country.languages).map((lang, index) => (
							<li key={index}>{lang}</li>
						))}
					</ul>
				</div>
			)}
			{country.flag && (
				<img
					src={country.flag}
					alt={`${country.name} flag`}
				/>
			)}
			<Weather city={country.capital} />
		</div>
	);
}
