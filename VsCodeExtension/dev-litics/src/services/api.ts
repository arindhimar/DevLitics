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
    const response: AxiosResponse = await apiClient.get(apiURLS.languageDataURL(userKey));
    const languages = response.data.languages || [];
    const res =  languages.reduce((acc: DevInterfaces.LanguageUsage, entry: DevInterfaces.LanguageEntry) => {
        acc[entry.language_name.toLowerCase()] = parseInt(entry.language_time) * DevConstants.TIME_CONVERSION_UNIT ;
        return acc;
    }, {});
    return res;
}
export async function validateUser(userKey: string|undefined): Promise<boolean> {
    if(userKey){
        const data = JSON.stringify({
            "user_id":userKey
        });
        const response:any = await apiClient.post(apiURLS.validateUser(),data);
        return response.status === 200 ? true : false;
    }
    return false;
   
}

export async function sendLanguageData(userKey: string, data: DevInterfaces.LanguageEntry[]): Promise<void> {
    await apiClient.post(apiURLS.languageDataURL(userKey), data);
}