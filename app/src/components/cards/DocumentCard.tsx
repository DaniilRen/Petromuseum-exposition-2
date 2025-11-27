import React, { useEffect, useState } from 'react';
import './DocumentCard.css'


interface DocumentCardProps {
  prefix: string;
	info: string
}

const DocumentCard: React.FC<DocumentCardProps> = ({ prefix, info }) => {
	const [images, setImages] = useState<string[]>([]);

	useEffect(() => {
		(async () => {
			try {
				const imageFiles = await window.electronAPI.getHistoryDocumentImages(prefix);
				setImages(imageFiles);
			} catch (err) {
				console.error('Error fetching images:', err);
				setImages([]);
			}
		})();
	}, [prefix]);


	return (
		<div className="card" key={prefix}>
			<div key={images[0]} className="img-holder">
				<img src={'/images/history_documents/'+images[0]} alt={images[0]} />
			</div>
			<div className="text-holder">
				<p>{info}</p>
			</div>
		</div>
	);
};

export default DocumentCard;
