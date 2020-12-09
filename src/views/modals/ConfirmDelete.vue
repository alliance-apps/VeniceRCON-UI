<template>
    <div>
        <CButton
                color="danger"
                variant="outline"
                square
                size="sm"
                :disabled="!hasPermission"
                @click="show = true"
        >
            <CIcon name="cil-trash"/>
        </CButton>
        <CModal
                title="Confirm deletion"
                color="danger"
                :show.sync="show"
        >
            {{ title }}
            <template #footer="{}">
                <CButton
                        :color="buttonColor"
                        @click="confirm()"
                >
                    Yes, delete
                </CButton>
            </template>
        </CModal>
    </div>
</template>

<script>

    export default {
        name: 'confirm-delete',
        props: [
            'title',
            'buttonColor',
            'confirmFunction',
            'arg',
            'hasPermission'
        ],
        components: {

        },
        data () {
            return {
                show: false
            }
        },
        methods: {
            confirm() {
                this.show = false
                this.confirmFunction(this.arg)
            }
        }
    }
</script>
