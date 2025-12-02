import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import DecembristTopographyCard from './DecembristTopographyCard';
import CloseButton from '../buttons/CloseButton';
import './FortressBuildingCard.css';

interface FortressBuildingCardProps {
  group: string;
  onClose: () => void;
}

const FortressBuildingCard: React.FC<FortressBuildingCardProps> = ({ group, onClose }) => {
  const [decembrists, setDecembrists] = useState<any[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      try {
        const decembrists = await window.electronAPI.getRows("Decembrists_sec_1");
        const filtered_decembrists: Object[] = decembrists.filter(decembrist => decembrist.group === group);
        setDecembrists(filtered_decembrists);
      } catch (err) {
        console.error('Error fetching data:', err);
        setDecembrists([]);
      }
    })();
  }, [group]);

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
      <div className="building-card" key={group} ref={modalRef}>
        <CloseButton onClick={onClose} />
        <h2 className="group-name">{group}</h2>
        <div className="hline"></div>
        <p className="desc">Декабристы, которые здесь находились</p>
        <div className="decembrists-holder">
          {decembrists.map(decembrist => (
            <DecembristTopographyCard key={decembrist['name']} name={decembrist['name']} info={decembrist['info']} />
          ))}
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')!
  );
};

export default FortressBuildingCard;
