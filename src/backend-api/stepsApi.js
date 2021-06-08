import {commonApi} from './common';

const StepsAPI = {
    getSteps() {
        return commonApi.perform('get', '/step');
    },
    updateStep(step) {
        return commonApi.perform('patch', '/step', step);
    },
    addStep(step) {
        return commonApi.perform('post', '/step', step);
    },
};

export default StepsAPI;