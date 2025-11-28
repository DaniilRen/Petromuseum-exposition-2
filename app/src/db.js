"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.AppDatabase = void 0;
var path_1 = require("path");
var nedb_promises_1 = require("nedb-promises");
var fs = require("fs/promises");
var url_1 = require("url");
var AppDatabase = /** @class */ (function () {
    function AppDatabase() {
        var __filename = (0, url_1.fileURLToPath)(import.meta.url);
        var __dirname = path_1.default.dirname(__filename);
        var table_dir = path_1.default.join(__dirname, '..', 'storage');
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
    AppDatabase.prototype.isEmpty = function (collection) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, collection.count({})];
                    case 1: return [2 /*return*/, (_a.sent()) === 0];
                }
            });
        });
    };
    AppDatabase.prototype.importDataFromJson = function (jsonPath) {
        return __awaiter(this, void 0, void 0, function () {
            var jsonString, jsonData, _i, _a, _b, tableName, rows, collection, _c, rows_1, row, doc;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, fs.readFile(jsonPath, 'utf8')];
                    case 1:
                        jsonString = _d.sent();
                        jsonData = JSON.parse(jsonString);
                        _i = 0, _a = Object.entries(jsonData);
                        _d.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 7];
                        _b = _a[_i], tableName = _b[0], rows = _b[1];
                        if (!Array.isArray(rows)) {
                            console.warn("Expected an array of rows for table ".concat(tableName, " but got:"), rows);
                            return [3 /*break*/, 6];
                        }
                        collection = this[tableName];
                        if (!collection) {
                            console.warn("No collection found for table ".concat(tableName));
                            return [3 /*break*/, 6];
                        }
                        _c = 0, rows_1 = rows;
                        _d.label = 3;
                    case 3:
                        if (!(_c < rows_1.length)) return [3 /*break*/, 6];
                        row = rows_1[_c];
                        doc = void 0;
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
                        return [4 /*yield*/, collection.insert(doc)];
                    case 4:
                        _d.sent();
                        _d.label = 5;
                    case 5:
                        _c++;
                        return [3 /*break*/, 3];
                    case 6:
                        _i++;
                        return [3 /*break*/, 2];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    AppDatabase.prototype.loadDataIfEmpty = function () {
        return __awaiter(this, void 0, void 0, function () {
            var __filename, __dirname, jsonPath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        __filename = (0, url_1.fileURLToPath)(import.meta.url);
                        __dirname = path_1.default.dirname(__filename);
                        return [4 /*yield*/, this.isEmpty(this.Decembrists_sec_1)];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 3];
                        jsonPath = path_1.default.join(__dirname, '..', 'public', 'data', 'tables.json');
                        return [4 /*yield*/, this.importDataFromJson(jsonPath)];
                    case 2:
                        _a.sent();
                        console.log('Imported JSON data into empty DB.');
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AppDatabase.prototype.addRow = function (collection, row) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, collection.insert(row)];
            });
        });
    };
    AppDatabase.prototype.updateRow = function (collection, row) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!row.id)
                            throw new Error('Row must have an id for update');
                        return [4 /*yield*/, collection.update({ _id: row.id }, row)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, row];
                }
            });
        });
    };
    AppDatabase.prototype.deleteRow = function (collection, id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, collection.remove({ _id: id }, {})];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AppDatabase.prototype.getAllRows = function (collection) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, collection.find({})];
            });
        });
    };
    return AppDatabase;
}());
exports.AppDatabase = AppDatabase;
exports.db = new AppDatabase();
