// HomePage.tsx - главная страница с заголовком и 6 кнопками
import React from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent:'center',
      height: '100vh',
      gap: '20px',
    }}>
      <h1>Заголовок</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 200px)',
        gap: '20px'
      }}>
        {buttons.map(({id, label}) => (
          <button
            key={id}
            style={{ fontSize: '1.5rem', padding: '20px', cursor: 'pointer' }}
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
