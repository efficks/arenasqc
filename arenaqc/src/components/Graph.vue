<template>
    <VuePlotly :data="data" :layout="layout" :display-mode-bar="false"></VuePlotly>
</template>
  
<script setup lang="ts">
import { VuePlotly } from 'vue3-plotly'
import { ref, computed } from 'vue'
import { useStaticticsStore } from '@/stores/statistics'
import { useRegionStore } from '@/stores/region'

const statisticsStore = useStaticticsStore()
const regionStore = useRegionStore();

const data = computed(() => {
    let x: string[] = [];
    let y: number[] = [];

    let arenaPerCapita = statisticsStore.arenaPerCapita;
    arenaPerCapita.sort(function (a, b) {
        return ((a.hpa<b.hpa) ? 1:-1);
    })
    arenaPerCapita.forEach(stat => {
        let region = regionStore.regionByCode(stat.code);
        if (region !== undefined) {
            x.push(region.name);
            y.push(stat.hpa);
        }
    })

    return [{
        x: x,
        y: y,
        type: "bar"
    }];
});

const layout = ref({
    title: "Arénas par 100 000 habitants"
});
</script>
