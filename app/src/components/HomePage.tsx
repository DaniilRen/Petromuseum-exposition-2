import React, { useState, useEffect, useCallback } from 'react';
import TableTabs from './TableTabs';
import DataTable from './DataTable';
import './HomePage.css';
import type { TableType, TabConfig } from '../types';

const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TableType>('Decembrists_sec_4');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async (tableName: TableType) => {
    try {
      setLoading(true);
      const result = await window.electronAPI.getRows(tableName);
      setData(result || []);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab, fetchData]);

  const tabConfig: readonly TabConfig[] = [
    {
      key: 'Decembrists_sec_4',
      label: 'Decembrists Sec 4',
      headers: ['Group', 'Info', 'Address', 'Topography'] as const,
    },
    {
      key: 'Documents_sec_5',
      label: 'Documents Sec 5',
      headers: ['Image Name', 'Info'] as const,
    },
    {
      key: 'Quotes_sec_6',
      label: 'Quotes Sec 6',
      headers: ['Group', 'Text', 'Author'] as const,
    },
  ];

  const currentConfig = tabConfig.find((config) => config.key === activeTab)!;

  const displayData = data.map((row) => {
    if (activeTab === 'Decembrists_sec_4') {
      return [row.group, row.info, row.address, row.topography];
    } else if (activeTab === 'Documents_sec_5') {
      return [row.image_name, row.info];
    } else {
      return [row.group, row.text, row.author];
    }
  });

  const handleDeleteRow = async (tableName: string, id: string): Promise<void> => {
    await window.electronAPI.deleteRow(tableName, id);
    await fetchData(tableName as TableType);
  };

  return (
    <div className="container">
      <TableTabs
        // @ts-ignore
        tabs={tabConfig}
        activeTab={activeTab}
        // @ts-ignore
        onTabChange={setActiveTab}
      />
    <DataTable
        data={displayData}
        // @ts-ignore
        headers={currentConfig.headers}
        loading={loading}
        emptyMessage={`No data in ${activeTab}`}
        activeTab={activeTab}
        originalData={data}
        onDeleteRow={handleDeleteRow} // Add this
    />
    </div>
  );
};

export default HomePage;
