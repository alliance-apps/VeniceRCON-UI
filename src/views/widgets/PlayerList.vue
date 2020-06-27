<template>
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
                    :items="items"
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
            </CDataTable>
        </CCardBody>
    </CCard>
</template>

<script>
    export default {
        name: 'PlayerList',
        props: {
            items: Array,
            fields: {
                type: Array,
                default () {
                    return ['ID', 'name', 'Squad', 'Score', 'Kills', 'Deaths', 'K/D', 'Ping', 'Playtime']
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
            dark: Boolean
        },
        methods: {
            getBadge (status) {
                return status === 'Active' ? 'success'
                    : status === 'Inactive' ? 'secondary'
                        : status === 'Pending' ? 'warning'
                            : status === 'Banned' ? 'danger' : 'primary'
            }
        }
    }
</script>
