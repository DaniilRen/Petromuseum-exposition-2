import React from 'react';
import ArrowBack from '../buttons/ArrowBack';
import Handler from './resources/Handler';
import './Map.css'
import './FortressMap.css'

const FortressMap: React.FC = () => {
	const example_resource_path = `${process.env.PUBLIC_URL}/images/maps/resources/example.png`;

	return ( 
		<div className="map-holder">
			{<ArrowBack />}
			<div className="map" id='fortress-map'>
				<Handler groupName='Кронверкская куртина' resource={example_resource_path} left={370} top={327} />
			</div>
		</div>
	)
}

export default FortressMap