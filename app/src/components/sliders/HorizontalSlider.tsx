import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface HorizontalSliderProps {
  children: React.ReactNode[];
}

const HorizontalSlider: React.FC<HorizontalSliderProps> = ({ children }) => {
	const settings = {
		dots: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	return (
		<div style={{ width: '100%'}}>
			<Slider {...settings}>
				{children.map((child, index) => (
					<div key={index}>{child}</div>
				))}
			</Slider>
		</div>
	);
};

export default HorizontalSlider;
