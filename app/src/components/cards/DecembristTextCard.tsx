import React from 'react';
import './DecembristTextCard.css'


interface DecembristTextCardProps {
	info: string;
	address: string;
	topography: string;
}

const DecembristTextCard: React.FC<DecembristTextCardProps> = ({ info, address, topography }) => {
	return (
		<div key={info} className="decembrist-text">
			<p className="info"><span>Декабрист</span>: {info}</p>
			<p className="address"><span>Адреса проживания в Санкт-Петербурге</span>: {address}</p>
			<p className="topography"><span>Пребывание в крепости</span>: {topography}</p>
		</div>
	);
};

export default DecembristTextCard;
