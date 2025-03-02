import axios, { AxiosResponse } from 'axios';
import { DevConstants } from '../utils/constants';
import { DevInterfaces } from '../utils/interfaces';
import { APIUrls } from "../utils/urls";

const apiURLS = new APIUrls();

export const apiClient = axios.create({
    baseURL: DevConstants.BASE_URL,
    timeout: DevConstants.TIMEOUT,
    headers: DevConstants.HEADERS
});

export async function fetchLanguageData(userKey: string): Promise<DevInterfaces.LanguageUsage> {
    try {
        const response: AxiosResponse = await apiClient.get(apiURLS.languageDataURL(userKey));
        const languages = response.data.languages || [];
    
        const res = Object.fromEntries(
            languages.map((entry: DevInterfaces.LanguageEntry) => [
                entry.language_name.toLowerCase(),
                parseInt(entry.language_time, 10) * DevConstants.TIME_CONVERSION_UNIT
            ])
        );        
        return res;
    } catch (error) {
        console.error('Error fetching language data:', error);
        if (axios.isAxiosError(error)) {
            console.error('Axios error details:', error.response?.data);
        }
        return {}; // Return empty object on failure to avoid breaking downstream
    }
}

export async function validateUser(userKey: string|undefined): Promise<boolean> {
    if(userKey){
        const data = JSON.stringify({
            "user_id":userKey
        });
        const response:any = await apiClient.post(apiURLS.validateUser(),data);
        return response.status === 200 ? true : false;
    }
    return true;
   
}

export async function sendLanguageData(userKey: string, data: DevInterfaces.LanguageEntry[]): Promise<void> {
    await apiClient.post(apiURLS.languageDataURL(userKey), data);
}