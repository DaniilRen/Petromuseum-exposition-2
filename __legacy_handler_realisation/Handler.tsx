import React, { useState } from 'react';
import FortressBuildingCard from '../../cards/FortressBuildingCard';
import TransparentImage from './TransparentImage';
import toggleElementVisibility from '../../../utils';


export interface Resource {
	name: string,
	path: string,
	x: number,
	y: number,
}

interface HandlerProps {
	groupName: string,
	resource: Resource
}

const Handler: React.FC<HandlerProps> = ({ groupName, resource }) => {
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
    <div>
			<TransparentImage resource={resource} handleClick={handleClick} />
      {isVisible && <FortressBuildingCard group={groupName} onClose={handleClose} />}
    </div>
  );
};

export default Handler;
