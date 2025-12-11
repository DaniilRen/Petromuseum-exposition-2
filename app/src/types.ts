// types.ts (optional shared types)
export type TableType = 'Decembrists_sec_4' | 'Documents_sec_5' | 'Quotes_sec_6';

export interface TabConfig {
  key: TableType;
  label: string;
  headers: readonly string[];
}
