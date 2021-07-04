import React from 'react';
import water from '../img/water.png';
import wind from '../img/wind.png';

const HourlyTile = ({ hour }) => {
	const hourHandler = (time) => {
		let a = new Date(time * 1000).toLocaleTimeString();
		let b = a.split(':');
		let d = b[2].split(' ');
		let c = b[0] + d[1];
		return c;
	};

	return (
		<div key={hour.dt} className="tile">
			<h5>{hourHandler(hour.dt)}</h5>
			<img
				src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
				alt={hour.dt}
			/>
			<div className="tempDetails">
				<p>
					<span className="highlighted2">{Math.round(hour.temp - 273)}°C</span>
				</p>
				<p>{hour.weather[0].description}</p>
			</div>
			<div className="rainandwind">
				<div>
					<img width="10px" src={water} alt="water" />
					<p>{Math.round(hour.pop * 100)}%</p>
				</div>
				<div>
					<img width="10px" src={wind} alt="wind" />
					<p>{hour.wind_speed} km/h</p>
				</div>
			</div>
		</div>
	);
};

export default HourlyTile;
