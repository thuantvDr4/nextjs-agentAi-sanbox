const isDev =
    process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";
export const logRequest = (config: any) => {
    if (isDev) {
        console.log(
            "%c[API REQUEST]",
            "color: #00AEEF",
            config.method?.toUpperCase(),
            config.baseURL + config.url,
            "%c[PAYLOAD]",
            config.params || config.data,
        );
    }
    return config;
};

export const logResponse = (response: any) => {
    if (isDev) {
        console.log(
            "%c[API RESPONSE]",
            "color: #00C853",
            response.status,
            response.data,
        );
    }
    return response;
};

export const logError = (error: any) => {
    if (isDev) {
        console.log(
            "%c[API ERROR]",
            "color: #FF1744",
            error?.response?.status,
            error?.response?.data,
        );
    }
    return Promise.reject(error);
};
