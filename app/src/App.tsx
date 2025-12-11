import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import EditPage from './components/EditPage';
import AddPage from './components/AddPage';
import './global.css';


const App: React.FC = () => {
	return (
		<HashRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/edit/:tableName/:rowIndex" element={<EditPage />} />
				<Route path="/add/:tableName" element={<AddPage />} />
			</Routes>
		</HashRouter>
	);
};

export default App;
