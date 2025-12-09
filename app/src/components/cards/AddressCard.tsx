import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './AddressCard.css'
import CloseButton from '../buttons/CloseButton';


interface AddressCardProps {
	address: string;
	name: string;
	left: number;
	top: number;
	onClose: () => void;
}

const AddressCard: React.FC<AddressCardProps> = ({ address, name, left, top, onClose }) => {
	const modalRef = useRef<HTMLDivElement>(null);

		// Close modal on outside click
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
			<div className="address-card" key={address} ref={modalRef} style={{ left: left, top: top }}>
				<CloseButton onClick={onClose} />
				<p className="name">{address}</p>
				<p className='info'>{name}</p>
			</div>
		</div>,
		document.getElementById('modal-root')!
	);
};

export default AddressCard;
