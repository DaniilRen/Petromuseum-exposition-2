import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface VerticalSliderProps {
  children: React.ReactNode[];
}

const VerticalSlider: React.FC<VerticalSliderProps> = ({ children }) => {
	const settings = {
		dots: true,
		infinite: true,
		vertical: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		verticalSwiping: true,
	};

	return (
		<div style={{  }}>
			<Slider {...settings}>
				{children.map((child, index) => (
					<div key={index}>{child}</div>
				))}
			</Slider>
		</div>
	);
};

export default VerticalSlider;
