import axios from 'axios';

const BASE_URI = 'http://localhost:8000';
const client = axios.create({
    baseURL: BASE_URI,
    json: true,
});

export const commonApi = {
    async perform(method, resource, data) {
        return client({
            method,
            url: resource,
            data,
            headers: this.authHeader(),
        }).then(req => {
            return req.data
        })
    },
    authHeader() {
        // return authorization header with jwt token
        let user = JSON.parse(sessionStorage.getItem('user'));
        if (user.data && user.data.token) {
            return { 'Authorization': 'Bearer ' + user.data.token };
        } else {
            return {};
        }
    }
}

export default client