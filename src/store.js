import Vue from 'vue';
import Vuex from 'vuex';

import clientsApi from './backend-api/clientApi';
import stepsApi from './backend-api/stepsApi';
import reportsApi from './backend-api/reportApi';
import assetApi from './backend-api/assetApi';
import clientConvApi from './backend-api/client-convApi';
import assetHistoryApi from './backend-api/asset-historyApi';

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        clients: [],
        assets: [],
        steps: [],
        reports: [],
        conversation: [],
        assetHistory: [],
    },
    mutations: {
        updateClients (state, client) {
            let filteredClients = state.clients.filter(cli => cli.id !== client.id);
            state.clients = filteredClients.push(client);
        },
        resetClients (state, clients) {
            state.clients = clients;
        },
        resetSteps (state, steps) {
            state.steps = steps;
        },
        resetReports (state, reports) {
            state.reports = reports;
        },
        resetAssets (state, assets) {
            state.assets = assets;
        },
        resetConversation (state, conversation) {
            state.conversation = conversation;
        },
        resetAssetHistory (state, assetHistory) {
            state.assetHistory = assetHistory;
        },
    },
    actions: {
        updateClient ({dispatch}, client) {
            clientsApi.updateClient(client).then(() => {
                dispatch('getAllClients')
            }).catch((err) => {
                console.error(err);
            });
        },
        getAllClients ({commit}) {
            clientsApi.getClients().then((data) => {
                commit('resetClients', data);
            });
        },
        getAllSteps({commit}) {
            stepsApi.getSteps().then((data) => {
                commit('resetSteps', data);
            });
        },
        addStep ({dispatch}, step) {
            stepsApi.addStep(step).then(() => {
                dispatch('getAllSteps');
            });
        },
        updateStep ({dispatch}, step) {
            stepsApi.updateStep(step).then(() => {
                dispatch('getAllSteps');
            });
        },
        getAllReports({commit}) {
            reportsApi.getReports().then((data) => {
                commit('resetReports', data);
            });
        },
        updateReport({dispatch}, report) {
            reportsApi.updateReport(report).then(() => {
                dispatch('getAllReports');
            });
        },
        getAllAssets({commit}) {
            assetApi.getAssets().then((data) => {
                commit('resetAssets', data);
            });
        },
        addAsset({dispatch}, asset) {
            assetApi.addAsset(asset).then(() => {
                dispatch('getAllAssets');
            });
        },
        deleteAsset({dispatch}, asset) {
            assetApi.deleteAsset(asset).then(() => {
                dispatch('getAllAssets');
            });
        },
        getConversation({commit}, reportId) {
            clientConvApi.getConv(reportId).then((data) => {
                commit('resetConversation', data);
            });
        },
        getAssetHistory({commit}) {
            assetHistoryApi.getAssetHistory().then((data) => {
                commit('resetAssetHistory', data);
            });
        },
    },
});

export default store;