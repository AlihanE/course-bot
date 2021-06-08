import {commonApi} from './common';

const AssetAPI = {
    getAssets() {
        return commonApi.perform('get', '/asset');
    },
    updateAsset(asset) {
        return commonApi.perform('patch', '/asset', asset);
    },
    addAsset(asset) {
        return commonApi.perform('post', '/asset', asset);
    },
    deleteAsset(asset) {
        return commonApi.perform('delete', '/asset', asset);
    },
};

export default AssetAPI;