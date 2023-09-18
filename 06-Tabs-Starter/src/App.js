import React, { useState, useEffect } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";

// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-tabs-project";

function App() {
	const [isLoading, setIsLoading] = useState(false);
	const [jobs, setJobs] = useState([]);
	const [value, setValue] = useState(0);

	async function fetchJobs() {
		try {
			setIsLoading(true);
			const response = await fetch(url);
			const newJobs = await response.json();

			if (!response.ok) throw new Error("Not able to fetch jobs.");

			setJobs(newJobs);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(function () {
		fetchJobs();
	}, []);

	if (isLoading)
		return (
			<section className="section loading">
				<h1>Loading...</h1>
			</section>
		);

	if (!jobs.length) return;

	const { company, dates, duties, title } = jobs.at(value);

	return (
		<section className="section">
			<div className="title">
				<h2>experience</h2>
				<div className="underline"></div>
			</div>
			<div className="jobs-center">
				<div className="btn-container">
					{jobs.map((item, index) => (
						<button
							key={item.id}
							className={`job-btn ${
								index === value ? "active-btn" : ""
							}`}
							onClick={() => setValue(index)}>
							{item.company}
						</button>
					))}
				</div>
				<article className="job-info">
					<h3>{title}</h3>
					<h4>{company}</h4>
					<p className="job-date">{dates}</p>
					{duties.map((duty, index) => (
						<div className="job-desc" key={index}>
							<FaAngleDoubleRight className="job-icon" />
							<p>{duty}</p>
						</div>
					))}
				</article>
			</div>
		</section>
	);
}

export default App;
