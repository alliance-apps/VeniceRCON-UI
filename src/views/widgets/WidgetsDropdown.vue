<template>
  <CRow>
    <CCol sm="6" lg="3">
      <MapRoundWidget color="primary" :header="this.$store.state.instances[$store.state.activeServer].serverinfo.map" :text="this.$store.state.instances[$store.state.activeServer].serverinfo.mode" style="background-image: linear-gradient( rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45) ), url('https://vignette.wikia.nocookie.net/battlefield/images/5/5d/DAMAVANDPEAK_SC1.jpg/revision/latest/scale-to-width-down/1000?cb=20111013174245'); background-repeat: no-repeat; background-size: cover;">
        <template #default>
          <CDropdown
            color="transparent p-0"
            placement="bottom-end"
          >
            <template #toggler-content>
              <CIcon name="cil-location-pin"/>
            </template>
            <CDropdownItem>Restart round</CDropdownItem>
            <CDropdownItem>Run next round</CDropdownItem>
          </CDropdown>
        </template>
        <template #footer>
          <div class="card-body row text-center">
            <div class="col">
              <div  class="text-value-lg">
                {{ $store.state.instances[$store.state.activeServer].serverinfo.scores[0] }}
              </div>
              <div  class="text-uppercase text-muted small">
                US
              </div>
            </div>
            <div class="c-vr"></div>
            <div class="col">
              <div  class="text-value-lg">
                {{ $store.state.instances[$store.state.activeServer].serverinfo.scores[1] }}
              </div>
              <div  class="text-uppercase text-muted small">
                RU
              </div>
            </div>
          </div>
        </template>
      </MapRoundWidget>
    </CCol>
    <CCol sm="6" lg="3">
      <CWidgetDropdown color="info" header="36/64" text="Players online">
        <template #default>
          <CDropdown
            color="transparent p-0"
            placement="bottom-end"
            :caret="false"
          >
            <template #toggler-content>
              <CIcon name="cil-location-pin"/>
            </template>
            <CDropdownItem>Action</CDropdownItem>
            <CDropdownItem>Another action</CDropdownItem>
            <CDropdownItem>Something else here...</CDropdownItem>
            <CDropdownItem disabled>Disabled action</CDropdownItem>
          </CDropdown>
        </template>
        <template #footer>
          <br>.<br>
        </template>
      </CWidgetDropdown>
    </CCol>
    <CCol sm="6" lg="3">
      <CWidgetDropdown
        color="warning"
        header="9.823"
        text="Members online"
      >
        <template #default>
          <CDropdown
            color="transparent p-0"
            placement="bottom-end"
          >
            <template #toggler-content>
              <CIcon name="cil-settings"/>
            </template>
            <CDropdownItem>Action</CDropdownItem>
            <CDropdownItem>Another action</CDropdownItem>
            <CDropdownItem>Something else here...</CDropdownItem>
            <CDropdownItem disabled>Disabled action</CDropdownItem>
          </CDropdown>
        </template>
        <template #footer>

        </template>
      </CWidgetDropdown>
    </CCol>
    <CCol sm="6" lg="3">
      <CWidgetDropdown
        color="danger"
        header="9.823"
        text="Members online"
      >
        <template #default>
          <CDropdown
            color="transparent p-0"
            placement="bottom-end"
          >
            <template #toggler-content>
             <CIcon name="cil-settings"/>
            </template>
            <CDropdownItem>Action</CDropdownItem>
            <CDropdownItem>Another action</CDropdownItem>
            <CDropdownItem>Something else here...</CDropdownItem>
            <CDropdownItem disabled>Disabled action</CDropdownItem>
          </CDropdown>
        </template>
        <template #footer>

        </template>
      </CWidgetDropdown>
    </CCol>
  </CRow>
</template>

<script>
import { CChartLineSimple, CChartBarSimple } from '../charts/index.js'
import MapRoundWidget from "../base/MapRoundWidget";

export default {
  name: 'WidgetsDropdown',
  components: {MapRoundWidget, CChartLineSimple, CChartBarSimple }
}
</script>
