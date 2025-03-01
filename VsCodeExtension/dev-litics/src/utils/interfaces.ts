export namespace DevInterfaces {
    export interface LanguageUsage {
        [language: string]: number;
    }
    
    export interface LanguageEntry {
        language_name: string;
        language_time: string;
    }
}