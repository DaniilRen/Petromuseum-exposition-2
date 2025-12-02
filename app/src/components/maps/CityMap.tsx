import React from 'react';
import ArrowBack from '../buttons/ArrowBack';
import HandPointer from '../pointers/HandPointer';
import './Map.css'
import './CityMap.css'

const CityMap: React.FC = () => {
	return ( 
		<div className="map-holder">
			{<ArrowBack />}
			<HandPointer message='Нажмите на выделенную часть'/>
			<div className="map" id='city-map'>
				
			</div>
		</div>
	)
}

export default CityMap