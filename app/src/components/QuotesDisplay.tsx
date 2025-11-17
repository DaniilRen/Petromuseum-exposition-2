import React from 'react';

interface Quote {
  quote: string;
  author: string;
}

interface QuotesTable {
  title: string;
  rows: Quote[];
}

interface QuotesDisplayProps {
  tableTitle: string;
  tables: QuotesTable[];
}

const QuotesDisplay: React.FC<QuotesDisplayProps> = ({ tableTitle, tables }) => {
  const table = tables.find(t => t.title === tableTitle);
  if (!table) return <div>Тема цитат не найдена</div>;

  return (
    <div style={{ maxWidth: 700, margin: '20px auto', fontFamily: 'Georgia, serif' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>{table.title}</h2>
      {table.rows.map((quoteItem, index) => (
        <blockquote 
          key={index} 
          style={{ 
            fontStyle: 'italic', 
            borderLeft: '4px solid #aaa', 
            margin: '20px 0', 
            paddingLeft: '15px',
            color: '#555' 
          }}
        >
          <p style={{ fontSize: '1.2rem' }}>"{quoteItem.quote}"</p>
          <footer style={{ textAlign: 'right', marginTop: '10px', fontWeight: 'bold' }}>
            — {quoteItem.author}
          </footer>
        </blockquote>
      ))}
    </div>
  );
};

export default QuotesDisplay;
