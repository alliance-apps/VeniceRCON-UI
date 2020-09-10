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
        <CDropdownItem v-for="(instance, key) in $store.state.instances" :to="'/' + instance.id + '/players'">#{{ key }} {{ instance.serverinfo.name || "Not connected" }} ({{ ($store.state.instances[$route.params.id].serverinfo.address || ('(Not connected)')) }})</CDropdownItem>
      </CDropdown>


      <TheHeaderDropdownAccnt/>
    </CHeaderNav>
    <CSubheader class="px-3" v-if="this.$route.params.id">
      <ol class="border-0 mb-0 breadcrumb">
        <li class="p-1 d-none d-md-block"><img src="https://eaassets-a.akamaihd.net/bl-cdn/cdnprefix/production-284-20170531/public/base/bf3/map_images/146x79/mp_013.jpg" height="25px"></li>
        <li class="breadcrumb-item p-1"><b>Strike at Karkand</b></li>
        <li class="breadcrumb-item p-1">Conquest Assault (alt.)</li>
        <li class="breadcrumb-item p-1 d-none d-md-block"><CIcon name="cif-us"/> 50 <CIcon name="cif-ru"/> 50</li>
        <li class="breadcrumb-item p-1 d-none d-md-block"><b>Duration</b> 2h 35min</li>
        <li class="breadcrumb-item p-1 d-none d-md-block"><b>Round</b> 1/2</li>
        <li class="breadcrumb-item p-1 d-none d-md-block"><b>Next Map</b> Damavand Peak (Rush)</li>
        <li class="breadcrumb-item p-1 d-none d-md-block"><b>Uptime</b> 1d 23h</li>

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

  }
}
</script>
