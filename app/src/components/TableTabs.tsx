import React from 'react';

interface TabConfig {
    key: string;
    label: string;
    headers: string[];
}

interface TableTabsProps {
    tabs: TabConfig[];
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const TableTabs: React.FC<TableTabsProps> = ({ tabs, activeTab, onTabChange }) => {
    return (
        <div className="table-header">
            {tabs.map((tab) => (
                <button
                    key={tab.key}
                    className={`tab-button ${activeTab === tab.key ? 'active' : ''}`}
                    onClick={() => onTabChange(tab.key)}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

export default TableTabs;
