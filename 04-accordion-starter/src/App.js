import React, { useState } from "react";
import data from "./data";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

function App() {
	return (
		<main>
			<div className="container">
				<h3>questions and answers about login</h3>
				<section className="info">
					{data.map((question) => (
						<Question {...question} key={question.id} />
					))}
				</section>
			</div>
		</main>
	);
}

function Question({ _, title, info }) {
	const [showInfo, setShowInfo] = useState(false);

	function handleToggleInfo() {
		setShowInfo((show) => !show);
	}

	return (
		<article className="question" onClick={handleToggleInfo}>
			<header>
				<h4>{title}</h4>
				<button className="btn">
					{showInfo ? <AiOutlineMinus /> : <AiOutlinePlus />}
				</button>
			</header>
			{showInfo && <p>{info}</p>}
		</article>
	);
}

export default App;
