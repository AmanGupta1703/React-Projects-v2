import React, { useState } from "react";
import items from "./data";

const allCategories = ["all", ...new Set(items.map((item) => item.category))];

function App() {
	const [menuItems, setMenuItems] = useState(items);
	const [categories, setCategories] = useState(allCategories);

	function filterItems(category) {
		if (category === "all") return setCategories(items);

		const newItems = items.filter((item) => item.category === category);
		setMenuItems(newItems);
	}

	return (
		<main>
			<section className="menu section">
				<div className="title">
					<h2>our menu</h2>
					<div className="underline"></div>
				</div>
			</section>
			<Categories filterItems={filterItems} categories={categories} />
			<Menu items={menuItems} />
		</main>
	);
}

function Categories({ categories, filterItems }) {
	return (
		<div className="btn-container">
			{categories.map((category, index) => {
				return (
					<button
						type="button"
						className="filter-btn"
						key={index}
						onClick={() => filterItems(category)}>
						{category}
					</button>
				);
			})}
		</div>
	);
}

function Menu({ items }) {
	return (
		<div className="section-center">
			{items.map((menuItem) => {
				const { id, title, img, desc, price } = menuItem;
				return (
					<article key={id} className="menu-item">
						<img src={img} alt={title} className="photo" />
						<div className="item-info">
							<header>
								<h4>{title}</h4>
								<h4 className="price">${price}</h4>
							</header>
							<p className="item-text">{desc}</p>
						</div>
					</article>
				);
			})}
		</div>
	);
}

export default App;
