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
      <CHeaderNavItem class="d-md-down-none mx-2">
        <CHeaderNavLink>
          <CIcon name="cil-bell"/>
        </CHeaderNavLink>
      </CHeaderNavItem>
      <CHeaderNavItem class="d-md-down-none mx-2">
        <CHeaderNavLink>
          <CIcon name="cil-list"/>
        </CHeaderNavLink>
      </CHeaderNavItem>
<!--
      <CDropdown
              color="default"
              :toggler-text="($store.state.instances[$store.state.activeServer].serverinfo.name || $store.state.instances[$store.state.activeServer].host) + ' ' + ($store.state.instances[$store.state.activeServer].serverinfo.address || ('(Not connected)'))"
              class="m-2"
      >
        <CDropdownItem v-for="(instance, key) in $store.state.instances" @click="$store.commit('updatePersistent', ['activeServer' , key])">#{{ key }} {{ instance.serverinfo.name || "Not connected" }} ({{ instance.host }})</CDropdownItem>
      </CDropdown>
-->

      <TheHeaderDropdownAccnt/>
    </CHeaderNav>
    <CSubheader class="px-3">
      <CBreadcrumbRouter class="border-0 mb-0"/>
    </CSubheader>
  </CHeader>
</template>

<script>
import TheHeaderDropdownAccnt from './TheHeaderDropdownAccnt'
import store from "../store";
import axios from "axios";

export default {
  name: 'TheHeader',
  components: {
    TheHeaderDropdownAccnt
  },
  methods: {
    change: function(newid) {

    }
  }
}
</script>
