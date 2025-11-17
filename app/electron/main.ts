import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { db } from '../src/db.ts';
import { fileURLToPath } from 'url';

function createWindow() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // preload script for contextBridge APIs
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadURL('http://localhost:3000'); // React dev server URL
  // win.loadFile('build/index.html'); // Uncomment for production build

  win.webContents.openDevTools();
}

app.whenReady().then(async () => {
  await db.loadDataIfEmpty(); // Load initial data if DB empty
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC handlers for renderer process to invoke DB operations
ipcMain.handle('get-rows', async (_event, tableName: string) => {
  // @ts-ignore
  return db[tableName].find({});
});

ipcMain.handle('add-row', async (_event, tableName: string, row: any) => {
  // @ts-ignore
  return db[tableName].insert(row);
});

ipcMain.handle('update-row', async (_event, tableName: string, row: any) => {
  if (!row.id) throw new Error('id is required for update');
  // @ts-ignore
  return db.updateRow(db[tableName], row);
});

ipcMain.handle('delete-row', async (_event, tableName: string, id: string) => {
  // @ts-ignore
  return db.deleteRow(db[tableName], id);
});
