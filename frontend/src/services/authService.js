import API from './api';

export const registerUser = async (userData) => {
   const response = await API.post('/auth/register', userData);
   return response.data;
}

export const loginUser = async (userData) => {
   const response = await API.post('/auth/login', userData);
   return response.data;
}

export const forgotPasswordService = async (email) => {
    const response = await API.post('/auth/forgot-password', { email });
    return response.data;
};

export const resetPasswordService = async (token, password) => {
    const response = await API.post(`/auth/reset-password/${token}`, { password });
    return response.data;
};

export const generateAIContentService = async (description, format) => {
    const response = await API.post('/ai/generate', { description, format });
    return response.data; 
};