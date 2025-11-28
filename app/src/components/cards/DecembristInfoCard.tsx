import React, { useEffect, useState } from 'react';
import DecembristTextCard from './DecembristTextCard';
import './DecembristInfoCard.css'


interface DecembristInfoCardProps {
	group: string;
}

const DecembristInfoCard: React.FC<DecembristInfoCardProps> = ({ group }) => {
	const [decembrists, setDecembrists] = useState<any[]>([]);

	useEffect(() => {
		(async () => {
			try {
				const decembrists = await window.electronAPI.getRows("Decembrists_sec_4");
				const filtered_decembrists: Object[] = decembrists.filter(decembrist => decembrist.group === group);
				setDecembrists(filtered_decembrists);
			} catch (err) {
				console.error('Error fetching data:', err);
				setDecembrists([]);
			}
		})();
	}, [group]);

	return (
		<div className="decembrists-card" key={group}>
			<h2 className="group-name">{group}</h2>
			<div className="decembrists-holder">
				{decembrists.map(decembrist => (
					<DecembristTextCard info={decembrist['info']} address={decembrist['address']} topography={decembrist['topography']} />
				))}
			</div>
		</div>
	);
};

export default DecembristInfoCard;
