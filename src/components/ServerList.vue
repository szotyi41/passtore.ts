<template>
    <div class="left-bar">
        <div class="server-search">
            <div class="server-search-icon">
                <i class="fa fa-search"></i>
            </div>
            <input type="text" v-model="searchText" placeholder="Search">
        </div>

        <div class="server-list">
            <div class="server" v-for="(server, serverIndex) in serversFiltered" :key="serverIndex" @click="setCurrentServer(server)">
                <span class="server-name">{{ server.name }}</span>
                <span class="server-host">{{ server.host }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';

import { Server } from '../store/servers';

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

		serversFiltered: function () {
			const searchText: String = this.searchText.toLowerCase();
			return this.servers.filter((server: Server) => server.name.toLowerCase().indexOf(searchText.toString()) !== -1);
		}
	},
	data() {
		return {
			searchText: ''
		};
	},
	methods: {
		setCurrentServer(server: Server) {
			this.$store.commit('servers/setCurrentServer', server);
		}
	}
});
</script>

<style lang="scss" scoped>
$color-hover: #016ada;
$color-border: #ddd;
$input-height: 36px;

.left-bar {
	width: 100%;
	height: 100vh;
	border-right: 1px solid $color-border;
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
	height: $input-height;
	width: calc(100%-8px);
	border: 1px solid $color-border;
	border-radius: 4px;
	margin: 8px;

	-webkit-box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.05);
	-moz-box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.05);
	box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.05);

	.server-search-icon {
		display: flex;
		i {
			vertical-align: middle;
			line-height: $input-height;
			height: $input-height;
			color: $color-border;
			padding: 0 12px;
		}
	}
	input {
		color: #333;
		border: none;
		outline: none;
		padding: 0;
		width: 100%;
		background: transparent;
	}
}
</style>