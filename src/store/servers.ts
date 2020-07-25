import Vue from 'vue'
import Vuex from 'vuex'
import fb from './firebase'

Vue.use(Vuex);

export interface Service {
    name: String;
    type: String;
    host: String;
    port: Number;
    username: String
};

export interface Server {
    id: String;
    name: String;
    host: String;
    services: Array<Service>;
    removed: Boolean;
};

const serverState: { servers: Array<Server>, server: Server | Object } = {
    servers: [],
    server: {}
};

export default {
    namespaced: true,
    state: serverState,
    mutations: {
        clearState(state: any) {
            state.servers = serverState.servers;
            state.server = serverState.server;
        },
        
        // Servers
        setServers(state: any, servers: Array<Server>) {
            console.log(servers);
            state.servers = servers;
        },
        setServer(state: any, server: Server) {
            const index = state.servers.map((server: Server) => server.id).indexOf(server.id);
            if (index >= 0) Vue.set(state.servers, index, server);
            else state.servers.push(server);
        },
        removeServer(state: any, server: Server) {
            const index = state.servers.map((server: Server) => server.id).indexOf(server.id);
            if (index >= 0) Vue.delete(state.servers, index);
        },

        // Current Server
        setCurrentServer(state: any, server: Server) {
            state.server = server;
        }
    },
    actions: {

        // Servers
        getServers(action: any) {
            return fb.firestore().collection('Servers').get().then((servers: any) => {
                action.commit('setServers', servers.docs.map((server: any) => ({ id: server.id, ...server.data() })));
            });
        },
        saveServer(action: any, server: Server) {
            return fb.firestore().collection('Servers').doc(server.id.toString()).update(server).then(() => {
                action.commit('setServer', server);
            });
        },
        removeServer(action: any, server: Server) {
            return fb.firestore().collection('Servers').doc(server.id.toString()).update({ removed: true }).then(() => {
                action.commit('setServer', { ...server, removed: true });
            });
        }
    }
};