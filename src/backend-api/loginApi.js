import httpClient from './common';

const loginApi = {
    async login(data) {
        return httpClient.post("/api/login",data);
    },
};

export default loginApi;