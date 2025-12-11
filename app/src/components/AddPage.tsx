import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBack from './buttons/ArrowBack';
import './AddPage.css';


const AddPage: React.FC = () => {
    const navigate = useNavigate();
    const { tableName } = useParams<{ tableName: string }>();
    
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setMessage('');
    };

    const handleSubmit = async () => {
        if (!tableName) {
            setMessage('Invalid table name');
            return;
        }

        try {
            setLoading(true);
            await window.electronAPI.addRow(tableName, formData);
            setMessage('Row added successfully!');
            setTimeout(() => {
                navigate(-1);
            }, 1500);
        } catch (error: any) {
            console.error('Add failed:', error);
            setMessage(`Failed to add row: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const fieldConfig = tableName === 'Decembrists_sec_4' ? [
        { key: 'group', label: 'Group *', required: true },
        { key: 'info', label: 'Info *', required: true },
        { key: 'address', label: 'Address *', required: true },
        { key: 'topography', label: 'Topography *', required: true }
    ] : tableName === 'Documents_sec_5' ? [
        { key: 'image_name', label: 'Image Name *', required: true, readonly: false }, // Can set on add
        { key: 'info', label: 'Info *', required: true }
    ] : [
        { key: 'group', label: 'Group *', required: true },
        { key: 'text', label: 'Text *', required: true },
        { key: 'author', label: 'Author *', required: true }
    ];


    const hasRequiredFields = fieldConfig.every(field => 
        !field.required || (formData[field.key]?.trim() && formData[field.key]?.trim().length > 0)
    );

    return (
        <div className="add-container">
            <div className="add-header">
                <ArrowBack />
                <h1>Добавить запись в таблицу {tableName?.replace('_sec_', ' ')}</h1>
            </div>

            <div className="add-content">
                <div className="add-form">
                    {fieldConfig.map((field) => {
                        const isReadOnly = tableName === 'Documents_sec_5' && field.key === 'image_name' && field.readonly;
                        
                        return (
                            <div key={field.key} className="form-group">
                                <label>{field.label}</label>
                                <input
                                    type="text"
                                    value={formData[field.key] || ''}
                                    onChange={(e) => !isReadOnly && handleInputChange(field.key, e.target.value)}
                                    className={`form-input ${!formData[field.key]?.trim() && field.required ? 'error' : ''} ${isReadOnly ? 'readonly' : ''}`}
                                    placeholder={isReadOnly ? 'Image name cannot be changed' : field.required ? 'Required' : 'Optional'}
                                    readOnly={isReadOnly}
                                />
                            </div>
                        );
                    })}
                </div>

                <div className="add-actions">
                    <button 
                        className={`submit-btn ${hasRequiredFields ? 'ready' : 'disabled'}`}
                        onClick={handleSubmit}
                        disabled={loading || !hasRequiredFields}
                    >
                        {loading ? 'Добавление...' : 'Добавить запись'}
                    </button>
                    {message && (
                        <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
                            {message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddPage;
