import axios from "axios";
import SummaryApi, { baseURL } from "../common/SummaryApi";

const defaultBaseURL = baseURL || import.meta.env.VITE_API_URL || "http://localhost:8080";

const Axios = axios.create({
    baseURL: defaultBaseURL,
    withCredentials: true
});

// Request interceptor: attach bearer token
Axios.interceptors.request.use(
    async (config) => {
        const accessToken = localStorage.getItem('accesstoken') || localStorage.getItem('token');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor: auto-refresh expired access tokens
Axios.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originRequest = error.config;

        if (error.response?.status === 401 && !originRequest?._retry) {
            originRequest._retry = true;

            const refreshToken = localStorage.getItem("refreshToken");

            if (refreshToken) {
                const newAccessToken = await refreshAccessToken(refreshToken);

                if (newAccessToken) {
                    originRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return Axios(originRequest);
                }
            }
        }

        return Promise.reject(error);
    }
);

const refreshAccessToken = async (refreshToken) => {
    try {
        const response = await Axios({
            ...SummaryApi.refreshToken,
            headers: {
                Authorization: `Bearer ${refreshToken}`
            }
        });

        const accessToken = response.data?.data?.accessToken;
        if (accessToken) {
            localStorage.setItem('accesstoken', accessToken);
            localStorage.setItem('token', accessToken);
        }
        return accessToken;
    } catch (error) {
        console.error("Token refresh failed:", error);
        return null;
    }
};

export default Axios;
