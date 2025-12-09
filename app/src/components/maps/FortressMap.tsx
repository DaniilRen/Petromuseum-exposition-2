import React, { useEffect, useState } from 'react';
import ArrowBack from '../buttons/ArrowBack';
import FortressHandler from './resources/FortressHandler';
import './Map.css'
import './FortressMap.css'
import HandPointer from '../pointers/HandPointer';


const FortressMap: React.FC = () => {
	const [resources, setResources] = useState<any[]>([]);
	useEffect(() => {
		(async () => {
			try {
				const resources = await window.electronAPI.getResources("fortress"); 
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
					<FortressHandler groupName={resource.name} resource={`${process.env.PUBLIC_URL}/images/maps/resources/${resource.path}`} left={resource.x} top={resource.y} zIndex={resource.zIndex}/>
				))}
			</div>
		</div>
	)
}

export default FortressMap