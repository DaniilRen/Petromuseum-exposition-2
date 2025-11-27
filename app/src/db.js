"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.AppDatabase = void 0;
const path_1 = __importDefault(require("path"));
const nedb_promises_1 = __importDefault(require("nedb-promises"));
const promises_1 = __importDefault(require("fs/promises"));
const url_1 = require("url");
class AppDatabase {
    constructor() {
        const __filename = (0, url_1.fileURLToPath)(import.meta.url);
        const __dirname = path_1.default.dirname(__filename);
        const table_dir = path_1.default.join(__dirname, '..', 'storage');
        this.Decembrists_sec_1 = nedb_promises_1.default.create({
            filename: path_1.default.join(table_dir, 'Decembrists_sec_1.db'),
            autoload: true,
            timestampData: true,
        });
        this.Addresses_sec_2 = nedb_promises_1.default.create({
            filename: path_1.default.join(table_dir, 'Addresses_sec_2.db'),
            autoload: true,
            timestampData: true,
        });
        this.Commemorative_plaques_sec_3 = nedb_promises_1.default.create({
            filename: path_1.default.join(table_dir, 'Commemorative_plaques_sec_3.db'),
            autoload: true,
            timestampData: true,
        });
        this.Decembrists_sec_4 = nedb_promises_1.default.create({
            filename: path_1.default.join(table_dir, 'Decembrists_sec_4.db'),
            autoload: true,
            timestampData: true,
        });
        this.Documents_sec_5 = nedb_promises_1.default.create({
            filename: path_1.default.join(table_dir, 'Documents_sec_5.db'),
            autoload: true,
            timestampData: true,
        });
        this.Quotes_sec_6 = nedb_promises_1.default.create({
            filename: path_1.default.join(table_dir, 'Quotes_sec_6.db'),
            autoload: true,
            timestampData: true,
        });
    }
    async isEmpty(collection) {
        return (await collection.count({})) === 0;
    }
    async importDataFromJson(jsonPath) {
        // Read and parse JSON file as text
        const jsonString = await promises_1.default.readFile(jsonPath, 'utf8');
        const jsonData = JSON.parse(jsonString);
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
        const __filename = (0, url_1.fileURLToPath)(import.meta.url);
        const __dirname = path_1.default.dirname(__filename);
        if (await this.isEmpty(this.Decembrists_sec_1)) {
            const jsonPath = path_1.default.join(__dirname, '..', 'public', 'data', 'tables.json');
            await this.importDataFromJson(jsonPath);
            console.log('Imported JSON data into empty DB.');
        }
    }
    async addRow(collection, row) {
        return collection.insert(row);
    }
    async updateRow(collection, row) {
        if (!row.id)
            throw new Error('Row must have an id for update');
        await collection.update({ _id: row.id }, row);
        return row;
    }
    async deleteRow(collection, id) {
        await collection.remove({ _id: id }, {});
    }
    async getAllRows(collection) {
        return collection.find({});
    }
}
exports.AppDatabase = AppDatabase;
exports.db = new AppDatabase();
