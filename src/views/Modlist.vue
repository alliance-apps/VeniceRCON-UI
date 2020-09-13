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
                                        @click="reloadMods()"
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
                                    :color="getModColourModList(mod)"
                            >
                                <span class="align-middle">
                                    {{ mod }}
                                    <CBadge color="secondary" v-if="mods.includes(mod) && !mods_active.includes(mod)"> Pending activation on restart</CBadge>
                                    <CBadge color="danger" v-if="!mods.includes(mod) && mods_active.includes(mod)"> Pending removal on restart</CBadge>
                                </span>


                                <CButton
                                        class="float-right"
                                        color="success"
                                        label="Rounds"
                                        size="sm"
                                        shape="pill"
                                        v-if="mods.includes(mod)"
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
                                        v-if="!mods.includes(mod)"
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





        {{ mods }}



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
                this.mods = ["fairroundstart", "advancedrcon", "heinzketchup"]
                this.mods_active = ["fairroundstart", "advancedrcon"]
                this.mods_available = ["fairroundstart", "advancedrcon", "der-thorsten-mod", "heinzketchup"]
            },
            getModColourModList(mod) {
                if(this.mods_active.includes(mod)) return "success"
                if(this.mods.includes(mod)) return "warning"
                else return "secondary"
            },
            removeMod(mod) {
                this.$delete(this.mods, this.mods.indexOf(mod))
                //TODO: Make ACTUAL request
            },
            addMod(mod) {
                this.mods.push(mod)
                //TODO: Make ACTUAL request
            },
            reloadExtensions() {
                //TODO: Reload extensions (also, maybe display user with warning)
            }
        },
        mounted() {
            this.reloadMods()
        }
    }
</script>
