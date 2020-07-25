<template>
    <div class="left-bar">
        <div class="server-search">
            <div class="input-group">
				<div class="input-group-prepend">
					<span class="input-group-text"><i class="fa fa-search"></i></span>
				</div>		

                <input type="text" 
                    v-model="searchText"
                    class="form-control" 
                    placeholder="Local Host" 
                    aria-label="Username">
            </div>
        </div>

        <div class="server-list">
            <div class="server" v-for="(server, serverIndex) in serversFiltered" :key="serverIndex" @click="setCurrentServer(server)">
                <span class="server-name">{{ server.name }}</span>
                <span class="server-host">{{ server.public_host }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';

import { IServer } from '../store/servers';

declare module 'vue/types/vue' {
	interface Vue {
		searchText: String;
	}
}

export default Vue.extend({
	mounted() {
		this.$store.dispatch('servers/getServers');
	},
	computed: {
		...mapState('servers', ['servers']),

		serversFiltered: function() {
			const searchText: String = this.searchText.toLowerCase();
			return this.servers.filter((server: IServer) => server.name.toLowerCase().indexOf(searchText.toString()) !== -1);
		}
	},
	data() {
		return {
			searchText: ''
		};
	},
	methods: {
		setCurrentServer(server: IServer) {
			this.$store.commit('servers/setCurrentServer', server);
		}
	}
});
</script>

<style lang="scss" scoped>
@import './../assets/_variables.scss';

.left-bar {
	width: 100%;
	height: 100vh;
	border-right: 1px solid;
	border-color: $color-border;
	user-select: none;
}

.server-list {
	overflow-x: hidden;
	overflow-y: auto;

	.server {
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 48px;
		transition: all 0.1s;
		padding: 0 8px;

		&:hover {
			color: #fff;
			background-color: $color-hover;
			cursor: pointer;
		}

		.server-name {
			font-size: 14px;
			padding: 0 2px;
		}

		.server-host {
			font-size: 12px;
			padding: 0 2px;
		}
	}
}

.server-search {
	display: flex;
	width: calc(100%-8px);

	.server-search-icon {
		display: flex;
		i {
			vertical-align: middle;
			color: $color-border;
			padding: 0 12px;
		}
	}
}
</style>