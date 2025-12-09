import React, { useEffect, useState } from 'react';
import ArrowBack from '../buttons/ArrowBack';
import HandPointer from '../pointers/HandPointer';
import './Map.css'
import './CityMap.css'
import CityHandler from './resources/CityHandler';

interface CityMapProps {
	mapType: string;
}

const CityMap: React.FC<CityMapProps> = ({ mapType }) => {
	const [resources, setResources] = useState<any[]>([]);
	useEffect(() => {
		(async () => {
			try {
				const resources = await window.electronAPI.getResources(mapType); 
				console.log(mapType, resources)
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
			<div className="map" id='city-map'>
				{resources.map((resource) => (
					<CityHandler info={resource.name} imageSrc={`${process.env.PUBLIC_URL}/images/${resource.path}`} left={resource.x} top={resource.y} zIndex={resource.zIndex}/>
				))}
			</div>
		</div>
	)
}

export default CityMap