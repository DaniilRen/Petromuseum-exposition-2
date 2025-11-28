import React from 'react';
import './HandPointer.css'


interface HandPointerProps {
	message: string;
}

const HandPointer: React.FC<HandPointerProps> = ({ message }) => {
	const icon_path = `${process.env.PUBLIC_URL}/images/icons/hand.png`;
	return (
		<div className="hand-pointer-holder">
			<div className="hand-pointer-grid">
				<div className="hand-icon-holder">
					<img src={icon_path} alt={icon_path} />
				</div>
				<p className="hand-pointer-sign">{message}</p>
			</div>
		</div>
	)
};

export default HandPointer;