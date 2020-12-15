<template>
    <div>
        <CCard>
            <CCardHeader>
                <slot name="header" >
                    <b>Instance #{{ this.$route.params.idalt }} - User list</b>
                </slot>

            </CCardHeader>
            <CCardBody>
                <CDataTable
                        :items="users"
                        :fields="userfields"
                        hover
                >

                    <template #edit="{item}">
                        <td>
                            <CButton
                                    color="primary"
                                    square
                                    size="sm"
                                    :disabled="!$store.getters.hasPermission('INSTANCEUSER#UPDATE', $route.params.idalt)"
                                    @click="editUserPermissions(item.userId)"
                            >
                                Edit Permissions
                            </CButton>
                            <CModal
                                    :title="'Edit permissions for ' + editPermissionsUser.username"
                                    :show.sync="editPermissionsModal"
                                    v-show="editPermissionsModal && editPermissionsUser.userId === item.userId"
                            >
                                <CListGroup>
                                    <CListGroupItem
                                            v-for="perm in permissions.getters.listPermissions()"
                                            :key="perm"
                                            :color="editPermissionsUser.scopes.includes(perm) ? 'success' : 'danger'"
                                            v-show="$store.getters.hasPermission(perm, $route.params.idalt)"
                                    >
                                    <span class="align-middle" :title="perm">
                                        {{ permissions.getters.getDescription(perm) }}
                                    </span>

                                    <CButton
                                            class="float-right"
                                            color="success"
                                            label="Rounds"
                                            size="sm"
                                            shape="pill"
                                            v-show="editPermissionsUser.scopes.includes(perm)"
                                            @click="removePermission(perm)"
                                    >
                                        <CIcon name="cil-check-alt"/>
                                    </CButton>

                                    <CButton
                                            class="float-right"
                                            color="danger"
                                            label="Rounds"
                                            size="sm"
                                            shape="pill"
                                            v-show="!editPermissionsUser.scopes.includes(perm)"
                                            @click="addPermission(perm)"
                                    >
                                        <CIcon name="cil-check-alt"/>
                                    </CButton>

                                    </CListGroupItem>
                                </CListGroup>
                                <template #footer="{}">
                                    <CButton
                                            color="primary"
                                            @click="submitPermissionChanges()"
                                    >
                                        Save
                                    </CButton>
                                </template>
                            </CModal>
                        </td>
                    </template>
                    <template #delete="{item}">
                        <td class="py-2">
                            <confirm-delete
                                    title="Are you sure you want to delete this user?"
                                    button-color="danger"
                                    :confirm-function="removeUser"
                                    :arg="item.userId"
                                    :has-permission="$store.getters.hasPermission('INSTANCEUSER#REMOVE', $route.params.idalt)"
                            ></confirm-delete>
                        </td>
                    </template>
                </CDataTable>
            </CCardBody>
        </CCard>
        <CCard>
            <CCardHeader>
                <slot name="header" >
                    <b>Instance #{{ this.$route.params.idalt }} - Invite tokens</b>
                </slot>
                <CButton
                        class="float-right"
                        color="success"
                        square
                        size="sm"
                        @click="createNewInviteToken()"
                        :disabled="!$store.getters.hasPermission('INSTANCEUSER#CREATE', $route.params.idalt)"
                >
                    Create new token
                </CButton>
            </CCardHeader>
            <CCardBody>
                <CDataTable
                        :items="inviteTokens"
                        :fields="tokenfields"
                        hover
                >
                    <template #user_username="{item}">
                        <td>
                            <span v-show="item.user_username !== null">{{ item.user_username }}</span>
                        </td>
                    </template>
                    <template #delete="{item}">
                        <td class="py-2">
                            <CButton
                                    color="danger"
                                    variant="outline"
                                    square
                                    size="sm"
                                    :disabled="!$store.getters.hasPermission('INSTANCEUSER#REMOVE', $route.params.idalt)"
                                    @click="deleteInviteToken(item)"
                            >
                                <CIcon name="cil-trash"/>
                            </CButton>
                        </td>
                    </template>
                </CDataTable>
            </CCardBody>
        </CCard>
    </div>
</template>

<script>
    import axios from "axios";
    import ConfirmDelete from "./modals/ConfirmDelete";
    import permissions from "../permissions";


    const userfields = [
        { key: 'userId', label: 'ID'},
        { key: 'username'},
        { key: 'permId', label: 'Permission ID'},
        { key: 'created', label: 'Created at'},
        { key: 'edit' },
        { key: 'delete' },
    ]

    const tokenfields = [
        { key: 'inv_id', label: 'ID'},
        { key: 'issuer_username', label: 'Issuer'},
        { key: 'user_username', label: 'Used by'},
        { key: 'inv_token', label: 'Token'},
        { key: 'inv_created', label: 'Created at'},
        //{ key: 'delete' },
    ]

    export default {
        name: 'Usermanagement',
        components: {
            ConfirmDelete

        },
        data () {
            return {
                users: [],
                inviteTokens: [],
                userfields,
                tokenfields,
                permissions,
                editPermissionsModal: false,
                editPermissionsUser: {
                    scopes: []
                },
            }
        },
        mounted() {
            this.loadUsers()
            this.loadInviteTokens()
        },
        methods: {
            loadUsers() {
                axios.get('instances/' + this.$route.params.idalt + '/users')
                    .then((response) => {
                        this.users = response.data
                    })
                    .catch(() => {
                        this.$notify({
                            group: 'foo',
                            type: 'error',
                            title: 'Error',
                            duration: 5000,
                            text: 'Unable to load instance users'
                        });
                    })
            },
            loadInviteTokens() {
                axios.get('instances/' + this.$route.params.idalt + '/users/invite')
                    .then((response) => {
                        this.inviteTokens = response.data
                    })
                    .catch(() => {
                        this.$notify({
                            group: 'foo',
                            type: 'error',
                            title: 'Error',
                            duration: 5000,
                            text: 'Unable to load instance invite tokens'
                        });
                    })
            },
            createNewInviteToken() {
                axios.post('instances/' + this.$route.params.idalt + '/users/invite')
                    .then(() => {
                        this.loadInviteTokens()
                        this.$notify({
                            group: 'foo',
                            type: 'success',
                            title: 'Token created',
                            duration: 5000,
                            text: 'A new invite token has been created'
                        });
                    })
                    .catch(() => {
                        this.$notify({
                            group: 'foo',
                            type: 'error',
                            title: 'Error',
                            duration: 5000,
                            text: 'Unable to create instance invite tokens'
                        });
                    })
            },
            deleteInviteToken(id) {
                alert("This button would have deleted token " + id + ", but this isn't implemented yet")
            },
            removeUser(userId) {
                axios.delete('instances/' + this.$route.params.idalt + '/users/' + userId)
                    .then(() => {
                        this.loadUsers()
                        this.loadInviteTokens()
                        this.$notify({
                            group: 'foo',
                            type: 'success',
                            title: 'User removed',
                            duration: 5000,
                            text: 'User has been removed from this instance'
                        });
                    })
                    .catch(() => {
                        this.$notify({
                            group: 'foo',
                            type: 'error',
                            title: 'Error',
                            duration: 5000,
                            text: 'Unable to remove user'
                        });
                    })
            },
            editUserPermissions(userId) {
                axios.get('instances/' + this.$route.params.idalt + '/users/' + userId)
                    .then((response) => {
                        this.editPermissionsUser = response.data
                        this.editPermissionsModal = true
                    })
                    .catch(() => {
                        this.$notify({
                            group: 'foo',
                            type: 'error',
                            title: 'Error',
                            duration: 5000,
                            text: 'Unable to load instance user'
                        });
                    })
            },
            removePermission(permission) {
                this.editPermissionsUser.scopes = this.editPermissionsUser.scopes.filter(p => p !== permission)

            },
            addPermission(permission) {
                this.editPermissionsUser.scopes.push(permission)
            },
            submitPermissionChanges() {
                axios.patch('instances/' + this.$route.params.idalt + '/users/' + this.editPermissionsUser.userId + '/permissions', {scopes: this.editPermissionsUser.scopes})
                    .then(() => {
                        this.editPermissionsModal = false
                        this.$notify({
                            group: 'foo',
                            type: 'success',
                            title: 'Permissions changed',
                            duration: 5000,
                            text: 'Permissions of user ' + this.editPermissionsUser.username + ' updated'
                        });
                        this.editPermissionsUser = {
                            scopes: []
                        }
                    })
                    .catch(() => {
                        this.$notify({
                            group: 'foo',
                            type: 'error',
                            title: 'Error',
                            duration: 5000,
                            text: 'Unable to change permissions'
                        });
                    })
            }
        }
    }
</script>
