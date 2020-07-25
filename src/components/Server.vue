<template>
    <div class="server mt-5">
        <h1>{{ server.name }}</h1>
		<p>{{ server.public_host }}</p>

		<!-- Select Service -->
		<div class="btn-group btn-group-toggle" role="group">
			<button type="button" 
				class="btn btn-light"
				v-for="(service, serviceIndex) in server.services"
				:key="serviceIndex"
				@click="setService(service)">
				{{ service.name }}
			</button>
		</div>

		<!-- Service -->
		<ServiceComponent></ServiceComponent>

		<div class="footer">
			<button class="btn btn-primary">Save</button>
			<button class="btn btn-secondary">Revert</button>
		</div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';

import ServiceComponent from './Service.vue';

import { IService } from './../store/servers';

export default Vue.extend({
	components: {
		ServiceComponent
	},
	computed: {
		...mapState('servers', ['server', 'service'])
	},
	data() {
		return {};
	},
	methods: {
		setService(service: IService) {
			this.$store.commit('servers/setCurrentService', service);
		}
	}
});
</script>

<style lang="scss" scoped>
@import '../assets/_variables.scss';

.server {
	position: relative;

	.footer {
		position: absolute;
		left: 0;
		bottom: 0;
		margin: 16px;
		border-top: 1px solid;
		border-color: $color-border;
	}
}
</style>