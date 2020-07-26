import Vue from 'vue'
import fb from './firebase'

export interface IUser {
    id: String;
    name: String;
    email: String;
    password: String;
    permission: IPermission;
}

export interface IPermission {
    id: String;
    name: String;
}

const userState: { 
    users: Array<IUser>, 
    user: IUser | Object,
    permissions: Array<IPermission>
} = {
    users: [],
    user: {},
    permissions: []
};

export default {
    namespaced: true,
    state: userState,
    mutations: {
        clearState(state: any) {
            state.users = userState.users;
            state.user = userState.user;
            state.permissions = userState.permissions;
        },
        
        // Users
        setUsers(state: any, users: Array<IUser>) {
            console.log(users);
            state.users = users;
        },
        setUser(state: any, user: IUser) {
            const index = state.users.map((user: IUser) => user.id).indexOf(user.id);
            if (index >= 0) Vue.set(state.users, index, user);
            else state.users.push(user);
        },

        // Current Server
        setCurrentUser(state: any, user: IUser) {
            state.user = user;
        },

        // Permissions
        setPermissions(state: any, permissions: Array<IPermission>) {
            console.log(permissions);
            state.permissions = permissions;
        },
        setPermission(state: any, permission: IPermission) {
            const index = state.permissions.map((permission: IPermission) => permission.id).indexOf(permission.id);
            if (index >= 0) Vue.set(state.permissions, index, permission);
            else state.permissions.push(permission);
        }
    },
    actions: {

        // Users
        getUsers(action: any) {
            return fb.firestore().collection('Users').get().then((users: any) => {
                action.commit('setUsers', users.docs.map((user: any) => ({ id: user.id, ...user.data() })));
            });
        },
        saveUser(action: any, user: IUser) {
            return fb.firestore().collection('Users').doc(user.id.toString()).update(user).then(() => {
                action.commit('setUser', user);
            });
        },

        // Permissions
        getPermissions(action: any) {
            return fb.firestore().collection('Permissions').get().then((permissions: any) => {
                action.commit('setPermissions', permissions.docs.map((permission: any) => ({ id: permission.id, ...permission.data() })));
            });
        },
        savePermission(action: any, permission: IPermission) {
            return fb.firestore().collection('permissions').doc(permission.id.toString()).update(permission).then(() => {
                action.commit('setPermission', permission);
            });
        }
    }
};