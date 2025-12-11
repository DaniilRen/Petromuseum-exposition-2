import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TableType } from '../types';

interface DataTableProps {
    data: string[][];
    headers: string[];
    loading: boolean;
    emptyMessage: string;
    activeTab?: string; // Changed from TableType to string
    originalData: any[];
    onDeleteRow?: (tableName: string, id: string) => Promise<void>; // ✅ string, not TableType
}


const DataTable: React.FC<DataTableProps> = ({ 
    data, 
    headers, 
    loading, 
    emptyMessage, 
    activeTab,
    originalData,
    onDeleteRow 
}) => {
    const navigate = useNavigate();

    const handleEdit = (rowIndex: number) => {
        if (!activeTab || !originalData[rowIndex]) return;
        navigate(`/edit/${activeTab}/${rowIndex}`, { 
            state: { fullRow: originalData[rowIndex], tableName: activeTab } 
        });
    };

    const handleDelete = async (rowIndex: number) => {
        if (!activeTab || !originalData[rowIndex] || !onDeleteRow) return;
        
        if (!confirm(`Удалить "${originalData[rowIndex].group || originalData[rowIndex].image_name || originalData[rowIndex].text || 'this row'}"?`)) {
            return;
        }

        try {
            const id = originalData[rowIndex]._id || originalData[rowIndex].id;
            await onDeleteRow(activeTab, id);
        } catch (error) {
            console.error('Delete failed:', error);
            alert('Failed to delete row');
        }
    };

    const handleAddNew = () => {
        if (!activeTab) return;
        navigate(`/add/${activeTab}`, { state: { tableName: activeTab } });
    };

    if (loading) {
        return (
            <div className="table loading">
                <div className="loading-spinner">Загрузка...</div>
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className="table empty">
                <div className="empty-message">
                    {emptyMessage}
                    <button className="add-new-btn" onClick={handleAddNew}>
                        ➕ Добавить первую запись
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="table">
            <div className="table-header-row">
                <button className="add-new-btn" onClick={handleAddNew}>
                    ➕ Добавить запись
                </button>
            </div>
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
                                <div className="action-buttons">
                                    <button 
                                        className="edit-btn"
                                        onClick={() => handleEdit(rowIndex)}
                                        title="Редактировать"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                        </svg>
                                    </button>
                                    <button 
                                        className="delete-btn"
                                        onClick={() => handleDelete(rowIndex)}
                                        title="Удалить"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polyline points="3 6 5 6 21 6"></polyline>
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;
