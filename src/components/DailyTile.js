import React from 'react';

const DailyTile = ({ day }) => {
	const dateHandler = (time) => {
		let a = new Date(time * 1000).toDateString().split(' ');
		if (a[2].indexOf('0') === 0) {
			a[2] = a[2].split('0')[1];
		}
		let b = a[0] + ' ' + a[2];
		return b;
	};

	return (
		<div key={day.dt} className="grid-item">
			<div className="temp">
				<p className="date">{dateHandler(day.dt)}</p>
				<img
					src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
					alt={day.dt}
				/>
				<p className="main">{Math.round(day.temp.day - 273)}°C</p>
				<p>{day.weather[0].description}</p>
			</div>
		</div>
	);
};

export default DailyTile;
