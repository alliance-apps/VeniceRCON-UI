<template>
    <div>
        <CCard>
            <CCardHeader>
                <slot name="header">
                    <CIcon name="cil-chat-bubble"/> <b>Chat</b>


                </slot>
            </CCardHeader>
            <CCardBody>

                <form @submit.prevent="sendMessage()" v-show="$store.getters.hasPermission('PLAYER#MESSAGE', $route.params.id)">
                    <CRow>
                        <CCol sm="7">
                            <CInput
                                    placeholder="Enter message"
                                    :value.sync="sendmessage.message"
                            />
                        </CCol>
                        <CCol sm="2">
                            <CSelect
                                    :value.sync="sendmessage.subset"
                                    :options="[{value: 'all', label: 'All players'}, {value: 'team-us', label: 'US (Attackers)'}, {value: 'team-ru', label: 'RU (Defenders)'}]"
                            />
                        </CCol>
                        <CCol sm="2">
                            <CSelect
                                    :value.sync="sendmessage.yell"
                                    :options="[{value: false, label: 'Say (Chat)'}, {value: true, label: 'Yell'}]"
                            />
                        </CCol>
                        <CCol sm="1">
                            <CButton
                                    type="submit"
                                    block
                                    color="success"
                            >
                                Send
                            </CButton>
                        </CCol>
                    </CRow>
                </form>

                <span v-for="chat in $store.state.chats[$route.params.id]" :key="chat.id">[{{ chat.created.toLocaleDateString('en-GB') }} {{ chat.created.toLocaleTimeString('en-GB') }}] <b>{{ chat.name + ' @ ' + chat.subset }}:</b> {{ chat.message }}<br></span>

            </CCardBody>
        </CCard>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: 'Chat',
        components: {

        },
        data () {
            return {
                sendmessage: {
                    message: "",
                    subset: "all",
                    yell:false
                }
            }
        },
        methods: {
            sendMessage() {
                let subset, subsetId
                if(this.sendmessage.subset === "all") {
                    subset = "all"
                    subsetId = "0"
                }
                if(this.sendmessage.subset === "team-us") {
                    subset = "team"
                    subsetId = "1"
                }
                if(this.sendmessage.subset === "team-ru") {
                    subset = "team"
                    subsetId = "2"
                }
                axios.post('instances/' + this.$route.params.id + '/message', {message: this.sendmessage.message, subset: subset, subsetId: subsetId, yell: this.sendmessage.yell})
                    .then(() => {
                        this.sendmessage.message = ""
                    })
                    .catch(() => {

                    })
            }
        }
    }
</script>
