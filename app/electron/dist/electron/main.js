import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { db } from '../src/db';
import { fileURLToPath } from 'url';
import { readdir } from 'fs/promises';
function createWindow() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const win = new BrowserWindow({
        width: 1280,
        height: 1024,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });
    // win.loadURL('http://localhost:3000'); 
    win.loadFile('build/index.html');
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
ipcMain.handle('get-rows', async (_event, tableName) => {
    // @ts-ignore
    return db[tableName].find({});
});
ipcMain.handle('add-row', async (_event, tableName, row) => {
    // @ts-ignore
    return db[tableName].insert(row);
});
ipcMain.handle('update-row', async (_event, tableName, row) => {
    if (!row.id)
        throw new Error('id is required for update');
    // @ts-ignore
    return db.updateRow(db[tableName], row);
});
ipcMain.handle('delete-row', async (_event, tableName, id) => {
    // @ts-ignore
    return db.deleteRow(db[tableName], id);
});
ipcMain.handle('get-history-document-images', async (_event, prefix) => {
    const __filename = fileURLToPath(import.meta.url);
    const dirname = path.dirname(__filename);
    const dirPath = path.join(dirname, '..', 'public', 'images', 'history_documents');
    try {
        const files = await readdir(dirPath);
        return files.filter(file => file.startsWith(prefix + '_'));
    }
    catch (err) {
        console.error('Error reading directory:', err);
        return [];
    }
});
