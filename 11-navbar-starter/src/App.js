/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useRef, useEffect } from "react";
import { FaBars, FaTwitter } from "react-icons/fa";
import { links, social } from "./data";
import logo from "./logo.svg";

function App() {
	return (
		<>
			<Navbar />
		</>
	);
}

function Navbar() {
	const [showLinks, setShowLinks] = useState(false);

	const linksContainerRef = useRef(null);
	const linksRef = useRef(null);

	function handleToggleLinks() {
		setShowLinks((showLinks) => !showLinks);
	}

	useEffect(
		function () {
			const linksheight = linksRef.current.getBoundingClientRect().height;
			if (showLinks)
				linksContainerRef.current.style.height = `${linksheight}px`;
			else linksContainerRef.current.style.height = "0px";
		},
		[showLinks]
	);

	return (
		<nav>
			<div className="nav-center">
				<div className="nav-header">
					<img src={logo} alt="logo" />
					<button className="nav-toggle" onClick={handleToggleLinks}>
						<FaBars />
					</button>
				</div>
				<div className="links-container" ref={linksContainerRef}>
					<ul className="links" ref={linksRef}>
						{links.map((link) => {
							const { id, url, text } = link;
							return (
								<li key={id}>
									<a href={url}>{text}</a>
								</li>
							);
						})}
					</ul>
				</div>
				<ul className="social-icons">
					{social.map((socialIcon) => {
						const { id, url, icon } = socialIcon;
						return (
							<li key={id}>
								<a href={url}>{icon}</a>
							</li>
						);
					})}
				</ul>
			</div>
		</nav>
	);
}

export default App;
