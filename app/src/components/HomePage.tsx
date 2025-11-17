import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const buttons = [
    { id: 1, label: 'Кнопка 1' },
    { id: 2, label: 'Кнопка 2' },
    { id: 3, label: 'Кнопка 3' },
    { id: 4, label: 'Кнопка 4' },
    { id: 5, label: 'Кнопка 5' },
    { id: 6, label: 'Кнопка 6' },
  ];

  return (
    <div className="container">
      <h1 className="title">Заголовок</h1>
      <div className="buttonsGrid">
        {buttons.map(({ id, label }) => (
          <button
            key={id}
            className="button"
            data-btn={id}
            onClick={() => navigate(`/page/${id}`)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
