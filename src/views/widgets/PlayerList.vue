<template>
    <div>
        <CCard>
            <CCardHeader>
                <slot name="header">
                    <CIcon name="cil-grid"/> <b>0/88</b>
                </slot>
            </CCardHeader>
            <CCardBody>
                <CDataTable
                        :hover="hover"
                        :striped="striped"
                        :bordered="bordered"
                        :small="small"
                        :fixed="fixed"
                        :items="this.$store.state.instances[this.$route.params.id].players"
                        :fields="fields"
                        :items-per-page="small ? 10 : 5"
                        :dark="dark"
                        pagination
                >
                    <template #status="{item}">
                        <td>
                            <CBadge :color="getBadge(item.status)">{{item.status}}</CBadge>
                        </td>
                    </template>

                    <template #show_details="{item, index}">
                        <td class="py-2">
                            <CButton
                                    color="primary"
                                    variant="outline"
                                    square
                                    size="sm"
                                    @click="toggleDetails(item, index)"
                            >
                                {{Boolean(playerDetailsToggled[item.playerGuid]) ? 'Hide' : 'Show'}}
                            </CButton>
                        </td>
                    </template>

                    <template #details="{item}">
                        <CCollapse :show="Boolean(playerDetailsToggled[item.playerGuid])" :duration="collapseDuration">
                            <CCardBody>
                                <CMedia :aside-image-props="{ height: 102 }">
                                    <h4>
                                        Test
                                    </h4>
                                    <p class="text-muted">User since: Test</p>
                                    <CButton size="sm" color="info" class="">
                                        User Settings
                                    </CButton>
                                    <CButton size="sm" color="danger" class="ml-1">
                                        Delete
                                    </CButton>
                                </CMedia>
                            </CCardBody>
                        </CCollapse>
                    </template>
                </CDataTable>
            </CCardBody>
        </CCard>


        <br><br>
        {{ this.$store.state.instances[this.$route.params.id].playersArray }}
        <br><br>
        {{ playerDetailsToggled }}
    </div>
</template>

<script>
    export default {
        data() {
            return {
                // Initialized to zero to begin
                playerDetailsToggled: [],
                collapseDuration: 0
            }
        },

        name: 'PlayerList',
        props: {
            items: Array,
            fields: {
                type: Array,
                default () {

                    return ['name', 'teamId', 'squadId', 'kills', 'deaths', 'score', 'ping', {
                        key: 'show_details',
                        label: '',
                        _style: 'width:1%',
                        sorter: false,
                        filter: false
                    }]
                }
            },
            caption: {
                type: String,
                default: 'Table'
            },
            hover: Boolean,
            striped: Boolean,
            bordered: Boolean,
            small: Boolean,
            fixed: Boolean,
            dark: Boolean,
        },
        methods: {
            getBadge (status) {
                return status === 'Active' ? 'success'
                    : status === 'Inactive' ? 'secondary'
                        : status === 'Pending' ? 'warning'
                            : status === 'Banned' ? 'danger' : 'primary'
            },
            toggleDetails (item) {
                this.$set(this.playerDetailsToggled, item.playerGuid, !this.playerDetailsToggled[item.playerGuid])
                this.collapseDuration = 300
                this.$nextTick(() => { this.collapseDuration = 0})
            }
        }
    }
</script>
