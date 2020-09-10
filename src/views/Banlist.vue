<template>
    <div>
        <CCard>
            <CCardHeader>
                <slot name="header">
                    <CIcon name="cil-ban"/> <b>Bans</b>


                </slot>
            </CCardHeader>
            <CCardBody>
                <CDataTable

                        bordered
                        :items="bans"
                        :fields="fields"
                        hover
                >


                    <template #name="{item}">
                        <td class="py-2" >
                            <span v-if="item.subset[0] == 'name'">{{ item.subset[1] }}</span>
                        </td>
                    </template>

                    <template #guid="{item}">
                        <td class="py-2">
                           <span v-if="item.subset[0] == 'guid'"> {{ item.subset[1] }}</span>
                        </td>
                    </template>

                    <template #ip="{item}">
                        <td class="py-2">
                            <span v-if="item.subset[0] == 'ip'">{{ item.subset[1] }}</span>
                        </td>
                    </template>

                    <template #remaining="{item}">
                        <td class="py-2">
                            <span v-if="item.timeout[0] == 'perm'">Permanent</span>
                            <span v-else>{{ Math.round(item.timeout[1] / 3600) }}h</span>
                        </td>
                    </template>

                    <template #remove="{item}">
                        <td class="py-2">
                            <CButton
                                    color="primary"
                                    variant="outline"
                                    square
                                    size="sm"
                                    @click="removeBan(item.subset[0], item.subset[1])"
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

    export default {
        name: 'Banlist',
        props: {
            fields: {
                type: Array,
                default () {

                    return ['name', 'guid', 'ip', 'remaining', 'reason', 'remove']
                }
            },
        },
        components: {

        },
        data () {
            return {
                bans: []
            }
        },
        methods: {
            removeBan(subset, id) {
                alert(subset + ' - ' + id)
                axios.delete('instances/' + this.$route.params.id + '/bans', {subset: subset, id: id})
                    .then((response) => {
                        console.log(response)
                    })
                    .catch(() => {
                        alert("We couldnt log you in because fuck you")
                    })
            },
        },
        mounted() {
            axios.get('instances/' + this.$route.params.id + '/bans')
                .then((response) => {
                    this.bans = response.data
                })
                .catch(() => {
                    alert("We couldnt log you in because fuck you")
                })
        }
    }
</script>
