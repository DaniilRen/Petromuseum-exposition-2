import React from 'react';
import ArrowBack from '../buttons/ArrowBack';
import './Map.css'
import './FortressMap.css'

const FortressMap: React.FC = () => {
	return ( 
		<div className="map-holder">
			{<ArrowBack />}
			<div className="map" id='fortress-map'>
				
			</div>
		</div>
	)
}

export default FortressMap