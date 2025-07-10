import * as userModel from "../model/user";
import {NavigateFunction} from "react-router";
import {AxiosError} from 'axios';
import {publicApi} from "./client/httpsClient";

export const login = async (values: any, navigate: NavigateFunction, onError: (error: string) => void) => {
    try {
        const response = await publicApi.post('/api/login', values);
        localStorage.setItem('access_token', response.data.access_token);
        userModel.loginProceed()
        navigate('/');
    } catch (error) {
        const typedError = error as AxiosError<{ error?: string }>;
        const errorMessage = typedError.response?.data?.error || 'Ошибка авторизации';
        onError(errorMessage);
    }
};