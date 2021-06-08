import {commonApi} from './common';

const AssetHistoryAPI = {
    getAssetHistory() {
        return commonApi.perform('get', '/asset-history');
    },
};

export default AssetHistoryAPI;