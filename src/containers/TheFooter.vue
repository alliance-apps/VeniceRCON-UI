<template>
  <CFooter :fixed="false">
    <div>
      <a href="https://rcon.cloud" target="_blank">VeniceRCON</a>
      <span class="ml-1">&copy; {{new Date().getFullYear()}} Multivitamin and cat24max.</span>
    </div>
    <div class="ml-auto">
      <span class="mr-1">Powered by</span>
      <a href="https://allianceapps.io/" target="_blank">AllianceApps</a>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>
