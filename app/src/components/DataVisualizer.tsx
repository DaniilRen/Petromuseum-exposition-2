import React, { useEffect, useState } from 'react';
import Table from './Table';
import TableSlider from './TableSlider';

interface DataVisualizerWrapperProps {
  title: string;
  tableName: string;
  type: string; // e.g., 'table' or others
}

function DataVisualizerWrapper({ title, tableName, type }: DataVisualizerWrapperProps) {
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

  if (type === 'table') {
    return <Table title={title} rows={rows} />;
  }
  if (type === 'slider') {
    return <TableSlider rows={rows}/>
  }

  // For all other types, return an empty div
  return <div />;
}

export default DataVisualizerWrapper;
