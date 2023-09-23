import React, { useState, useEffect, useRef } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

function getListFromLocalStorage() {
	return JSON.parse(localStorage.getItem("list")) || [];
}

function App() {
	const [name, setName] = useState("");
	const [list, setList] = useState(getListFromLocalStorage);
	const [isEditing, setIsEditing] = useState(false);
	const [editId, setEditId] = useState(null);
	const [alert, setAlert] = useState({
		show: false,
		msg: "",
		type: "",
	});

	const inputEl = useRef(null);

	useEffect(function () {
		inputEl.current.focus();
	}, []);

	useEffect(
		function () {
			localStorage.setItem("list", JSON.stringify(list));
		},
		[list]
	);

	function handleSubmit(e) {
		e.preventDefault();

		if (!name) {
			showAlert(true, "please provide value", "danger");
		} else if (name && isEditing) {
			setList((list) =>
				list.map((item) => {
					if (item.id === editId) {
						return { ...item, title: name };
					}
					return item;
				})
			);
			setName("");
			setEditId(null);
			setIsEditing(false);
			showAlert(true, "item edited", "success");
		} else {
			showAlert(true, `${name} added to the list`, "success");
			const newItem = { id: crypto.randomUUID(), title: name };
			setList((list) => [...list, newItem]);
			setName("");
		}
	}

	function showAlert(show = false, msg = "", type = "") {
		setAlert({ show, msg, type });
	}

	function clearList() {
		showAlert(true, "list cleared", "danger");
		setList([]);
	}

	function removeItem(id) {
		setAlert(true, "item removed", "danger");
		setList((list) => list.filter((item) => item.id !== id));
	}

	function editItem(id) {
		const specificItem = list.find((item) => item.id === id);
		setIsEditing(true);
		setEditId(id);
		setName(specificItem.title);
	}

	return (
		<section className="section-center">
			<form className="grocery-form" onSubmit={handleSubmit}>
				{alert.show && (
					<Alert {...alert} removeAlert={showAlert} list={list} />
				)}
				<h3>grocery bud</h3>
				<div className="form-control">
					<input
						type="text"
						className="grocery"
						placeholder="e.g. eggs"
						value={name}
						onChange={(e) => setName(e.target.value)}
						ref={inputEl}
					/>
					<button type="submit" className="submit-btn">
						{isEditing ? "edit" : "submit"}
					</button>
				</div>
			</form>
			{list.length > 0 && (
				<div className="grocery-container">
					<List
						items={list}
						removeItem={removeItem}
						editItem={editItem}
					/>
					<button className="clear-btn" onClick={clearList}>
						clear items
					</button>
				</div>
			)}
		</section>
	);
}

function List({ items, removeItem, editItem }) {
	return (
		<div className="grocery-list">
			{items.map((item) => {
				const { id, title } = item;
				return (
					<article key={id} className="grocery-item">
						<p className="title">{title}</p>
						<div className="btn-container">
							<button
								type="button"
								className="edit-btn"
								onClick={() => editItem(id)}>
								<FaEdit />
							</button>
							<button
								type="button"
								className="delete-btn"
								onClick={() => removeItem(id)}>
								<FaTrash />
							</button>
						</div>
					</article>
				);
			})}
		</div>
	);
}

function Alert({ msg, type, removeAlert, list }) {
	useEffect(
		function () {
			const id = setTimeout(function () {
				removeAlert();
			}, 3000);

			return () => clearInterval(id);
		},
		[removeAlert, list]
	);
	return <p className={`alert alert-${type}`}>{msg}</p>;
}

export default App;
