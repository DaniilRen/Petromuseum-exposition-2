import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface DataTableProps {
    data: string[][];
    headers: string[];
    loading: boolean;
    emptyMessage: string;
    activeTab?: string;
    originalData: any[];
    onDeleteRow?: (tableName: string, id: string) => Promise<void>;
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
    const [deleteConfirm, setDeleteConfirm] = useState<{ rowIndex: number; rowName: string } | null>(null);

    const handleEdit = (rowIndex: number) => {
        if (!activeTab || !originalData[rowIndex]) return;
        navigate(`/edit/${activeTab}/${rowIndex}`, { 
            state: { fullRow: originalData[rowIndex], tableName: activeTab } 
        });
    };

    const handleDeleteClick = (rowIndex: number) => {
        const row = originalData[rowIndex];
        const rowName = row.group || row.image_name || row.text || 'this row';
        setDeleteConfirm({ rowIndex, rowName });
    };

    const handleDeleteConfirm = async () => {
        if (!deleteConfirm || !activeTab || !originalData[deleteConfirm.rowIndex] || !onDeleteRow) return;
        
        try {
            const id = originalData[deleteConfirm.rowIndex]._id || originalData[deleteConfirm.rowIndex].id;
            await onDeleteRow(activeTab, id);
        } catch (error) {
            console.error('Delete failed:', error);
        } finally {
            setDeleteConfirm(null);
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
                        ╋ Добавить первую запись
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="table">
                <div className="table-header-row">
                    <button className="add-new-btn" onClick={handleAddNew}>
                        ╋ Добавить запись
                    </button>
                </div>
                <table>
                    <thead>
                        <tr>
                            {headers.map((header, index) => (
                                <th key={index}>{header}</th>
                            ))}
                            <th className="actions-header"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                           {row.map((cell, cellIndex) => {
                                const isImageNameLocked = activeTab === 'Documents_sec_5' && headers[0] === 'Image Name';
                                return (
                                    <td 
                                        key={cellIndex} 
                                        className={isImageNameLocked && cellIndex === 0 ? 'locked-cell' : ''}
                                    >
                                        {cell || '-'}
                                        {isImageNameLocked && cellIndex === 0 && (
                                            <span className="lock-icon" title="Image name cannot be changed">🔒</span>
                                        )}
                                    </td>
                                );
                            })}
                                <td className="actions-cell">
                                    <div className="action-buttons">
                                        <button 
                                            className="edit-btn"
                                            onClick={() => handleEdit(rowIndex)}
                                            title="Edit row"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                            </svg>
                                        </button>
                                        <button 
                                            className="delete-btn"
                                            onClick={() => handleDeleteClick(rowIndex)}
                                            title="Delete row"
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

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <div className="delete-modal-overlay" onClick={() => setDeleteConfirm(null)}>
                    <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="delete-modal-icon">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="#dc3545">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                        </div>
                        <h3>Удалить запись?</h3>
                        <p>Вы уверены что хотитет удалить "<strong>{deleteConfirm.rowName}</strong>"?</p>
                        <p className="delete-warning">Это действие нельзя отменить</p>
                        <div className="delete-modal-actions">
                            <button 
                                className="btn-cancel"
                                onClick={() => setDeleteConfirm(null)}
                            >
                                Отмена
                            </button>
                            <button 
                                className="btn-delete"
                                onClick={handleDeleteConfirm}
                            >
                                Удалить
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DataTable;
