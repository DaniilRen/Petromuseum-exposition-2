import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const HorizontalSlider = ({ children }) => {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (React.createElement(Slider, Object.assign({}, settings), children.map((child, index) => (React.createElement("div", { key: index }, child)))));
};
export default HorizontalSlider;
