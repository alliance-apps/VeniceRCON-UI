<template>
    <div>
        <CRow>
            <CCol sm="12">
                <CCard>
                    <CCardHeader>
                        <slot name="header">
                            <CIcon name="cil-bolt"/> <b>Mods</b>

                            <div class="float-right">

                                <CButton
                                        color="primary"
                                        square
                                        size="sm"
                                        @click="reloadExtensions()"
                                >
                                    <CIcon name="cil-reload"/>&nbsp;Reload extensions
                                </CButton>
                            </div>
                        </slot>
                    </CCardHeader>
                    <CCardBody>
                        <CListGroup>
                            <CListGroupItem
                                    v-for="mod in mods_available"
                                    :key="mod"
                                    :color="getModColourModList(mod)"
                            >
                                <span class="align-middle">
                                    {{ mod }}
                                    <CBadge color="secondary" v-show="mods.includes(mod) && !mods_active.includes(mod)"> Pending activation on restart</CBadge>
                                    <CBadge color="danger" v-show="!mods.includes(mod) && mods_active.includes(mod)"> Pending removal on restart</CBadge>
                                </span>


                                <CButton
                                        class="float-right"
                                        color="success"
                                        label="Rounds"
                                        size="sm"
                                        shape="pill"
                                        v-show="mods.includes(mod)"
                                        @click="removeMod(mod)"
                                >
                                    <CIcon name="cil-check-alt"/>
                                </CButton>



                                <CButton
                                        class="float-right"
                                        color="danger"
                                        label="Rounds"
                                        size="sm"
                                        shape="pill"
                                        v-show="!mods.includes(mod)"
                                        @click="addMod(mod)"
                                >
                                    <CIcon name="cil-check-alt"/>
                                </CButton>



                            </CListGroupItem>
                        </CListGroup>
                    </CCardBody>
                </CCard>
            </CCol>

        </CRow>


    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: 'Modlist',
        props: {
            fields: {
                type: Array,
                default () {

                    return ['mod', 'guid', 'ip', {key: 'remaining', filter: false}, 'reason', {key: 'remove', filter: false}]
                }
            },
        },
        components: {

        },
        data () {
            return {
                mods: [],
                mods_active: [],
                mods_available: []

            }
        },
        methods: {
            reloadMods() {
                axios.get('instances/' + this.$route.params.id + '/mods')
                    .then((response) => {
                        //.join('|||').toLowerCase().split('|||')
                        this.mods = response.data.next
                        this.mods_active = response.data.running
                        this.mods_available = response.data.available
                    })
                    .catch(() => {
                        this.$notify({
                            group: 'foo',
                            type: 'error',
                            title: 'Error',
                            duration: 5000,
                            text: 'Unable to load mods'
                        });
                    })
            },
            getModColourModList(mod) {
                if(this.mods_active.includes(mod)) return "success"
                if(this.mods.includes(mod)) return "warning"
                else return "secondary"
            },
            removeMod(mod) {
                //this.$delete(this.mods, this.mods.indexOf(mod))
                axios.delete('instances/' + this.$route.params.id + '/mods/' + mod)
                    .then(() => {
                        this.reloadMods()
                    })
                    .catch((error) => {
                        this.$notify({
                            group: 'foo',
                            type: 'error',
                            title: 'Error',
                            duration: 5000,
                            text: 'Unable to remove mods<br>' + error
                        })
                        this.reloadMods()
                    })
            },
            addMod(mod) {
                axios.post('instances/' + this.$route.params.id + '/mods/' + mod)
                    .then(() => {
                        this.reloadMods()
                    })
                    .catch(() => {
                        this.$notify({
                            group: 'foo',
                            type: 'error',
                            title: 'Error',
                            duration: 5000,
                            text: 'Unable to add mods'
                        })
                        this.reloadMods()
                    })
            },
            reloadExtensions() {
                axios.patch('instances/' + this.$route.params.id + '/mods/reload')
                    .then(() => {
                        this.reloadMods()
                    })
                    .catch(() => {
                        this.$notify({
                            group: 'foo',
                            type: 'error',
                            title: 'Error',
                            duration: 5000,
                            text: 'Unable to reload mods'
                        })
                        this.reloadMods()
                    })
            }
        },
        mounted() {
            this.reloadMods()
        }
    }
</script>
