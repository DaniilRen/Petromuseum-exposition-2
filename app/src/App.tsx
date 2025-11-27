import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ContentWrapper from './components/ContentWrapper';
import './global.css';

const App: React.FC = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route
					path="/page/1"
					element={
						<ContentWrapper tableName="Decembrists_sec_1" content_type="fortress-map" />
					}
				/>
				<Route
					path="/page/2"
					element={
						<ContentWrapper tableName="Addresses_sec_2" content_type="city-map" />
					}
				/>
				<Route
					path="/page/3"
					element={
						<ContentWrapper tableName="Commemorative_plaques_sec_3" content_type="city-map" />
					}
				/>
				<Route
					path="/page/4"
					element={
						<ContentWrapper tableName="Decembrists_sec_4" content_type="decembrists" />
					}
				/>
				<Route
					path="/page/5"
					element={
						<ContentWrapper tableName="Documents_sec_5" content_type="documents" />
					}
				/>
				<Route
					path="/page/6"
					element={
						<ContentWrapper tableName="Quotes_sec_6" content_type="quotes" />
					}
				/>
			</Routes>
		</Router>
	);
};

export default App;
