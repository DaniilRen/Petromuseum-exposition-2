import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ArrowBack from './buttons/ArrowBack';
import './EditPage.css';

type TableType = 'Decembrists_sec_4' | 'Documents_sec_5' | 'Quotes_sec_6';

const EditPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { tableName } = useParams<{ tableName: string }>();
  
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [originalData, setOriginalData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const state = location.state as { fullRow?: any; tableName?: TableType };
    
    if (state?.fullRow && tableName) {
      console.log('EditPage received data:', state.fullRow); 
      const rowData = { ...state.fullRow };
      setFormData(rowData);
      setOriginalData(rowData);
    } else {
      console.warn('No row data received:', state);
      navigate(-1); // Go back if no data
    }
  }, [location.state, tableName, navigate]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: Record<string, string>) => ({ ...prev, [field]: value }));
    setMessage('');
  };

  const hasChanges = JSON.stringify(formData) !== JSON.stringify(originalData);

    const handleSubmit = async () => {
        if (!hasChanges || !tableName) {
            setMessage('No changes detected');
            return;
        }

        // Preserve ID for NeDB (_id or id)
        const rowToUpdate = { 
            ...formData,
            id: formData.id || formData._id,  // Keep original ID
            _id: formData._id || formData.id  // NeDB format
        };

        console.log('Sending for update:', rowToUpdate); 

        try {
            setLoading(true);
            await window.electronAPI.updateRow(tableName, rowToUpdate);
            setMessage('Row updated successfully!');
            setOriginalData(formData);
        } catch (error: any) {
            console.error('Update failed:', error);
            setMessage(`Update failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };


  const fieldConfig = tableName === 'Decembrists_sec_4' ? [
    { key: 'group', label: 'Group' },
    { key: 'info', label: 'Info' },
    { key: 'address', label: 'Address' },
    { key: 'topography', label: 'Topography' }
  ] : tableName === 'Documents_sec_5' ? [
    { key: 'image_name', label: 'Image Name' },
    { key: 'info', label: 'Info' }
  ] : [
    { key: 'group', label: 'Group' },
    { key: 'text', label: 'Text' },
    { key: 'author', label: 'Author' }
  ];

  return (
    <div className="edit-container">
      <div className="edit-header">
        <ArrowBack />
        <h1>Редактирование таблицы {tableName}</h1>
      </div>

      <div className="edit-content">
        <div className="edit-form">
          
         {fieldConfig.map((field) => {
            const isReadOnly = tableName === 'Documents_sec_5' && field.key === 'image_name';
            
            return (
              <div key={field.key} className="form-group">
                <label>{field.label}:</label>
                <input
                  type="text"
                  value={formData[field.key] || ''}
                  onChange={(e) => !isReadOnly && handleInputChange(field.key, e.target.value)}
                  className={`form-input ${isReadOnly ? 'readonly' : ''}`}
                  readOnly={isReadOnly}
                  placeholder={isReadOnly ? 'Image name cannot be changed' : ''}
                />
              </div>
            );
        })}
                </div>

        <div className="edit-actions">
          <button 
            className={`submit-btn ${hasChanges ? 'has-changes' : 'no-changes'}`}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Saving...' : hasChanges ? 'Update Row' : 'No Changes'}
          </button>
          {message && (
            <div className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditPage;
