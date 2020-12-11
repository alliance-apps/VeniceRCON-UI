<template>
    <CHeader fixed with-subheader light>
        <CToggler
                in-header
                class="ml-3 d-lg-none"
                @click="$store.commit('toggleSidebarMobile')"
        />
        <CToggler
                in-header
                class="ml-3 d-md-down-none"
                @click="$store.commit('toggleSidebarDesktop')"
        />
        <CHeaderBrand class="mx-auto d-lg-none" to="/">
            <CIcon name="logo" height="48" alt="Logo"/>
        </CHeaderBrand>
        <CHeaderNav class="d-md-down-none mr-auto">


        </CHeaderNav>
        <CHeaderNav class="mr-4">
            <!--
            <CHeaderNavItem class="d-md-down-none mx-2">
              <CHeaderNavLink>
                <CIcon name="cil-bell"/>
              </CHeaderNavLink>
            </CHeaderNavItem>-->

            <CHeaderNavItem class="d-md-down-none mx-2">

            </CHeaderNavItem>

            <CDropdown
                    v-if="$route.params.id && $store.state.instances[$route.params.id]"
                    color="default"
                    :toggler-text="($store.state.instances[$route.params.id].serverinfo.name || $store.state.instances[$route.params.id].host)"
                    class="m-2  d-none d-md-block"
            >
                <CDropdownItem v-for="(instance, key) in $store.state.instances" :to='$router.history.current.path.replace("/" + $route.params.id + "/", "/" + instance.id +"/")'>#{{ key }} {{ instance.serverinfo.name || "Not connected" }} ({{ ($store.state.instances[$route.params.id].serverinfo.address || ('(Not connected)')) }})</CDropdownItem>
            </CDropdown>


            <TheHeaderDropdownAccnt/>
        </CHeaderNav>
        <CSubheader class="px-3" v-if="this.$route.params.id && $store.state.instances[$route.params.id]">
            <ol class="border-0 mb-0 breadcrumb">
                <li class="p-1 d-none d-md-block"><img :src="'https://eaassets-a.akamaihd.net/bl-cdn/cdnprefix/production-284-20170531/public/base/bf3/map_images/146x79/' + $store.state.instances[$route.params.id].serverinfo.map.toLowerCase() + '.jpg'" height="25px"></li>
                <li class="breadcrumb-item p-1"><b>{{ $bf3_getMapDisplayName($store.state.instances[$route.params.id].serverinfo.map) }}</b></li>
                <li class="breadcrumb-item p-1">{{ $bf3_getGamemodeDisplayName($store.state.instances[$route.params.id].serverinfo.mode) }}</li>
                <li class="breadcrumb-item p-1 d-none d-md-block" v-if="$store.state.instances[$route.params.id].serverinfo.scores[0]">
                    <CIcon name="cif-us"/>
                    {{ $store.state.instances[$route.params.id].serverinfo.scores[0] }}
                    <CIcon name="cif-ru"/>
                    <span v-if="$store.state.instances[$route.params.id].serverinfo.mode != 'RushLarge0'"> {{ $store.state.instances[$route.params.id].serverinfo.scores[1] }}</span>
                    <span v-else> &#8734;</span>
                </li>
                <li class="breadcrumb-item p-1 d-none d-md-block"><b>Duration</b> {{ getTimeHumanReadable($store.state.instances[$route.params.id].serverinfo.roundTime) }}</li>
                <li class="breadcrumb-item p-1 d-none d-md-block"><b>Round</b> {{ $store.state.instances[$route.params.id].serverinfo.roundsPlayed + 1 }}/{{ $store.state.instances[$route.params.id].serverinfo.roundsTotal}}</li>
                <li class="breadcrumb-item p-1 d-none d-md-block" v-if="$store.state.instances[$route.params.id].maps.length > 0"><b>Next Map</b> {{ $bf3_getMapDisplayName($store.state.instances[$route.params.id].maps[$store.state.instances[$route.params.id].mapInfo.next].map) }} ({{ $bf3_getGamemodeDisplayName($store.state.instances[$route.params.id].maps[$store.state.instances[$route.params.id].mapInfo.next].mode) }})</li>
                <li class="breadcrumb-item p-1 d-none d-md-block"><b>Uptime</b> {{ getTimeHumanReadable($store.state.instances[$route.params.id].serverinfo.uptime) }}</li>

            </ol>


        </CSubheader>
    </CHeader>
</template>

<script>
    import TheHeaderDropdownAccnt from './TheHeaderDropdownAccnt'

    export default {
        name: 'TheHeader',
        components: {
            TheHeaderDropdownAccnt
        },
        methods: {
            getTimeHumanReadable(seconds) {
                if(seconds < 60) {
                    return seconds + ' sec'
                } else if(seconds < 3600) {
                    return Math.round(seconds / 60) + ' min'
                } else {
                    const minutes = Math.round(seconds / 60)
                    const hours = Math.round(minutes / 60)
                    const minutesRest = minutes % 60
                    if(minutesRest > 9) return hours + ':' + minutesRest + 'h'
                    else return hours + ':0' + minutesRest + ''
                }
            }
        }
    }
</script>
