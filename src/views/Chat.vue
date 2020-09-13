<template>
    <div>
        <CCard>
            <CCardHeader>
                <slot name="header">
                    <CIcon name="cil-chat-bubble"/> <b>Chat</b>


                </slot>
            </CCardHeader>
            <CCardBody>
                <span v-for="chat in $store.state.chats[$route.params.id]">[{{ chat.created.toLocaleTimeString('en-GB') }}] <b>{{ chat.name + ' @ ' + chat.subset }}:</b> {{ chat.message }}<br></span>

                <form @submit.prevent="sendMessage()" v-if="$store.getters.hasPermission['PLAYER#MESSAGE']">
                    <br>
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
                                    label="Rounds"
                            >
                                Send
                            </CButton>
                        </CCol>
                    </CRow>
                </form>

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
                if(this.sendmessage.subset == "all") {
                    subset = "all"
                    subsetId = "0"
                }
                if(this.sendmessage.subset == "team-us") {
                    subset = "team"
                    subsetId = "1"
                }
                if(this.sendmessage.subset == "team-ru") {
                    subset = "team"
                    subsetId = "2"
                }
                axios.post('instances/' + this.$route.params.id + '/message', {message: this.sendmessage.message, subset: subset, subsetId: subsetId, yell: this.sendmessage.yell})
                    .then((response) => {
                        this.sendmessage.message = ""
                    })
                    .catch(() => {
                        alert("We couldnt log you in because fuck you")
                    })
            }
        }
    }
</script>
