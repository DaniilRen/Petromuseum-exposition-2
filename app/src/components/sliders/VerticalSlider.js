import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const VerticalSlider = ({ children }) => {
    const settings = {
        dots: true,
        infinite: true,
        vertical: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        verticalSwiping: true,
    };
    return (React.createElement(Slider, Object.assign({}, settings), children.map((child, index) => (React.createElement("div", { key: index }, child)))));
};
export default VerticalSlider;
