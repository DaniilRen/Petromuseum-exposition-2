import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { db } from '../src/db.ts';
import { fileURLToPath } from 'url';
import { readdir } from 'fs/promises';

function createWindow() {

	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);


	const win = new BrowserWindow({
		width: 1280,
		height: 1024,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'), // preload script for contextBridge API
			contextIsolation: true,
			nodeIntegration: false,
		},
	});

	win.loadURL('http://localhost:3000'); 
	// win.loadURL(`file://${__dirname}/../build/index.html`);

	// win.webContents.openDevTools();
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

ipcMain.handle('get-history-document-images', async (_event, prefix: string) => {
	const __filename = fileURLToPath(import.meta.url);
	const dirname = path.dirname(__filename)
	const dirPath = path.join(dirname, '..', 'public', 'images', 'history_documents');
	try {
		const files = await readdir(dirPath);
		return files.filter(file => file.startsWith(prefix+'_'));
	} catch (err) {
		console.error('Error reading directory:', err);
		return [];
	}
});


// name, [left(X), top(Y), z-index to control overlapping items]
const groupName_ImageName_Coordinates: Record<string, [string, number[], number]> = {
  Kronverkskaya_kurtina: ['Кронверкская куртина', [665, 265], 1],
  Nikolskaya_kurtina: ['Никольская куртина', [370, 327], 1],
  Ekaterininskaya_kurtina: ['Екатерининская куртина', [498, 660], 1],
  Nevskaya_kurtina: ['Невская куртина', [748, 480], 1],
  Petrovskaya_kurtina: ['Петровская куртина', [894, 278], 1],
  Vasilievskaya_kurtina: ['Васильевская куртина', [389, 518], 1],

  Golovkin_bastion: ['Головкин бастион', [531, 195], 1],
  Gosudarev_bastion: ['Государев бастион', [906, 417], 1],
  Menshikov_bastion: ['Меншиков бастион', [837, 185], 1],
  Narishkin_bastion: ['Нарышкин бастион', [663, 620], 1],
  Trubeckoy_bastion: ['Трубецкой бастион', [395, 636], 1],
  Zotov_bastion: ['Зотов бастион', [292, 406], 1],

  Nevskie_gates: ['Невские ворота', [-1000, -1000], 1],
  Petrovskie_gates: ['Петровские ворота', [-1000, -1000], 1],

  Gauptvahta: ['Гауптвахта', [787, 513], 2],
  Komendant_house: ['Комендантский дом', [635, 509], 1],
  Ravelin: ['Секретный дом Алексеевского равелина', [285, 580], 1],
};

ipcMain.handle('get-resources', async () => {
	const __filename = fileURLToPath(import.meta.url);
	const dirnameMain = path.dirname(__filename);
	const dirPath = path.join(dirnameMain, '..', 'public', 'images', 'maps', 'resources');

	const resources: Array<{ name: string; path: string; x: number; y: number, zIndex: number }> = [];

	async function readDirRecursive(dir: string) {
		const entries = await readdir(dir, { withFileTypes: true });
		for (const entry of entries) {
			const fullPath = path.join(dir, entry.name);
			if (entry.isDirectory()) {
				await readDirRecursive(fullPath);
			} else if (/\.(png|jpe?g|svg)$/i.test(entry.name)) {
				const fileName = path.basename(entry.name, path.extname(entry.name));
				const recordEntry = groupName_ImageName_Coordinates[fileName];
				let displayName = fileName;
				let coordinates = [0, 0];
				let zIndex = 1;
				if (recordEntry) {
					displayName = recordEntry[0]; // name
					coordinates = recordEntry[1]; // [x, y]
					zIndex = recordEntry[2]; // zIndex for overlapping
				}
				const relativePath = path.relative(dirPath, fullPath).replace(/\\/g, '/');
				resources.push({
					name: displayName,
					path: relativePath,
					x: coordinates[0],
					y: coordinates[1],
					zIndex: zIndex
				});
			}
		}
	}

  try {
    await readDirRecursive(dirPath);
    return resources;
  } catch (err) {
    console.error('Error reading directory:', err);
    return [];
  }
});
