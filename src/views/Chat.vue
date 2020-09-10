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
            </CCardBody>
        </CCard>
    </div>
</template>

<script>
    export default {
        name: 'Chat',
        components: {

        },
        data () {
            return {}
        },
        methods: {

        }
    }
</script>
