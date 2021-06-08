import {commonApi} from './common';

const ClientsAPI = {
    getClients() {
        return commonApi.perform('get', '/client');
    },
    updateClient(cli) {
        return commonApi.perform('patch', '/client', cli);
    },
};

export default ClientsAPI;