<template>
    <div class="mt-5">
        <h1>{{ server.name }}</h1>
		<p>{{ server.host }}</p>

		<div class="btn-group" role="group" aria-label="Basic example">
			<button type="button" 
				class="btn btn-primary"
				v-for="(service, serviceIndex) in server.services"
				:key="serviceIndex">
				{{ service.name }}
			</button>
		</div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';

export default Vue.extend({
	computed: {
		...mapState('servers', ['server'])
	},
	data() {
		return {};
	},
	methods: {}
});
</script>

<style lang="scss" scoped>
</style>