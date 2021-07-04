import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DailyTile from './DailyTile';
import HourlyTile from './HourlyTile';

const Main = () => {
	const [data, setData] = useState({});
	const fetchData = (latitude, longitude) => {
		axios
			.get(
				`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_KEY}`,
			)
			.then((data) => {
				setData(data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		const saveLocation = (position) => {
			let lat = position.coords.latitude;
			let long = position.coords.longitude;
			fetchData(lat, long);
		};
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(saveLocation);
		} else {
			alert('looks like you device is too old to know where its at');
		}
	}, []);

	const renderCurrentWeather = () => (
		<div className="currentWeather">
			<img
				src={`http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`}
				alt={data.name}
			/>
			<h5>{data.timezone}</h5>
			<div className="tempDetails">
				<h3>{Math.round(data.current.temp - 273)}°C</h3>
				<p>{data.current.weather[0].description}</p>
			</div>
		</div>
	);

	const getTime = (time) => {
		let a = new Date(time * 1000).toLocaleTimeString();
		return a;
	};

	const renderSummary = () => (
		<div className="todaySummary">
			<h5>Today's summary</h5>
			<hr />
			<div className="summaryDetails">
				<p>
					Highest temp:{' '}
					<span className="highlighted">{`${Math.round(
						data.daily[0].temp.max - 273,
					)}°C`}</span>
				</p>
				<p>
					Lowest temp:{' '}
					<span className="highlighted">{`${Math.round(
						data.daily[0].temp.min - 273,
					)}°C`}</span>
				</p>
				<p>
					Sunrise:{' '}
					<span className="highlighted">{`${getTime(
						data.daily[0].sunrise,
					)}`}</span>
				</p>
				<p>
					Sunset:{' '}
					<span className="highlighted">{`${getTime(
						data.daily[0].sunset,
					)}`}</span>
				</p>
				<p>
					Moonrise:{' '}
					<span className="highlighted">{`${getTime(
						data.daily[0].moonrise,
					)}`}</span>
				</p>
				<p>
					Moonset:{' '}
					<span className="highlighted">{`${getTime(
						data.daily[0].moonset,
					)}`}</span>
				</p>
			</div>
		</div>
	);

	const feelsLike = () => (
		<div className="feelsLike">
			<p>
				feels like:{' '}
				<span className="highlighted">
					{Math.round(data.current.feels_like - 273)}°C
				</span>
			</p>
			<p>
				barometer:{' '}
				<span className="highlighted">{data.current.pressure} mb</span>
			</p>
			<p>
				wind:{' '}
				<span className="highlighted">{data.current.wind_speed} kmph</span>
			</p>
			<p>
				humidity: <span className="highlighted">{data.current.humidity}%</span>
			</p>
		</div>
	);

	const renderDaily = () => (
		<div className="dailyWeather">
			<h2>Daily</h2>
			<hr />
			<div className="grid-container">
				{data.daily.map((day, i) => (
					<DailyTile key={i} day={day} />
				))}
			</div>
		</div>
	);

	const renderHourly = () => {
		let trimmedData = data.hourly.slice(-24);
		return (
			<div className="hourlyWeather">
				<h4>Hourly</h4>
				<hr />
				<div className="tile-container">
					{trimmedData.map((hour, i) => (
						<HourlyTile key={i} hour={hour} />
					))}
				</div>
			</div>
		);
	};

	return (
		<>
			{Object.keys(data).length !== 0 ? (
				<div className="container-fluid">
					{/* need to add this functionlity later */}
					{/* <div className="row">
						<input className="searchBar" type="text" />
					</div> */}
					<div className="row">
						<div className="col-lg-3 col-md-6 col-sm-12">
							{renderCurrentWeather()}
							{renderSummary()}
						</div>
						<div className="col-lg-5 col-md-6 col-sm-6">
							{feelsLike()}
							{renderDaily()}
						</div>
						<div className="col-lg-4 col-md-12 col-sm-6">{renderHourly()}</div>
					</div>
				</div>
			) : (
				<h2>loading</h2>
			)}
		</>
	);
};

export default Main;
