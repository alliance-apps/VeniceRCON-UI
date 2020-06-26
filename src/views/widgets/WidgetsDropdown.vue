<template>
  <CRow>
    <CCol sm="6" lg="3" style="height: 225px;">
      <!-- this.$bf3_getMapDisplayName(this.$store.state.instances[$route.params.id].serverinfo.map) -->
      <MapRoundWidget
              class="h-75"
              color="primary"
              :text="this.$bf3_getGamemodeDisplayName(this.$store.state.instances[$route.params.id].serverinfo.mode)"
              :header="this.$bf3_getMapDisplayName(this.$store.state.instances[$route.params.id].serverinfo.map)"
              :style="'background-image: linear-gradient( rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45) ), url(\'' + this.$bf3_getMapImage(this.$store.state.instances[$route.params.id].serverinfo.map) +  '\'); background-repeat: no-repeat; background-size: cover;'"
      >
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
            <CDropdownItem>End round (US wins)</CDropdownItem>
            <CDropdownItem>End round (RU wins)</CDropdownItem>
          </CDropdown>
        </template>
        <template #footer>
          <div class="card-body row text-center">
            <div class="col">
              <div  class="text-value-lg">
                {{ $store.state.instances[$route.params.id].serverinfo.scores[0] || "&#8734;" }}
              </div>
              <div  class="text-uppercase text-muted small">
                US
              </div>
            </div>
            <div class="c-vr"></div>
            <div class="col">
              <div  class="text-value-lg">
                {{ $store.state.instances[$route.params.id].serverinfo.scores[1] || "&#8734;" }}
              </div>
              <div  class="text-uppercase text-muted small">
                RU
              </div>
            </div>

            <!--
            <div class="c-vr"></div>
            <div class="col">
              <div  class="text-value-lg">
                {{ $store.state.instances[$route.params.id].serverinfo.roundsPlayed + '/' + $store.state.instances[$route.params.id].serverinfo.roundsTotal }}
              </div>
              <div  class="text-uppercase text-muted small">
                Rounds
              </div>
            </div>

            <div class="c-vr"></div>
            <div class="col">
              <div  class="text-value-lg">
                {{ $store.state.instances[$route.params.id].serverinfo.roundsPlayed + '/' + $store.state.instances[$route.params.id].serverinfo.roundsTotal }}
              </div>
              <div  class="text-uppercase text-muted small">
                Rounds
              </div>
            </div>
            -->
          </div>


        </template>
      </MapRoundWidget>
    </CCol>

    <CCol sm="6" lg="3" style="height: 225px;">
      <CWidgetDropdown
              class="h-75"
              color="warning"
              :header="$store.state.instances[$route.params.id].serverinfo.slots + '/' + $store.state.instances[$route.params.id].serverinfo.totalSlots"
              text="Players online"
      >
        <template #default>
          <!--<CDropdown
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
          </CDropdown>-->
        </template>
        <template #footer>
          <CChartLineSimple
                  class="mt-3"
                  style="height:70px"
                  background-color="rgba(255,255,255,.2)"
                  :data-points="[78, 81, 80, 45, 34, 12, 40]"
                  :options="{ elements: { line: { borderWidth: 2.5 }}}"
                  point-hover-background-color="warning"
                  label="Members"
                  labels="months"
          />
        </template>
      </CWidgetDropdown>
    </CCol>

    <CCol sm="6" lg="3" style="height: 225px;">
      <CWidgetDropdown color="info" header="Serverinfo" class="h-75">
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
          <ul>
            <li><b>Uptime: </b>{{ $store.state.instances[$route.params.id].serverinfo.uptime }} seconds</li>
            <li><b>Roundtime: </b>{{ $store.state.instances[$route.params.id].serverinfo.roundTime }} seconds</li>
            <li><b>Address: </b>{{ $store.state.instances[$route.params.id].serverinfo.address }}</li>
            <li><b>Tickrate</b>: 120Hz</li>
          </ul>
        </template>
      </CWidgetDropdown>
    </CCol>


    <CCol sm="6" md="3" style="height: 225px;">
      <CCard  class="h-75">

        <CCardBody style="text-align: center;">
          cat24max <b>[ACB-90]</b> voteban_flash<br>
          voteban_flash <b>[M16A3]</b> Multivitamin<br>
          <b>uveuveuveuve</b> joined<br>
          cat24max <b>[SUICIDE]</b><br>
          cat24max <b>[Z11-W]</b> voteban_flash<br>
          JamesHolden <b>[NOOBTUBE]</b> voteban_flash<br>

        </CCardBody>
      </CCard>
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
