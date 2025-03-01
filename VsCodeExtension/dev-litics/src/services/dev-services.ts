// src/services/dev-services.ts
import axios from 'axios';
import { LanguageTracker } from '../components/tracker';
import { UserManager } from '../components/user';
import { sendLanguageData, fetchLanguageData } from './api';
import { DevInterfaces } from '../utils/interfaces';

export class DevServices {
    private lastApiData: DevInterfaces.LanguageEntry[] | null = null; // Store the last sent data

    constructor(
        private tracker: LanguageTracker,
        private userManager: UserManager
    ) {}

    async sendDataToAPI(): Promise<void> {
        if (!this.userManager) {
            console.log("User manager not available");
            return;
        }

        const userKey = this.userManager.getUserKey();
        if (!userKey) {
            console.log('No user key provided. Data will not be sent.');
            return;
        }

        try {
            const apiData = this.tracker.convertToApiFormat();
            // Convert to string for deep comparison
            const currentDataStr = JSON.stringify(apiData);
            const lastDataStr = JSON.stringify(this.lastApiData);

            // Skip if data hasn't changed
            if (currentDataStr === lastDataStr) {
                console.log('No changes in data, skipping API call');
                return;
            }

            await sendLanguageData(userKey, apiData);
            this.lastApiData = apiData; // Update last sent data only on success
            console.log('Data sent successfully:', apiData);
        } catch (error) {
            console.error('Error sending data:', error);
            if (axios.isAxiosError(error)) {
                console.error('Axios error details:', error.response?.data);
            }
        }
    }

    async fetchPreviousData(): Promise<void> {
        const userKey = this.userManager.getUserKey();
        if (!userKey) {
            return;
        }
        
        try {
            const usage = await fetchLanguageData(userKey);
            this.tracker.setLanguageUsage(usage);
            console.log('Previous data fetched successfully:', usage);
        } catch (error) {
            console.error('Error fetching previous data:', error);
            if (axios.isAxiosError(error)) {
                console.error('Axios error details:', error.response?.data);
            }
        }
    }
}