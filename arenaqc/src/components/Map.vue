<template>
    <div style="height:800px;">
        <l-map ref="map" v-model:zoom="zoom" :use-global-leaflet="false" v-model:center="(center as any)">
            <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base"
                name="OpenStreetMap"></l-tile-layer>

            <l-marker v-for="arena in get_arenas.value" :lat-lng="arena.coordinate">
                <l-popup>
                    {{ arena.name }}
                    <v-icon icon="mdi-hand-back-left"></v-icon>
                </l-popup>
            </l-marker>

            <l-geo-json :geojson="regionStore.regionShape" :options-style="regionStyle"></l-geo-json>
        </l-map>
    </div>
</template>
  
<script setup lang="ts">
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LPopup, LGeoJson } from "@vue-leaflet/vue-leaflet";
import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import { storeToRefs } from 'pinia'
import {scale} from "chroma-js";
import { useArenaStore } from '@/stores/arena'
import type { Arena } from '@/stores/arena'
import { useRegionStore } from '@/stores/region'
import { useStaticticsStore } from '@/stores/statistics'
//import type { Region } from '@/stores/region'

const zoom = ref(6)
const center = ref([49.76707407366792, -68.55464239689069])
const arenaStore = useArenaStore()
const regionStore = useRegionStore()
const statisticsStore = useStaticticsStore()

const { arenas } = storeToRefs(arenaStore)
arenaStore.fetchArenas()
regionStore.fetchRegions()

const get_arenas = computed(() => {
    let arenaList: Ref<Arena[]> = ref([]);
    arenas.value.forEach(a => {
        arenaList.value.push(a);
    });
    return arenaList;
});

const region_ = computed(() => {
    let arenaList: Ref<Arena[]> = ref([]);
    arenas.value.forEach(a => {
        arenaList.value.push(a);
    });
    return arenaList;
});

function regionStyle(region: any)
{
    let code = parseInt(region.properties.RES_CO_REG);
    let stat = statisticsStore.arenaPerCapitaByRegion(code);
    let s = scale(['red','blue']).mode('lab').domain([statisticsStore.minCapita,statisticsStore.maxCapita]);;
    return {color: s(stat?.hpa).hex()};
}


</script>
  
<style></style>