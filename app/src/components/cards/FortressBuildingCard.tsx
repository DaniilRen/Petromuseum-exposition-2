import React, { useEffect, useState } from 'react';
import './FortressBuildingCard.css'
import DecembristTopographyCard from './DecembristTopographyCard'
import CloseButton from '../buttons/CloseButton';


interface FortressBuildingCardProps {
	group: string;
	onClose: () => void;
}

const FortressBuildingCard: React.FC<FortressBuildingCardProps> = ({ group, onClose }) => {
	const [decembrists, setDecembrists] = useState<any[]>([]);

	useEffect(() => {
		(async () => {
			try {
				const decembrists = await window.electronAPI.getRows("Decembrists_sec_1");
				const filtered_decembrists: Object[] = decembrists.filter(decembrist => decembrist.group === group);
				setDecembrists(filtered_decembrists);
			} catch (err) {
				console.error('Error fetching data:', err);
				setDecembrists([]);
			}
		})();
	}, [group]);

	return (
		<div className="fade-wrapper">
			<div className="building-card" key={group}>
				<CloseButton onClick={onClose} />
				<h2 className="group-name">{group}</h2>
				<div className="hline"></div>
				<p className="desc">Декабристы, которые здесь находились</p>
				<div className="decembrists-holder">
					{decembrists.map(decembrist => (
						<DecembristTopographyCard key={decembrist['name']} name={decembrist['name']} info={decembrist['info']} />
					))}
				</div>
			</div>
		</div>
	);
};

export default FortressBuildingCard;
