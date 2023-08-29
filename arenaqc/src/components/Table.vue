<template>
    <VDataTable items-per-page="-1" :items="data" items-per-page-text="Régions par page" page-text="{0}-{1} de {2}" :headers="headers as any" :sort-by="[{ key: 'aph', order: 'desc' }]" key="code">
        <template v-slot:item.population="{ item }">
            {{ item.columns.population.toLocaleString() }}
        </template>
        <template v-slot:item.arenas="{ item }">
            {{ item.columns.arenas.toLocaleString() }}
        </template>
        <template v-slot:item.aph="{ item }">
            {{ item.columns.aph.toLocaleString() }}
        </template>
    </VDataTable>
</template>
  
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStaticticsStore } from '@/stores/statistics'
import { useRegionStore } from '@/stores/region'
import { VDataTable } from 'vuetify/labs/VDataTable'
import { useArenaStore } from '@/stores/arena';

const statisticsStore = useStaticticsStore()
const regionStore = useRegionStore();
const arenaStore = useArenaStore();

const headers = ref([
    {
        title: 'Région',
        align: 'start',
        sortable: true,
        key: 'name',
    },
    {
        title: 'Population',
        align: 'end',
        sortable: true,
        key: 'population'
    },
    {
        title: 'Nombre d\'aréna',
        align: 'end',
        sortable: true,
        key: 'arenas',
    },
    {
        title: 'Aréna par 100k habitants',
        align: 'end',
        sortable: true,
        key: 'aph',
    },
]);

type ArenaData = {
    code: number,
    name: string,
    population: number,
    aph: number,
    arenas: number
};

const data = computed(() => {
    let arenaData:ArenaData[] = [];

    /*let arenaPerCapita = statisticsStore.arenaPerCapita;
    arenaPerCapita.sort(function (a, b) {
        return ((a.hpa<b.hpa) ? 1:-1);
    })*/
    statisticsStore.arenaPerCapita.forEach(stat => {
        let region = regionStore.regionByCode(stat.code);
        let nbArena = arenaStore.arenaPerRegion.get(stat.code)
        if (region !== undefined && nbArena !== undefined) {
            let d:ArenaData = {
                code: stat.code,
                name: region.name,
                population: region.population,
                aph: stat.hpa,
                arenas: nbArena
            }
            arenaData.push(d)
        }
    })

    return arenaData;
});
</script>
