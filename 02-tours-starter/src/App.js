import React, { useState, useEffect } from "react";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-tours-project";

export default function App() {
	const [isLoading, setIsLoading] = useState(false);
	const [tours, setTours] = useState([]);

	function handleRemoveTour(id) {
		setTours((tours) => tours.filter((tour) => tour.id !== id));
	}

	async function fetchTours() {
		try {
			setIsLoading(true);
			const response = await fetch(url);
			const data = await response.json();

			if (!response.ok) throw new Error("Not able to find the data.");

			setTours(data);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(function () {
		fetchTours();
	}, []);

	if (isLoading)
		return (
			<main>
				<Loading />
			</main>
		);

	if (!tours.length)
		return (
			<main>
				<div className="title">
					<h2>no tours left</h2>
					<button className="btn" onClick={fetchTours}>
						refresh
					</button>
				</div>
			</main>
		);

	return (
		<main>
			<Tours tours={tours} onRemoveTour={handleRemoveTour} />
		</main>
	);
}

function Loading() {
	return (
		<div className="loading">
			<h1>loading...</h1>
		</div>
	);
}

function Tours({ tours, onRemoveTour }) {
	return (
		<section>
			<div className="title">
				<h2>our tours</h2>
				<div className="underline"></div>
			</div>
			<div>
				{tours.map((tour) => (
					<Tour key={tour.id} {...tour} onRemoveTour={onRemoveTour} />
				))}
			</div>
		</section>
	);
}

function Tour({ id, name, info, image, price, onRemoveTour }) {
	const [readMore, setReadMore] = useState(false);

	function handleToggle() {
		setReadMore((readMore) => !readMore);
	}

	return (
		<article className="single-tour">
			<img src={image} alt={name} />
			<footer>
				<div className="tour-info">
					<h4>{name}</h4>
					<h4 className="tour-price">&#36;{price}</h4>
				</div>
				<p>
					{readMore ? info : `${info.substring(0, 200)}...`}
					<button onClick={handleToggle}>
						{readMore ? "show less" : "show more"}
					</button>
				</p>
				<button className="delete-btn" onClick={() => onRemoveTour(id)}>
					not interested
				</button>
			</footer>
		</article>
	);
}
