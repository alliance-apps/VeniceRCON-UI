<template>
    <div>
        <CRow>
            <CCol sm="6">
                <CCard>
                    <CCardHeader>
                        <slot name="header" >
                            Change password and E-Mail
                        </slot>
                        <CButton
                                class="float-right"
                                color="success"
                                square
                                size="sm"
                                @click="changePassword()"
                                :disabled="oldPassword == newPassword || newPassword != newPasswordConfirm || oldPassword.length < 6"
                        >
                            Update
                        </CButton>
                    </CCardHeader>
                    <CCardBody>
                        <CInput
                                label="Old Password"
                                type="password"
                                placeholder="Required for password email change"
                                :value.sync="oldPassword"
                        />
                        <CInput
                                label="New Password"
                                type="password"
                                placeholder="Leave empty for no change"
                                :value.sync="newPassword"
                        />
                        <CInput
                                label="New Password again"
                                type="password"
                                placeholder="Leave empty for no change"
                                :value.sync="newPasswordConfirm"
                        />
                        <CInput
                                label="E-Mail"
                                type="text"
                                :value.sync="email"
                        />
                    </CCardBody>
                </CCard>
            </CCol>
            <CCol sm="6">
                <CCard>
                    <CCardHeader>
                        <slot name="header" >
                            Player Bindings
                        </slot>

                    </CCardHeader>
                    <CCardBody>
                        Your account is currently connected to these players. Each player displayed here can use your permissions in game through supported plugins/mods.<br><br>
                        <ul>
                            <li v-show="playerBindings.length === 0">You have no player bindings</li>
                            <li v-for="binding in playerBindings" :key="binding.id">{{ binding.name }} ({{ binding.guid }})
                                <a
                                    href="javascript:void(0)"
                                    @click="removeBinding(binding.id)"
                                >
                                    Remove
                                </a>
                            </li>
                        </ul>



                        <CInput
                                label="GUID"
                                :value.sync="bindingGuid"
                        />
                        <CButton
                                class="float-right"
                                color="success"
                                block
                                size="sm"
                                @click="addBinding()"
                                :disabled="bindingGuid.length !== 32"
                        >
                            Add binding
                        </CButton>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
        <CRow>
            <CCol sm="12">
                <CCard>
                    <CCardHeader>
                        <slot name="header" >
                            Your account
                        </slot>

                    </CCardHeader>
                    <CCardBody>
                        <ul>
                            <li>User ID: {{ this.$store.state.user.id }}</li>
                            <li>Username: {{ this.$store.state.user.username }}</li>
                            <li>
                                Global Permissions:
                                <ul>
                                    <li v-show="this.$store.state.globalPermissions.length === 0">You have no global permissions</li>
                                    <li v-for="permission in this.$store.state.globalPermissions" :key="permission">{{ permission }}</li>
                                </ul>
                            </li>
                            <li>
                                Instance Permissions
                                <ul>
                                    <li v-for="(instance, key) in this.$store.state.permissions" :key="key">
                                        Server #{{ key }}
                                        <ul>
                                            <li v-for="permission in instance" :key="permission">{{ permission }}</li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: 'Profile',
        components: {


        },
        data () {
            return {
                oldPassword: '',
                newPassword: '',
                newPasswordConfirm: '',
                email: this.$store.state.email || '',
                playerBindings: [],
                bindingGuid: ''
            }
        },
        mounted() {
            this.loadPlayerBindings()
        },
        methods: {
            changePassword() {
                let body = {currentPassword: this.oldPassword, email: this.email}
                if(this.newPassword.length > 5) body.password = this.newPassword
                if(this.email.length === 0) body.email = null

                // TODO: This is not 100% working

                axios.post('auth/update-self', body)
                    .then(() => {
                        this.$notify({
                            group: 'foo',
                            type: 'success',
                            title: 'Profile updated',
                            duration: 5000,
                            text: 'Your information has been updated'
                        });
                        this.oldPassword = ''
                        this.newPassword = ''
                        this.newPasswordConfirm = ''
                    })
                    .catch((error) => {
                        if(error.response) {
                            this.$notify({
                                group: 'foo',
                                type: 'error',
                                title: 'Profile update error',
                                duration: 5000,
                                text: 'Something went wrong<br>' + error.response.data.message
                            });
                        } else {
                            this.$notify({
                                group: 'foo',
                                type: 'error',
                                title: 'Profile update error',
                                duration: 5000,
                                text: 'Something went wrong'
                            });
                        }

                    })
            },
            changeEmail() {
                axios.post('auth/update-password', {oldPassword: this.oldPassword, newPassword: this.newPassword})
                    .then(() => {
                        this.$notify({
                            group: 'foo',
                            type: 'success',
                            title: 'Password changed',
                            duration: 5000,
                            text: 'You can now log in using your new password'
                        });
                        this.oldPassword = ''
                        this.newPassword = ''
                        this.newPasswordConfirm = ''
                    })
                    .catch(() => {
                        this.$notify({
                            group: 'foo',
                            type: 'error',
                            title: 'Password change failed',
                            duration: 5000,
                            text: 'Something went wrong'
                        });
                    })
            },
            loadPlayerBindings() {
                this.playerBindings = []
                axios.get('auth/binding')
                    .then((response) => {
                        this.playerBindings = response.data
                    })
                    .catch(() => {
                        this.$notify({
                            group: 'foo',
                            type: 'error',
                            title: 'Loading player bindings failed',
                            duration: 5000,
                            text: 'Something went wrong'
                        });

                    })
            },
            removeBinding(id) {
                console.log(id)
                // TODO: This is not working
                axios.delete('auth/binding')
                    .then(() => {

                    })
                    .catch((error) => {
                        if(error.response) {
                            this.$notify({
                                group: 'foo',
                                type: 'error',
                                title: 'Removing player binding failed',
                                duration: 5000,
                                text: error.response.data.message
                            });
                        } else {
                            this.$notify({
                                group: 'foo',
                                type: 'error',
                                title: 'Removing player binding failed',
                                duration: 5000,
                                text: 'Something went wrong'
                            });
                        }
                    })
            },
            addBinding() {
                axios.post('auth/search-player', {guid: this.bindingGuid})
                    .then((response) => {
                        let id = -1
                        response.data.forEach((player) => {
                            if(player.guid == this.bindingGuid) id = player.id
                        })
                        if(id === -1) {
                            this.$notify({
                                group: 'foo',
                                type: 'error',
                                title: 'Adding player binding failed (player not found)',
                                duration: 5000,
                                text: 'Something went wrong'
                            });
                        } else {
                            axios.post('auth/binding', {playerId: id})
                                .then(() => {
                                    this.bindingGuid = ''
                                    this.loadPlayerBindings()
                                })
                                .catch((error) => {
                                    if(error.response) {
                                        this.$notify({
                                            group: 'foo',
                                            type: 'error',
                                            title: 'Adding player binding failed',
                                            duration: 5000,
                                            text: error.response.data.message
                                        });
                                    } else {
                                        this.$notify({
                                            group: 'foo',
                                            type: 'error',
                                            title: 'Adding player binding failed',
                                            duration: 5000,
                                            text: 'Something went wrong'
                                        });
                                    }
                                })
                        }

                    })
                    .catch((error) => {
                        if(error.response) {
                            this.$notify({
                                group: 'foo',
                                type: 'error',
                                title: 'Adding player binding failed',
                                duration: 5000,
                                text: error.response.data.message
                            });
                        } else {
                            this.$notify({
                                group: 'foo',
                                type: 'error',
                                title: 'Adding player binding failed',
                                duration: 5000,
                                text: 'Something went wrong: ' + error.message
                            });
                        }
                    })
            }
        }
    }
</script>
