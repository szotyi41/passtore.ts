<template>
  <div id="app" class="row">
    <ServerList class="col-md-4"></ServerList>
    <router-view class="col-md-8"></router-view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ServerList from './components/ServerList.vue';
import Server from './components/Server.vue';

export default Vue.extend({
	name: 'App',
	components: {
		ServerList,
		Server
	}
});
</script>

<style lang="scss">
@import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';
@import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
@import '../node_modules/shards-ui/dist/css/shards.min.css';

@import './assets/_variables.scss';

html,
body {
	margin: 0;
	padding: 0;
}
</style>