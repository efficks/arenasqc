// Utilities
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import { useArenaStore } from '@/stores/arena'
import { useRegionStore } from '@/stores/region'

export type RegionStatistic = {
  code: number
  hpa: number
}

export const useStaticticsStore = defineStore('statistics', () => {
  const regionStore = useRegionStore()
  const arenaStore = useArenaStore()
  const minCapita: Ref<number> = ref(Number.MAX_VALUE);
  const maxCapita: Ref<number> = ref(0);

  const arenaPerCapita = computed(() =>{
    let stat:RegionStatistic[] = [];

    regionStore.regions.forEach(region => {
      let apr = arenaStore.arenaPerRegion.get(region.code);
      let hpa = -1;
      if(apr !== undefined){
        hpa = apr /region.population*100000;
      }
      minCapita.value = Math.min(minCapita.value, hpa)
      maxCapita.value = Math.max(maxCapita.value, hpa)
      stat.push({
        code:region.code,
        hpa: hpa
      });
    });

    return stat;
  })

  const arenaPerCapitaByRegion = computed(() => (code:number):RegionStatistic|undefined =>{
    let stat = undefined;
    arenaPerCapita.value.forEach(s => {
      if(s.code === code)
      {
        stat = s;
      }
    })
    return stat;
  })


  return { arenaPerCapita, minCapita, maxCapita, arenaPerCapitaByRegion }
})
