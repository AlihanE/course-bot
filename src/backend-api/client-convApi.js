import {commonApi} from './common';

const ClientConvAPI = {
    getConv(reportId) {
        return commonApi.perform('get', '/conversation/' + reportId);
    },
    sendMessage(message) {
        return commonApi.perform('post', '/client-conversation', message);
    },
};

export default ClientConvAPI;