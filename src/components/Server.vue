<template>
    <div class="server">

		<div class="container mt-5">
			<h1>{{ server.name }}</h1>
			<p>{{ server.public_host }}</p>

			<!-- Select Service -->
			<div class="btn-group btn-group-toggle" role="group">
				<button type="button" 
					class="btn btn-primary"
					:class="{'btn-light': serviceTab.name !== service.name}"
					v-for="(serviceTab, serviceIndex) in server.services"
					:key="serviceIndex"
					@click="setService(serviceTab)">
					{{ serviceTab.name }}
				</button>
			</div>

			<!-- Service -->
			<ServiceComponent></ServiceComponent>
		</div>
		
		<!-- Footer -->
		<div class="footer d-flex justify-content-between">
			<div></div>
			<div>
				<button class="btn btn-success">Save</button>
				<button class="btn btn-secondary">Revert</button>
			</div>
		</div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { mapState } from 'vuex';

import ServiceComponent from './Service.vue';

import { IService } from './../store/servers';

@Component({
	name: 'Server',
	components: {
		ServiceComponent
	},
	computed: {
		...mapState('servers', ['server', 'service'])
	}
})
export default class Service extends Vue {
	setService(service: IService) {
		this.$store.commit('servers/setCurrentService', service);
	}
}
</script>

<style lang="scss" scoped>
@import '../assets/_variables.scss';

.server {
	position: relative;

	.footer {
		position: absolute;
		left: 0;
		bottom: 0;
		padding: 16px;
		width: calc(100% - 16px);
		border-top: 1px solid;
		border-color: $color-border;
	}
}
</style>