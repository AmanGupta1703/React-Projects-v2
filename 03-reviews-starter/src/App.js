import React, { useState } from "react";
import people from "./data";
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from "react-icons/fa";

function App() {
	return (
		<main>
			<section className="container">
				<div className="title">
					<h2>our reviews</h2>
					<div className="underline"></div>
				</div>
				<Review />
			</section>
		</main>
	);
}

function Review() {
	const [index, setIndex] = useState(0);

	const { name, job, image, text } = people.at(index);

	function checkNumber(number) {
		if (number > people.length - 1) {
			return 0;
		}
		if (number < 0) {
			return people.length - 1;
		}
		return number;
	}

	function handlePrevPerson() {
		setIndex(checkNumber(index - 1));
	}

	function handleNextPerson() {
		setIndex(checkNumber(index + 1));
	}

	function handleRandomPerson() {
		let random = Math.floor(Math.random() * people.length);
		if (random === index) random = random - 1;
		setIndex(checkNumber(random));
	}

	return (
		<article className="review">
			<div className="img-container">
				<img src={image} alt={name} className="person-img" />
				<span className="quote-icon">
					<FaQuoteRight />
				</span>
			</div>
			<h4 className="author">{name}</h4>
			<p className="job">{job}</p>
			<p className="info">{text}</p>
			<div className="button-container">
				<button className="prev-btn" onClick={handlePrevPerson}>
					<FaChevronLeft />
				</button>
				<button className="next-btn" onClick={handleNextPerson}>
					<FaChevronRight />
				</button>
			</div>
			<button className="random-btn" onClick={handleRandomPerson}>
				suprise me
			</button>
		</article>
	);
}

export default App;
