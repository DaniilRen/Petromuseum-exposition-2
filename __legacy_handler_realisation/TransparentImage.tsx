import React, { useRef, useEffect, useState } from 'react';
import { Resource } from './Handler';
import './TransparentImage.css'
import { log } from 'console';

interface TransparentImageProps {
  resource: Resource;
	handleClick: () => void;
}

const TransparentImage: React.FC<TransparentImageProps> = ({ resource, handleClick }) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const imgRef = useRef<HTMLImageElement>(null);
	const [isHovered, setIsHovered] = useState(false);

	useEffect(() => {
		const canvas = canvasRef.current;
		const img = imgRef.current;
		if (!canvas || !img) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		img.onload = () => {
			canvas.width = img.width;
			canvas.height = img.height;
			ctx.drawImage(img, 0, 0);
		};

		canvas.addEventListener('mousemove', (e) => {
			const rect = canvas.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			const pixel = ctx.getImageData(x, y, 1, 1).data;
			if (pixel[1] > 0) {
				setIsHovered(true);
			} else {
				setIsHovered(false);
			}
		});

		canvas.addEventListener('mouseleave', () => {
			setIsHovered(false);
		});

		canvas.addEventListener('click', (e) => {
			const rect = canvas.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			const pixel = ctx.getImageData(x, y, 1, 1).data;
			if (pixel[1] > 0) {
				handleClick();
			}
		});

		return () => {
			canvas.removeEventListener('mousemove', () => {});
			canvas.removeEventListener('mouseleave', () => {});
			canvas.removeEventListener('click', handleClick);
		};
	}, [handleClick]);


	return (
	<div style={{ top: resource.y, left: resource.x, position: 'absolute', userSelect: 'none'}}>
			<img 
			ref={imgRef} 
			src={`${process.env.PUBLIC_URL}/images/maps/resources/${resource.path}`} 
			style={{ 
				display: 'none',
				top: resource.y,
				left: resource.x,
			}} 
			className="resource"
			alt={resource.path}
			/>
			<canvas className={`canvas ${isHovered ? 'hovered-canvas' : ''}`} ref={canvasRef}/>
		</div>
	);
};

export default TransparentImage;
