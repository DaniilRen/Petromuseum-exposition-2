import React from 'react';
import './DecembristTopographyCard.css'


interface DecembristTopographyCardProps {
	name: string;
	info: string;
}

const DecembristTopographyCard: React.FC<DecembristTopographyCardProps> = ({ name, info }) => {
	return (
		<div key={info} className="decembrist-topography">
			<p className="name">{name}</p>
			<p className="info">{info}</p>
		</div>
	);
};

export default DecembristTopographyCard;
