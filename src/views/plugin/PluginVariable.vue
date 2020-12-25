<template>
    <div v-show="condition">

        <div v-if="meta.type === 'string' && !meta.multiline">
            <CInput
                    :value.sync="obj[meta.name]"
                    :label="meta.name"
                    :description="meta.description"
            />
        </div>
        <div v-else-if="meta.type === 'string' && meta.multiline">
            <CTextarea
                    :value.sync="obj[meta.name]"
                    :label="meta.name"
                    :description="meta.description"
            />
        </div>
        <div v-else-if="meta.type === 'strings-element'">
            <CRow>
                <CCol sm="11">
                    <CInput
                            :value.sync="obj[meta.name]"
                    >
                    </CInput>
                </CCol>
                <CCol sm="1">
                    <CButton
                            @click="deleteFromArray(meta.name)"
                            color="danger"
                            block
                            size="sm"
                    >
                        <CIcon name="cil-trash"/>
                    </CButton>
                </CCol>
            </CRow>

        </div>
        <div v-else-if="meta.type === 'number'">
            <CInput
                    type="string"
                    :value.sync="obj[meta.name]"
                    :label="meta.name"
                    :description="meta.description"
            />
        </div>
        <div v-else-if="meta.type === 'boolean'">
            <CInputCheckbox
                    :checked.sync="obj[meta.name]"
                    :label="meta.name"
                    :custom="true"
                    :description="meta.description"
            />
        </div>
        <div v-else-if="meta.type === 'select'">
            <CSelect
                    :value.sync="obj[meta.name]"
                    :options="selectValues"
                    :label="meta.name"
                    :description="meta.description"
            />
        </div>
        <div v-else-if="meta.type === 'strings'">
            <br>
            <CRow>
                <CCol sm="2">
                    <CButton
                            @click="collapse = !collapse"
                            color="primary"
                            class="mb-2"
                    >
                        <CIcon name="cil-plus"/>
                        {{ meta.name }}
                    </CButton>
                </CCol>
                <CCol sm="10">
                    <small>{{ meta.description }}</small>
                </CCol>
            </CRow>


            <CCollapse :show="collapse">
                <CCard body-wrapper>
                    <div v-for="(variable, key) in obj[meta.name]" :key="key">
                        <plugin-variable
                                :meta="{name: key, description: '', type: 'strings-element', conditions: [], default: []}"
                                :obj="obj[meta.name]"
                                :delete-from-array="deleteStringFromArray"
                        ></plugin-variable>
                    </div>
                    <CButton
                            @click="obj[meta.name].push('')"
                            color="primary"
                            size="sm"
                    >
                        <CIcon name="cil-plus"/>
                    </CButton>
                </CCard>
            </CCollapse>
        </div>
        <div v-else-if="meta.type === 'array'">
            <br>
            <CRow>
                <CCol sm="2">
                    <CButton
                            @click="collapse = !collapse"
                            color="primary"
                            class="mb-2"
                    >
                        <CIcon name="cil-plus"/>
                        {{ meta.name }}
                    </CButton>
                </CCol>
                <CCol sm="10">
                    <small>{{ meta.description }}</small>
                </CCol>
            </CRow>

            <CCollapse :show="collapse">
                <CCard body-wrapper>
                    <div v-for="variable in meta.vars" :key="variable.name">
                        <plugin-variable
                                :meta="variable"
                                :obj="obj[meta.name]"
                        ></plugin-variable>
                    </div>

                </CCard>
            </CCollapse>
        </div>


        <div v-else><br>{{ meta.type }} {{ meta.name }} can't be rendered<br><br></div>


    </div>
</template>

<script>
    export default {
        name: 'PluginVariable',
        props: [
            'meta',
            'obj',
            'deleteFromArray'
        ],
        data () {
            return {
                collapse: false
            }
        },
        computed: {
            condition() {
                if(this.meta.conditions.length === 0) return true
                for(const orConditions in this.meta.conditions) {
                    let currentCondition = true
                    for(const andCondition in this.meta.conditions[orConditions]) {
                        currentCondition = this.meta.conditions[orConditions][andCondition] === this.obj[andCondition]
                        if(!currentCondition) break
                    }
                    if(currentCondition) return true
                }
                return false
            },
            selectValues() {
                let options = []
                for(const optionKey in this.meta.options) {
                    options.push({
                        label: this.meta.options[optionKey],
                        value: optionKey
                    })
                }
                return options
            }
        },
        methods: {
            deleteStringFromArray(index) {
                this.obj[this.meta.name] = this.obj[this.meta.name].filter((str, key) => {return key !== index})
            }
        }


    }
</script>
