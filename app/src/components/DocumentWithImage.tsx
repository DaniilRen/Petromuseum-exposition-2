import React from 'react';

interface DocumentWithImageProps {
  name: string;
  imageId: number; // id изображения для построения пути
}

const DocumentWithImage: React.FC<DocumentWithImageProps> = ({ name, imageId }) => {
  const imagePath = `/images/history_documents/history_document_${imageId}.jpg`;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        padding: '15px',
        margin: '15px auto',
        maxWidth: '600px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        backgroundColor: '#fafafa',
        transition: 'transform 0.3s, box-shadow 0.3s',
        cursor: 'pointer',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.03)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
      }}
    >
      <img
        src={imagePath}
        alt={name}
        style={{
          width: 120,
          height: 160,
          borderRadius: '6px',
          objectFit: 'cover',
          flexShrink: 0,
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        }}
        loading="lazy"
      />
      <div style={{ fontSize: '1.3rem', fontWeight: '600', color: '#333' }}>
        {name}
      </div>
    </div>
  );
};

export default DocumentWithImage;
