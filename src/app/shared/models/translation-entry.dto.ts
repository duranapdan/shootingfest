export interface TranslationEntryDto {
    id: number;
    entryKey: string;
    entryValue: string;
    entity: string;
    property: string;
    valueType: string;
    languageSymbol: string;
    language: {id: number, name: string, symbol: string, flag: string};
}