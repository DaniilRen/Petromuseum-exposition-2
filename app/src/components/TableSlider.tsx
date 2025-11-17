import React, { useState, useMemo } from 'react';

interface Row {
  id: string;
  group: string;
  info: string;
  address: string;
  topography: string;
  [key: string]: any;
}

interface TableSliderProps {
  rows: Row[];
}

const GroupTable: React.FC<{ groupName: string; rows: Row[] }> = ({ groupName, rows }) => {
  return (
    <div style={{ width: '100%', maxWidth: 600, margin: '0 auto' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>{groupName}</h3>
      <div style={{ maxHeight: 300, overflowY: 'auto', border: '1px solid #ccc', borderRadius: 4 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={row.id ?? `${row.group}-${idx}`}  style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '8px', borderRight: '1px solid #eee' }}>{row.info}</td>
                <td style={{ padding: '8px', borderRight: '1px solid #eee' }}>{row.address}</td>
                <td style={{ padding: '8px' }}>{row.topography}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TableSlider: React.FC<TableSliderProps> = ({ rows }) => {
  const groups = useMemo(() => {
    const map = new Map<string, Row[]>();
    rows.forEach((row) => {
      if (!map.has(row.group)) map.set(row.group, []);
      map.get(row.group)!.push(row);
    });
    return Array.from(map.entries());
  }, [rows]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < groups.length - 1;

  const handlePrev = () => {
    if (canGoPrev) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (canGoNext) setCurrentIndex(currentIndex + 1);
  };

  const handleGoBack = () => {
    window.history.back();
  };

  if (groups.length === 0) return <div>No data</div>;

  const [groupName, groupRows] = groups[currentIndex];

  return (
    <div style={{ maxWidth: 700, margin: '0 auto' }}>
      {/* Go Back Button */}
      <button
        onClick={() => window.history.back()}
        style={{
          marginBottom: '1rem',
          cursor: 'pointer',
          fontSize: '16px',
          padding: '8px 16px',
          borderRadius: 4,
          border: '1px solid #ccc',
          backgroundColor: '#f9f9f9',
          alignSelf: 'flex-start',
        }}
        aria-label="Go back"
      >
        ← Go Back
      </button>

      {/* Navigation Arrows */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <button onClick={handlePrev} disabled={!canGoPrev} aria-label="Previous group">
          ← Prev
        </button>
        <button onClick={handleNext} disabled={!canGoNext} aria-label="Next group">
          Next →
        </button>
      </div>

      <GroupTable groupName={groupName} rows={groupRows} />
    </div>
  );
};

export default TableSlider;
