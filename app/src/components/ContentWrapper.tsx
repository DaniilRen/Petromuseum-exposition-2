import React, { useEffect, useState } from 'react';
import FortressMap from './maps/FortressMap';
import CityMap from './maps/CityMap';
import VerticalSlider from './sliders/VerticalSlider';
import HorizontalSlider from './sliders/HorizontalSlider'
import ScrollPointer from './pointers/ScrollPointer'
import DocumentCard from './cards/DocumentCard';
import ArrowBack from './buttons/ArrowBack';
import './ContentWrapper.css'
import QuoteCard from './cards/QuoteCard';
import DecembristInfoCard from './cards/DecembristInfoCard';


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
				if (tableName === "Quotes_sec_6" || tableName === "Decembrists_sec_4") {
					const unique_groups = [...new Set( data.map(row => row['group']) )];
					// console.log(unique_groups)
					setRows(unique_groups);
				}
				else {
					setRows(data);
				}
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

		case "decembrists":
			return (
				<div className="slider-holder">
					<ArrowBack />
					<ScrollPointer direction="horizontal" />
					<HorizontalSlider>
						{rows.map((group_name) => (
							<DecembristInfoCard group={group_name} />
						))}
					</HorizontalSlider>
				</div>
			)

		case "documents":
			return (
				<div className='slider-holder'>
					<ArrowBack />
					<ScrollPointer direction="vertical" />
					<VerticalSlider>
						{rows.map((row) => (
							<DocumentCard info={row.info} prefix={row.image_name} />
						))}
					</VerticalSlider>
				</div>
			)

		case "quotes":
			return (
				<div className="slider-holder">
					<ArrowBack />
					<ScrollPointer direction="horizontal" />
					<HorizontalSlider>
						{rows.map((group_name) => (
							<QuoteCard group={group_name} />
						))}
					</HorizontalSlider>
				</div>
			)

		default:
			return <div />;
	}
}

export default ContentWrapper;
