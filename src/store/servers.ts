import Vue from 'vue'
import Vuex from 'vuex'
import fb from './firebase'

Vue.use(Vuex);

export interface IService {
    name: String;
    type: String;
    host: String;
    port: Number;
    username: String
    password: String;
    show_password: Boolean;
};

export interface IServer {
    id: String;
    name: String;
    host: String;
    services: Array<IService>;
    removed: Boolean;
};

const serverState: { 
    servers: Array<IServer>, 
    server: IServer | Object, 
    service: IService | Object 
} = {
    servers: [],
    server: {},
    service: {}
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
        setServers(state: any, servers: Array<IServer>) {
            console.log(servers);
            state.servers = servers;
        },
        setServer(state: any, server: IServer) {
            const index = state.servers.map((server: IServer) => server.id).indexOf(server.id);
            if (index >= 0) Vue.set(state.servers, index, server);
            else state.servers.push(server);
        },
        removeServer(state: any, server: IServer) {
            const index = state.servers.map((server: IServer) => server.id).indexOf(server.id);
            if (index >= 0) Vue.delete(state.servers, index);
        },

        // Current Server
        setCurrentServer(state: any, server: IServer) {
            state.server = server;
        },

        // Current Service
        setCurrentService(state: any, service: IService) {
            state.service = service;
        }
    },
    actions: {

        // Servers
        getServers(action: any) {
            return fb.firestore().collection('Servers').get().then((servers: any) => {
                action.commit('setServers', servers.docs.map((server: any) => ({ id: server.id, ...server.data() })));
            });
        },
        saveServer(action: any, server: IServer) {
            return fb.firestore().collection('Servers').doc(server.id.toString()).update(server).then(() => {
                action.commit('setServer', server);
            });
        },
        removeServer(action: any, server: IServer) {
            return fb.firestore().collection('Servers').doc(server.id.toString()).update({ removed: true }).then(() => {
                action.commit('setServer', { ...server, removed: true });
            });
        }
    }
};