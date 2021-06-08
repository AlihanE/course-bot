import {commonApi} from './common';

const ReportsAPI = {
    getReports() {
        return commonApi.perform('get', '/report');
    },
    updateReport(report) {
        return commonApi.perform('patch', '/report', report);
    },
};

export default ReportsAPI;