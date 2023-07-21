// Weather.js
/* eslint-disable react/prop-types */
import axios from "axios";
import { useState, useEffect } from "react";

export function Weather({ city }) {
	const [wind, setWind] = useState(0);
	const [temperature, setTemperature] = useState(0);
	const [icon, setIcon] = useState("");

	useEffect(() => {
		// Accessing the API key from environment variables and storing it in a variable
		
		const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

		const refetch = async () => {
			try {
				const response = await axios.get(
					`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
				);
				const data = response.data;
				setWind(data.wind.speed);
				setTemperature(data.main.temp);
				setIcon(data.weather[0].icon);
			} catch (error) {
				console.log(error);
			}
		};

		refetch();
	}, [city]);

	return (
		<>
			<h2>Weather in {city}</h2>
			<p>Temperature {temperature} Celsius</p>
			<img
				src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
				alt="Weather Icon"
			/>
			<p>Wind {wind} m/s</p>
		</>
	);
}
