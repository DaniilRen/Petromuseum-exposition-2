import React from 'react';
import './ArrowBack.css'

const ArrowBack: React.FC = () => {
	return (
	<button className='back-arrow' onClick={() => window.history.back()}>
		&#8680;
	</button>
	)
}

export default ArrowBack;