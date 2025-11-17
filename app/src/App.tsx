import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import DataVisualizer from './components/DataVisualizer';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/page/1"
          element={
            <DataVisualizer title="Section 1" tableName="Decembrists_sec_1" type="someType" />
          }
        />

        <Route
          path="/page/2"
          element={
            <DataVisualizer title="Section 2" tableName="Addresses_sec_2" type="someType" />
          }
        />

        <Route
          path="/page/3"
          element={
            <DataVisualizer title="Section 3" tableName="Commemorative_plaques_sec_3" type="someType" />
          }
        />



        <Route
          path="/page/4"
          element={
            <DataVisualizer title="Section 4" tableName="Decembrists_sec_4" type="someType" />
          }
        />

        <Route
          path="/page/5"
          element={
            <DataVisualizer title="Section 5" tableName="Documents_sec_5" type="someType" />
          }
        />

        <Route
          path="/page/5"
          element={
            <DataVisualizer title="Section 6" tableName="Quotes_sec_6" type="someType" />
          }
        />

        {/* Универсальный маршрут на остальные страницы */}
        <Route
          path="/page/:id"
          element={
             <DataVisualizer title="Section 5" tableName="Documents_sec_5" type="someType" />
          } // можно расширить логику поиска по параметрам
        />
      </Routes>
    </Router>
  );
};

export default App;
