import {jwtDecode} from "jwt-decode";

export const authController = {
    getToken() {
        return localStorage.getItem("access_token");
    },

    isTokenValid: (token: string | null) => {
        if (!token) return false;
        const decodedJwt = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        const jwtExpirationTime =  decodedJwt.exp || 0;

        return jwtExpirationTime > currentTime;
    },

    checkToken() {
        const token = this.getToken();

        return this.isTokenValid(token);
    },

    clearTokens() {
        localStorage.removeItem("access_token");
    }
}
