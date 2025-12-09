import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import CloseButton from '../buttons/CloseButton';
import './PlaqueCard.css';

interface PlaqueCardProps {
  imageSrc: string;
	info: string;
  onClose: () => void;
}

const PlaqueCard: React.FC<PlaqueCardProps> = ({ imageSrc, info, onClose }) => {
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
				onClose();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [onClose]);

	return createPortal(
		<div className="fade-wrapper">
			<div className="plaque-card" key={info} ref={modalRef}>
				<CloseButton onClick={onClose} />
				<div key={imageSrc} className="plaque-img-holder">
					<img src={imageSrc} alt={imageSrc} />
				</div>
				<div className="plaque-text-holder">
					<p>{info}</p>
				</div>
			</div>
		</div>,
		document.getElementById('modal-root')!
	);
};

export default PlaqueCard;
