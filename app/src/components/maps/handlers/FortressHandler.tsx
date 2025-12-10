import React, { useState } from 'react';
import FortressBuildingCard from '../../cards/FortressBuildingCard';
import './FortressHandler.css';
import toggleElementVisibility from '../../../utils';


interface FortressHandlerProps {
	groupName: string;
	resource: string;
	left: number;
	top: number;
	zIndex: number;
}

const FortressHandler: React.FC<FortressHandlerProps> = ({ groupName, resource, left, top, zIndex }) => {
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

  let handlerClassname = "handler-holder"
  if (groupName.includes("ворота")) {
    handlerClassname += " gates"
  }

  return (
    <div className={handlerClassname} style={{ top: top, left: left, zIndex: zIndex }}>
			{isVisible && <FortressBuildingCard group={groupName} onClose={handleClose} />}
      <img
        onClick={handleClick}
        className="handler-resource"
        src={resource}
        alt={resource}
        style={{ top: top, left: left }}
      />
    </div>
  );
};

export default FortressHandler;
