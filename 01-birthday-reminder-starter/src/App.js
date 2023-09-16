import React, { useState } from "react";
import data from "./data";
import List from "./List";

function App() {
	const [birthdayLists, setBirthdayLists] = useState(data);

	function handleClearList() {
		setBirthdayLists({});
	}

	return (
		<main>
			<div className="container">
				<h3>{birthdayLists.length || 0} Birthdays Today</h3>
				{birthdayLists.length > 0 && (
					<ul>
						{birthdayLists.map((birthday) => (
							<List birthday={birthday} key={birthday.id} />
						))}
					</ul>
				)}
				<button onClick={handleClearList}>Clear All</button>
			</div>
		</main>
	);
}

export default App;
