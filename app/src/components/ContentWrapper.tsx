import React, { useEffect, useState } from 'react';
import Table from './Table';
import FortressMap from './maps/FortressMap';
import CityMap from './maps/CityMap';
import VerticalSlider from './sliders/VerticalSlider';
import DocumentCard from './cards/DocumentCard';
import ArrowBack from './buttons/ArrowBack';
import './ContentWrapper.css'


interface WrapperProps {
  tableName: string;
  content_type: string; // e.g., 'table' or others
}

const ContentWrapper: React.FC<WrapperProps> = ({ tableName, content_type }) => {
	const [rows, setRows] = useState<any[]>([]);

	useEffect(() => {
		(async () => {
			try {
				const data = await window.electronAPI.getRows(tableName);
				setRows(data);
			} catch (err) {
				console.error('Error fetching data:', err);
			}
		})();
	}, [tableName]);

	switch (content_type) {
		case "fortress-map":
			return <FortressMap />
		case "city-map":
			return <CityMap />
		case "vertical-slider":
			return (
				<div className='slider-holder'>
					<ArrowBack />
					<VerticalSlider>
						{rows.map((row) => (
							<DocumentCard info={row.info} prefix={row.image_name} />
						))}
					</VerticalSlider>
				</div>
			)
		case "table":
			return <Table title="Table name not set" rows={rows} />;
		default:
			return <div />;
	}
}

export default ContentWrapper;
