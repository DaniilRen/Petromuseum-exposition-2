import React, { useState } from 'react';
import './CityHandler.css';
import { toggleElementVisibility, splitByBackslash } from '../../../utils';
import PlaqueCard from '../../cards/PlaqueCard';
import AddressCard from '../../cards/AddressCard';


interface CityHandlerProps {
	info: string;
	imageSrc: string;
	left: number;
	top: number;
	zIndex: number;
}

const CityHandler: React.FC<CityHandlerProps> = ({ info, imageSrc, left, top, zIndex }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
		toggleElementVisibility('back-arrow');
		toggleElementVisibility('hand-pointer-holder');
    setIsVisible(!isVisible);
  };

  const handleClose = () => {
		toggleElementVisibility('back-arrow');
		toggleElementVisibility('hand-pointer-holder');
    setIsVisible(false);
  };
	
	if (splitByBackslash(info) === info) {
		return (
    <div className="handler-holder" style={{ top: top, left: left, zIndex: zIndex }}>
      <button className="circle-button scaled-button" onClick={handleClick}></button>
			{isVisible && <PlaqueCard info={info} imageSrc={imageSrc} onClose={handleClose} />}
    </div>
  	);
	} else {
		const [address, name] = splitByBackslash(info);
		console.log(address, name)
		return (
    <div className="handler-holder" style={{ top: top, left: left, zIndex: zIndex }}>
			<button className="circle-button" onClick={handleClick}></button>
			{isVisible && <AddressCard address={address} name={name} left={left} top={top} onClose={handleClose} />}
    </div>
  	);
	}

};

export default CityHandler;
