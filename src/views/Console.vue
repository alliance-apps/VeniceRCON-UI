<template>
    <div>
        <CCard>
            <CCardHeader>
                <slot name="header" >
                    <CIcon name="cil-list"/> <b>Console</b>
                </slot>
            </CCardHeader>
            <CCardBody>
                <form @submit.prevent="sendCommand()">
                    <CRow>
                        <CCol sm="10">
                            <CInput
                                    placeholder="Enter message"
                                    :value.sync="rawSendCommand"
                            />
                        </CCol>
                        <CCol sm="2">
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

                <div v-for="(command, key) in commandsFiltered" :key="key">
                    [{{ command.created.toLocaleDateString('en-GB') }} {{ command.created.toLocaleTimeString('en-GB') }}]
                    <span :style="cssColorForCommand(command.type)"><span v-for="(word, key) in command.words" :key="key">{{ word }} </span></span>
                    <br>
                </div>

            </CCardBody>
        </CCard>

    </div>
</template>

<script>
    import axios from "axios";
    const regex = /(?:[^\s"]+|"[^"]*")+/g

    export default {
        name: 'Console',
        components: {
        },
        data () {
            return {
                hideServerInfo: false,
                commands: [],
                rawSendCommand: ''
            }
        },
        mounted() {
            /** this payload enables raw console commands to be received */
            this.$store.state.socketCon.on("INSTANCE#CONSOLE", this.receiveCommand)
            const payload = {
                instance: parseInt(this.$route.params.id),
                name: "raw",
                set: true
            }
            this.$store.state.socketCon.emit("SELF#CMD_FEATURE", payload)
        },
        destroyed() {
            /** this payload disabled raw console commands to be received */
            this.$store.state.socketCon.emit("SELF#CMD_FEATURE", {
                instance: parseInt(this.$route.params.id),
                name: "raw",
                set: false
            })
        },
        computed: {
            commandsFiltered() {
                return this.commands
            },

        },
        methods: {
            cssColorForCommand(type) {
                if(type === 'receive') return 'color: #0000cc'
                return 'color: #00cc00'
            },
            receiveCommand(event) {
                event.created = new Date()
                this.commands.unshift(event)
                if(this.commands.length > 150) {
                    this.commands.pop()
                }
            },
            sendCommand() {
                let words = []
                let m;
                while ((m = regex.exec(this.rawSendCommand)) !== null) {
                    if (m.index === regex.lastIndex) {
                        regex.lastIndex++;
                    }
                    m.forEach((match) => {
                        match = match.replace('"', '')
                        words.push(match)
                    });
                }
                axios.post('instances/' + this.$route.params.id + '/raw', {words: words})
                    .then(() => {

                    })
                    .catch((error) => {
                        if(error.response) {
                            this.$notify({
                                group: 'foo',
                                type: 'error',
                                title: 'Error sending command',
                                duration: 5000,
                                text: error.response.data.message
                            });
                        } else {
                            this.$notify({
                                group: 'foo',
                                type: 'error',
                                title: 'Error sending command',
                                duration: 5000,
                                text: 'Something went wrong'
                            });
                        }

                    })
                this.rawSendCommand = ''



            },
        }
    }
</script>