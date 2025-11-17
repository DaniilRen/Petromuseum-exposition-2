declare global {
  interface Window {
    electronAPI: {
      getRows: (tableName: string) => Promise<any[]>;
      addRow: (tableName: string, row: any) => Promise<void>;
      updateRow: (tableName: string, row: any) => Promise<void>;
      deleteRow: (tableName: string, id: string) => Promise<void>;
    };
  }
}
export {};
