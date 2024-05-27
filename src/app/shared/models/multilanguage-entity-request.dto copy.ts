import { TranslationEntryDto } from "./translation-entry.dto";

export interface MultilanguageEntityRequestDto<T> {
    data: {
    entity: T;
    translations: Array<TranslationEntryDto>;
    }
}