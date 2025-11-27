import React from 'react';
import ArrowBack from '../buttons/ArrowBack';
import Handler from './resources/Handler';
import './Map.css'
import './FortressMap.css'

const FortressMap: React.FC = () => {

	return ( 
		<div className="map-holder">
			{<ArrowBack />}
			<div className="map" id='fortress-map'>
				<Handler groupName='Кронверкская куртина' resource='/images/maps/resources/example.png' left={370} top={327} />
			</div>
		</div>
	)
}

export default FortressMap