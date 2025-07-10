import {authApi} from './client/httpsClient';

export const userInfo = async (): Promise<Record<string, string> | null> => {
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) return null;

    try {
        const resp = await authApi.get('/api/me');

        return resp.data as Record<string, string>;
    } catch (e) {
        return null;
    }
};