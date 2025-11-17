import React, { useState, useMemo } from 'react';
import './TableSlider.css';

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

const GroupTable: React.FC<{ groupName: string; rows: Row[] }> = ({ groupName, rows }) => (
  <div className="groupTableContainer">
    <h3 className="groupTitle">{groupName}</h3>
    <div className="groupTableWrapper">
      <table className="groupTable">
        <thead>
          <tr>
            <th className="groupTableCell groupTableCellBorder">Декабрист</th>
            <th className="groupTableCell groupTableCellBorder">Адреса проживания</th>
            <th className="groupTableCell">Топография по ППК</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={row.id ?? idx} className="groupTableRow">
              <td className="groupTableCell groupTableCellBorder">{row.info}</td>
              <td className="groupTableCell groupTableCellBorder">{row.address}</td>
              <td className="groupTableCell">{row.topography}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);


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

  return (
    <div className="tableSliderContainer">
      <button onClick={handleGoBack} className="goBackButton" aria-label="Go back">
        ← Go Back
      </button>

      <div className="navigationButtons">
        <button onClick={handlePrev} disabled={!canGoPrev} className="navButton" aria-label="Previous group">
          ← Prev
        </button>
        <button onClick={handleNext} disabled={!canGoNext} className="navButton" aria-label="Next group">
          Next →
        </button>
      </div>

      <div className="slidingContainer">
        <div
          className="slidingContent"
          style={{ width: `${groups.length * 100}%`, transform: `translateX(-${currentIndex * (100 / groups.length)}%)` }}
        >
          {groups.map(([groupName, groupRows]) => (
            <div key={groupName} className="groupTableContainer" style={{ width: `${100 / groups.length}%` }}>
              <GroupTable groupName={groupName} rows={groupRows} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableSlider;
