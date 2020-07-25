<template>
    <div class="mt-3">

        <!-- Name -->
        <div class="block">
            <label>Name</label>
            <div class="input-group">
                <input type="text" 
                    v-model="service.name"
                    class="form-control" 
                    placeholder="Service Name">
            </div>
        </div>

        <!-- Public Host -->
        <div class="block">
            <label>Public Host</label>
            <div class="input-group">
                <input type="text" 
                    v-model="service.public_host"
                    class="form-control" 
                    placeholder="Public Host">

                <!-- Copy -->
                <div class="input-group-append">
                    <span class="input-group-text" v-clipboard="service.public_host">
                        <i class="fa fa-copy"></i>
                    </span>
                </div>
            </div>
        </div>

        <!-- Private Host -->
        <div class="block">
            <label>Private Host</label>
            <div class="input-group">
                <input type="text" 
                    v-model="service.private_host"
                    class="form-control" 
                    placeholder="Private Host">

                <!-- Copy -->
                <div class="input-group-append">
                    <span class="input-group-text" v-clipboard="service.private_host">
                        <i class="fa fa-copy"></i>
                    </span>
                </div>

            </div>
        </div>

        <!-- Username -->
        <div class="block">
            <label>Username</label>
            <div class="input-group">
                <input type="text" 
                    v-model="service.username"
                    class="form-control" 
                    placeholder="Username">

                <!-- Copy -->
                <div class="input-group-append">
                    <span class="input-group-text" v-clipboard="service.username">
                        <i class="fa fa-copy"></i>
                    </span>
                </div>
            </div>
        </div>

        <!-- Password -->
        <div class="block">
            <label>Password</label>
            <div class="input-group">
                <input :type="service.show_password ? 'text' : 'password'" 
                    v-model="service.password"
                    class="form-control" 
                    placeholder="Password">

                <!-- Copy -->
                <div class="input-group-append">
                    <span class="input-group-text" @click="showPassword(service)">
                        <i class="fa fa-lock"></i>
                    </span>

                    <span class="input-group-text" v-clipboard="service.password">
                        <i class="fa fa-copy"></i>
                    </span>
                </div>
            </div>
        </div>

        <!-- Comment -->
        <div class="block">
            <label>Comment</label>
            <div class="input-group">
                <textarea type="text" 
                    v-model="service.comment"
                    class="form-control" 
                    placeholder="Comment">
                </textarea>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { mapState } from 'vuex';

import { IService } from './../store/servers';

@Component({
	name: 'Service',
	computed: {
		...mapState('servers', ['service'])
	}
})
export default class Service extends Vue {
	showPassword(service: IService) {
		service.show_password = !service.show_password;
		this.$forceUpdate();
	}
}
</script>

<style lang="scss" scoped>
.block {
	display: flex;
	margin: 12px 0;

	label {
		min-width: 25%;
		margin-top: 8px;
		font-size: 16px;
		font-weight: bold;
	}
}
</style>