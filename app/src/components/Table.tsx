import React from 'react';

interface TableComponentProps {
  title: string;
  rows: any[];
}

const Table: React.FC<TableComponentProps> = ({ title, rows }) => {
  const columns = rows.length > 0 ? Object.keys(rows[0]) : [];

  return (
    <div style={{ margin: '20px' }}>
      {/* Go Back Button */}
      <button
        onClick={() => window.history.back()}
        style={{
          marginBottom: '1rem',
          cursor: 'pointer',
          fontSize: '16px',
          padding: '8px 16px',
          borderRadius: 4,
          border: '1px solid #ccc',
          backgroundColor: '#f9f9f9',
          alignSelf: 'flex-start',
        }}
        aria-label="Go back"
      >
        ← Go Back
      </button>

      <h2 style={{ textAlign: 'center' }}>{title}</h2>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col} style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={row.id || idx}>
              {columns.map((col) => (
                <td key={col} style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {String(row[col] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
