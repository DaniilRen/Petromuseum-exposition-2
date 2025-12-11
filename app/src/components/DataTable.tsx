import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TableType } from '../types';

interface DataTableProps {
    data: string[][];
    headers: string[];
    loading: boolean;
    emptyMessage: string;
    activeTab?: TableType;
    originalData: any[]; // Add original data for edit
}

const DataTable: React.FC<DataTableProps> = ({ 
    data, 
    headers, 
    loading, 
    emptyMessage, 
    activeTab,
    originalData 
}) => {
    const navigate = useNavigate();

    const handleEdit = (rowIndex: number) => {
        if (!activeTab || !originalData[rowIndex]) {
            console.error('Missing table name or row data');
            return;
        }
        navigate(`/edit/${activeTab}/${rowIndex}`, { 
            state: { 
                fullRow: originalData[rowIndex],
                tableName: activeTab 
            } 
        });
    };

    if (loading) {
        return (
            <div className="table loading">
                <div className="loading-spinner">Loading...</div>
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className="table empty">
                <div className="empty-message">{emptyMessage}</div>
            </div>
        );
    }

    return (
        <div className="table">
            <table>
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th className="actions-header">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex}>{cell || '-'}</td>
                            ))}
                            <td className="actions-cell">
                                <button 
                                    className="edit-btn"
                                    onClick={() => handleEdit(rowIndex)}
                                    title="Edit row"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;
