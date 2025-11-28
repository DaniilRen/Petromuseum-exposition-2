import React, { useState } from 'react';
import FortressBuildingCard from '../../cards/FortressBuildingCard';
import './Handler.css';
import toggleElementVisibility from '../../../utils';


interface HandlerProps {
	groupName: string;
	resource: string;
	left: number;
	top: number;
}

const Handler: React.FC<HandlerProps> = ({ groupName, resource, left, top }) => {
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

  return (
    <div className="handler-holder" style={{ top: top, left: left }}>
      <img
        onClick={handleClick}
        className="handler-resource"
        src={resource}
        alt={resource}
        style={{ top: top, left: left }}
      />
      {isVisible && <FortressBuildingCard group={groupName}onClose={handleClose} />}
    </div>
  );
};

export default Handler;
