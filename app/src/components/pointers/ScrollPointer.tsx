import React from 'react';
import './ScrollPointer.css'


interface ScrollPointerProps {
  direction: string;
}

const ScrollPointer: React.FC<ScrollPointerProps> = ({ direction }) => {
	switch (direction) {
		case "vertical":
			return (
				<div className="pointer vertical">
					&#8597;
				</div>
			);
	
		case "horizontal":
			return (
				<div className="pointer horizontal">
					&#8596;
				</div>
			);

		default:
			return (
			<p>
				! No pointer direction set
			</p>
		);
	};
};

export default ScrollPointer;