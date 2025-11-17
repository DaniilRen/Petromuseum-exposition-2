import React, { useEffect, useState } from 'react';

interface DataVisualizerProps {
  title: string;
  tableName: string;
  type: string; // currently unused
}

function DataVisualizer({ title, tableName }: DataVisualizerProps) {
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

  const columns = rows.length > 0 ? Object.keys(rows[0]) : [];

  return (
    <div style={{ margin: '20px' }}>
      {/* Go Back Button */}
      <button
        onClick={() => window.history.back()}
        style={{
          cursor: 'pointer',
          fontSize: '18px',
          marginBottom: '10px',
          border: 'none',
          background: 'none',
          color: '#007bff',
        }}
        aria-label="Go Back"
        title="Go Back"
      >
        ← Back
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
}

export default DataVisualizer;
