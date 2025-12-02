import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage: React.FC = () => {
	const navigate = useNavigate();

	const buttons = [
		{ id: 1, label: 'места заключения декабристов в Петропавловской крепости' },
		{ id: 2, label: 'адреса декабристов' },
		{ id: 3, label: 'памятные места' },
		{ id: 4, label: 'список осужденных декабристов' },
		{ id: 5, label: 'документы' },
		{ id: 6, label: 'Воспоминания' },
	];

	return (
		<div className="container">
			<div className="poster">
				<div className="line line-1">ВЫСТАВКА</div>
				<div className="line line-2">ПЕТЕРБУРГ</div>
				<div className="line line-3">ДЕКАБРИСТОВ</div>
			</div>
			<div className="buttonsGrid">
				{buttons.map(({ id, label }) => (
					<button
						key={id}
						className="button"
						data-btn={id}
						onClick={() => navigate(`/page/${id}`)}
					>
						<span>{label}</span>
					</button>
				))}
			</div>
		</div>
	);
};

export default HomePage;
