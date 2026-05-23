import axiosInstance from "../api/axiosInstance";

export const login = async (email: string, password: string) => {
const response = await axiosInstance.post('/api/auth/login', {
email,
password,        
})
return response.data;
};

export const register = async (name: string, email: string, password: string) => {
    const response = await axiosInstance.post('/api/auth/register', {
        name,
        email,
        password,
    })
    return response.data;
}

export const refresh = async () => {
    const response = await axiosInstance.post('/api/auth/refresh');
    return response.data;
}

export const logout = async () => {
    const response = await axiosInstance.post('/api/auth/logout');
    return response.data
}