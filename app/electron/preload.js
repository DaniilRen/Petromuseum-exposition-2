const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getRows: (tableName) => ipcRenderer.invoke('get-rows', tableName),
  addRow: (tableName, row) => ipcRenderer.invoke('add-row', tableName, row),
  updateRow: (tableName, row) => ipcRenderer.invoke('update-row', tableName, row),
  deleteRow: (tableName, id) => ipcRenderer.invoke('delete-row', tableName, id),
	getPlaquesImages: () => ipcRenderer.invoke('get-plaques-images', prefix),
	getHistoryDocumentImages: (prefix) => ipcRenderer.invoke('get-history-document-images', prefix),
	getResources: (mapType) => ipcRenderer.invoke('get-resources', mapType),
});
