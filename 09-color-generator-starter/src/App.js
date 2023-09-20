import React, { useState, useEffect } from "react";
import rgbToHex from "./utils";

import Values from "values.js";

function App() {
	const [color, setColor] = useState("#f15025");
	const [error, setError] = useState(false);
	const [list, setList] = useState(new Values(color).all(1));

	function handleSubmit(e) {
		e.preventDefault();
		try {
			setError(false);
			let colors = new Values(color).all(1);
			setList(colors);
		} catch (error) {
			setError(true);
			console.log(error);
		}
	}

	return (
		<>
			<section className="container">
				<h3>color generator</h3>
				<form onSubmit={handleSubmit}>
					<input
						className={error ? "error" : null}
						type="text"
						value={color}
						onChange={(e) => setColor(e.target.value)}
						placeholder="#f15025"
					/>
					<button type="submit" className="btn">
						submit
					</button>
				</form>
			</section>
			<section className="colors">
				{list.map((color, index) => (
					<SingleColor key={index} {...color} index={index} />
				))}
			</section>
		</>
	);
}

function SingleColor({ rgb, weight, hexColor, index }) {
	const [alert, setAlert] = useState(false);
	const bcg = rgb.join(",");
	const hex = rgbToHex(...rgb);

	function handleClick() {
		navigator.clipboard.writeText(hex);
		setAlert(true);
	}

	useEffect(
		function () {
			const timeout = setTimeout(function () {
				setAlert(false);
			}, 3000);
			return function () {
				clearInterval(timeout);
			};
		},
		[alert]
	);

	return (
		<article
			onClick={handleClick}
			className={`color ${index > 10 ? "color-light" : ""}`}
			style={{ backgroundColor: `rgb(${bcg})` }}>
			<p className="percent-value">{weight}&#37;</p>
			<p className="color-value">{hex}</p>
			{alert && <p className="alert">copied to clipboard</p>}
		</article>
	);
}

export default App;
