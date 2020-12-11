<template>
  <CDropdown
    inNav
    class="c-header-nav-items"
    placement="bottom-end"
    add-menu-classes="pt-0"
  >
    <template #toggler>
      <CHeaderNavLink>
        <div class="c-avatar">
          <img
            src="https://cdn.allianceapps.io/img/default-avatar-36.webp"
            class="c-avatar-img "
          />
        </div>
      </CHeaderNavLink>
    </template>
    <CDropdownHeader tag="div" class="text-center" color="light">
      <strong>Account</strong>
    </CDropdownHeader>
    <CDropdownItem @click="$router.push('/profile')">
      <CIcon name="cil-user" /> Profile ({{ $store.state.user.username }})
    </CDropdownItem>
    <CDropdownHeader
      tag="div"
      class="text-center"
      color="light"
      v-show="$store.getters.hasInstanceUserPermissions() || $store.getters.hasPermission('PLUGINREPOSITORY#ACCESS', $route.params.id)"
    >
      <strong>Settings</strong>
    </CDropdownHeader>

    <CDropdownItem @click="$router.push('/usermanagement')" v-show="$store.getters.hasInstanceUserPermissions()">
      <CIcon name="cil-user" /> User management
    </CDropdownItem>
    <CDropdownItem @click="$router.push('/repository')" v-show="$store.getters.hasPermission('PLUGINREPOSITORY#ACCESS', $route.params.id)">
      <CIcon name="cil-file" /> Repositories
    </CDropdownItem>
    <CDropdownDivider/>
    <CDropdownItem @click="$store.commit('setJwtToken', null); $router.push('/loading')" >
      <CIcon name="cil-account-logout" /> Logout
    </CDropdownItem>
  </CDropdown>
</template>

<script>
  import { freeSet } from '@coreui/icons'
export default {
  freeSet,
  name: 'TheHeaderDropdownAccnt',
  data () {
    return { 
      itemsCount: 42
    }
  }
}
</script>

<style scoped>
  .c-icon {
    margin-right: 0.3rem;
  }
</style>