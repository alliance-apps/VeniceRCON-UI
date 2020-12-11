<script>
    import clonedeep from 'lodash.clonedeep'
    export default {
        name: 'CRenderFunction',
        props: {
            contentToRender: Array,
            flat: Boolean
        },
        computed: {
            copiedContent () {
                return clonedeep(this.contentToRender)
            },
            content () {
                if (!this.flat) {
                    return this.copiedContent
                } else {
                    return this.convertedContent[0]
                }
            },
            convertedContent () {
                return this.copiedContent.map(item => this.convertItem(item))
            }
        },
        methods: {
            convertItem (item) {
                if (typeof item === 'string') {
                    return item
                }
                let newItem = []
                newItem[0] = item._name || 'div'
                newItem[1] = {}
                newItem[1].props = this.getProps(item)


                if(newItem[1].props["name"] === "SERVERDIRECT") {
                    if(this.$route.params.id) return []
                    const instances = Object.keys(this.$store.state.instances)
                    const server = this.$store.state.instances[instances[newItem[1].props["to"]]]
                    if(!server) return []
                    if(server.state !== 2) return []
                    newItem[1].props["to"] = '/' + server.id + '/dashboard'
                    newItem[1].props["name"] = '#' + server.id + ' - ' + server.serverinfo.slots + '/' + server.serverinfo.totalSlots
                } else if(newItem[1].props["serverSpecific"] && newItem[1].props["to"]) {
                    if(newItem[1].props["permission"] && !this.$store.getters.hasPermission(newItem[1].props["permission"], this.$route.params.id)) return []
                    if(this.$route.params.id) newItem[1].props["to"] = newItem[1].props["to"].replace("#id", this.$route.params.id)
                    else return []
                }

                this.$options.renderFunctionOptions.forEach(option => {
                    //on option doesn't work, possible to use only nativeOn
                    if (item[`_${option}`]) {
                        newItem[1][option] = item[`_${option}`]
                    }
                })

                if (item._children) {
                    newItem[2] = item._children.map(item => this.convertItem(item))
                }

                return newItem
            },
            getProps (item) {
                return Object.keys(item).reduce((itemProps, key) => {
                    if (!key.includes('_')) {
                        itemProps[key] = item[key]
                    }
                    return itemProps
                }, {})
            }
        },
        renderFunctionOptions:  [
            'attrs',
            'directives',
            'on',
            'nativeOn',
            'class',
            'style',
            'domProps',
            'scopedSlots',
            'slot',
            'key',
            'ref',
            'refInFor'
        ],
        render (h) {
            const computeRenderFunction = (renderFunction) => {
                return renderFunction.map(item => {
                    if (Array.isArray(item)) {
                        return item.map(child => {
                            if (typeof child === 'string') {
                                return child
                            } else if (Array.isArray(child)) {
                                const el = computeRenderFunction(child)
                                return h(...el)
                            } else if (child.slot) {
                                return this.$scopedSlots[child.slot]()
                            }
                        })
                    }
                    return item
                })
            }

            if (Array.isArray(this.content) && this.content.length) {
                return h(...computeRenderFunction(this.content))
            } else {
                return h(false)
            }
        }
    }
</script>