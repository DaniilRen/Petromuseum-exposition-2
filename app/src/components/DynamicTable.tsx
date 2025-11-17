import React from 'react';

interface TableProps {
  title: string;
  columns: string[];
  rows: (string | number)[][];
}

const DynamicTable: React.FC<TableProps> = ({ title, columns, rows }) => (
  <div style={{ maxWidth: 900, margin: 'auto' }}>
    <h2>{title}</h2>
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead style={{ backgroundColor: '#eee' }}>
        <tr>
          {columns.map((col, i) => (
            <th key={i} style={{ border: '1px solid #ccc', padding: 8 }}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index} style={{ borderBottom: '1px solid #ccc' }}>
            {row.map((cell, i) => (
              <td key={i} style={{ border: '1px solid #ccc', padding: 8 }}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default DynamicTable;