import {commonApi} from './common';

const ToBotApi = {
    send(data) {
        return commonApi.perform('post', '/to-bot', data)
    },
};

export default ToBotApi;