import React, { useEffect, useState } from 'react';
import ArrowBack from '../buttons/ArrowBack';
import Handler from './resources/Handler';
import './Map.css'
import './FortressMap.css'
import HandPointer from '../pointers/HandPointer';


const FortressMap: React.FC = () => {
	const [resources, setResources] = useState<any[]>([]);
	useEffect(() => {
		(async () => {
			try {
				const resources = await window.electronAPI.getResources(); 
				console.log(resources)
				setResources(resources);
			} catch (err) {
				console.error('Error fetching data:', err);
			}
		})();
	}, []);

	return ( 
		<div className="map-holder">
			{<ArrowBack />}
			<HandPointer message='Нажмите на выделенную часть'/>
			<div className="map" id='fortress-map'>
				{resources.map((resource) => (
					<Handler groupName={resource.name} resource={resource} />
				))}
			</div>
		</div>
	)
}

export default FortressMap