import path from 'path';
import Datastore from 'nedb-promises';
import * as fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { app } from 'electron';


// Interfaces for all tables:
interface Decembrist1 {
  id?: string;
	group: string;
  name: string;
  info: string;
}

interface Address {
  id?: string;
  group: string;
  address: string;
  info: string;
}

interface Plaque {
  id?: string;
  image_name: string;
  info: string;
}

interface Decembrist4 {
  id?: string;
  group: string;
  info: string;
  address: string;
  topography: string;
}

interface Document5 {
  id?: string;
  image_name: string;
  info: string;
}

interface Quote6 {
  id?: string;
  group: string;
  text: string;
  author: string;
}

export class AppDatabase {
	Decembrists_sec_1: Datastore<Decembrist1>;
	Addresses_sec_2: Datastore<Address>;
	Commemorative_plaques_sec_3: Datastore<Plaque>;
	Decembrists_sec_4: Datastore<Decembrist4>;
	Documents_sec_5: Datastore<Document5>;
	Quotes_sec_6: Datastore<Quote6>;

	constructor() {
		const __filename = fileURLToPath(import.meta.url);
		const __dirname = path.dirname(__filename);
		// In packaged app, use app.getPath('userData') for storage
		const table_dir = (app && app.isPackaged)
			? path.join(app.getPath('userData'), 'storage')
			: path.join(__dirname, '..', 'storage');

		this.Decembrists_sec_1 = Datastore.create({
			filename: path.join(table_dir, 'Decembrists_sec_1.db'),
			autoload: true,
			timestampData: true,
		});
		this.Addresses_sec_2 = Datastore.create({
			filename: path.join(table_dir, 'Addresses_sec_2.db'),
			autoload: true,
			timestampData: true,
		});
		this.Commemorative_plaques_sec_3 = Datastore.create({
			filename: path.join(table_dir, 'Commemorative_plaques_sec_3.db'),
			autoload: true,
			timestampData: true,
		});
		this.Decembrists_sec_4 = Datastore.create({
			filename: path.join(table_dir, 'Decembrists_sec_4.db'),
			autoload: true,
			timestampData: true,
		});
		this.Documents_sec_5 = Datastore.create({
			filename: path.join(table_dir, 'Documents_sec_5.db'),
			autoload: true,
			timestampData: true,
		});
		this.Quotes_sec_6 = Datastore.create({
			filename: path.join(table_dir, 'Quotes_sec_6.db'),
			autoload: true,
			timestampData: true,
		});
	}

	async isEmpty(collection: Datastore<any>) {
		return (await collection.count({})) === 0;
	}

	async importDataFromJson(jsonPath: string) {
		// Read and parse JSON file as text
		const jsonString = await fs.readFile(jsonPath, 'utf8');
		const jsonData: Record<string, any[][]> = JSON.parse(jsonString);

		// jsonData is an object: keys are table names; values are arrays of row arrays
		for (const [tableName, rows] of Object.entries(jsonData)) {
			if (!Array.isArray(rows)) {
				console.warn(`Expected an array of rows for table ${tableName} but got:`, rows);
				continue;
			}

			// @ts-ignore Access collection dynamically
			const collection = this[tableName];
			if (!collection) {
				console.warn(`No collection found for table ${tableName}`);
				continue;
			}

			for (const row of rows) {
				let doc;
				switch (tableName) {
					case 'Decembrists_sec_1':
						doc = { group: row[0], name: row[1], info: row[2] };
						break;
					case 'Addresses_sec_2':
						doc = { group: row[0], address: row[1], info: row[2] };
						break;
					case 'Commemorative_plaques_sec_3':
						doc = { image_name: row[0], info: row[1] };
						break;
					case 'Decembrists_sec_4':
						doc = {
							group: row[0],
							info: row[1],
							address: row[2],
							topography: row[3],
						};
						break;
					case 'Documents_sec_5':
						doc = { image_name: row[0], info: row[1] };
						break;
					case 'Quotes_sec_6':
						doc = { group: row[0], text: row[1], author: row[2] };
						break;
					default:
						doc = row; // fallback
				}
				
				await collection.insert(doc);
			}
		}
	}


	async loadDataIfEmpty() {
		const __filename = fileURLToPath(import.meta.url);
		const __dirname = path.dirname(__filename);
		
		// Get the correct path for tables.json
		let jsonPath: string;
		if (app && app.isPackaged) {
			// In packaged app, it's in the asar at the root
			jsonPath = path.join(app.getAppPath(), 'public', 'data', 'tables.json');
		} else {
			// In development, it's in the source public directory
			// __dirname is dist/src, so go up to app root, then to public/data
			jsonPath = path.join(__dirname, '..', '..', 'public', 'data', 'tables.json');
		}

		if (await this.isEmpty(this.Decembrists_sec_1)) {
			await this.importDataFromJson(jsonPath);
			console.log('Imported JSON data into empty DB.');
		}
	}

	async addRow<T extends { id?: string }>(collection: Datastore<T>, row: T): Promise<T> {
		return collection.insert(row);
	}

	async updateRow<T extends { id?: string }>(collection: Datastore<T>, row: T): Promise<T> {
		if (!row.id) throw new Error('Row must have an id for update');
		await collection.update({ _id: row.id }, row);
		return row;
	}

	async deleteRow<T>(collection: Datastore<T>, id: string): Promise<void> {
		await collection.remove({ _id: id }, {});
	}

	async getAllRows<T>(collection: Datastore<T>): Promise<T[]> {
		return collection.find({});
	}
}

export const db = new AppDatabase()
