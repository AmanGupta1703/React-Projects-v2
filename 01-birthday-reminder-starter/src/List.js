const List = ({ birthday }) => {
	return (
		<li className="person">
			<img src={birthday.image} alt={birthday.name} />
			<div>
				<h4>{birthday.name}</h4>
				<p>{birthday.age} years</p>
			</div>
		</li>
	);
};

export default List;
