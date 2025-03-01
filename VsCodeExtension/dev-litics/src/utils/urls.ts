export class APIUrls {
    languageDataURL = (userId: string | undefined) => {
        return `/language_time/users/${userId}`;
    };

    validateUser = () => {
        return `/user/validate`;
    };
};
