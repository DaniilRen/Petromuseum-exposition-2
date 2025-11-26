import React from 'react';
import ArrowBack from '../buttons/ArrowBack';
import './Map.css'
import './CityMap.css'

const CityMap: React.FC = () => {
	return ( 
		<div className="map-holder">
			{<ArrowBack />}
			<div className="map" id='city-map'>
				
			</div>
		</div>
	)
}

export default CityMap