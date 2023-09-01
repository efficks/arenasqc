// Utilities
import { defineStore } from 'pinia'
import axios from "axios"
import { ref, computed } from 'vue'
import type { Ref } from 'vue'

export type Region = {
    name: string,
    code: number,
    population: number
}


export const useRegionStore = defineStore('region', () => {
    const regions: Ref<Region[]> = ref([]);
    const regionDict: Ref<Map<number,Region>> = ref(new Map());
    const regionShape: Ref<any> = ref();

    async function fetchRegionsData() {
        try {
            const data = await axios.get('/arenasqc/data/regions.json')
            regions.value = data.data;
            regions.value.forEach(region => {
                regionDict.value.set(region.code, region);
            })
        }
        catch (error) {
            alert(error)
            console.log(error)
        }
    };

    async function fetchRegionsShape() {
        try {
            const data = await axios.get('/arenasqc/data/regionshape.json',{maxContentLength: 100000000,
                maxBodyLength: 1000000000})
            regionShape.value = data.data;
        }
        catch (error) {
            alert(error)
            console.log(error)
        }
    };

    async function fetchRegions() {
        await Promise.all([
            fetchRegionsData(),
            fetchRegionsShape()
          ]);
    };

    const regionByCode = computed(()  =>(code: number) => {
        return regionDict.value.get(code);
    });

    return { regions, regionShape, regionByCode, fetchRegions };
});