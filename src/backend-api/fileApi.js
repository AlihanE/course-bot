import {commonApi} from './common';

const FileApi = {
    uploadFile(file) {
        let formData = new FormData();
        formData.append("file", file);

        return commonApi.perform('POST', '/file', formData)
    },
};

export default FileApi;