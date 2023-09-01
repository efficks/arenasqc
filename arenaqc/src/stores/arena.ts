// Utilities
import { defineStore } from 'pinia'
import axios from "axios"
import { ref } from 'vue'
import type { Ref } from 'vue'

export type Coordinate = {
  lat: number
  lng: number
}

export type Arena = {
  name: string
  coordinate: Coordinate
  region: number
}

type DataCoordinate = {
  type: string
  coordinates: number[]
}
type DataArena = {
  name: string
  coordinates: DataCoordinate
  city: string
  region: number
}

export const useArenaStore = defineStore('arena', () => {
  const arenas: Ref<Arena[]> = ref([]);
  const arenaPerRegion: Ref<Map<number, number>> = ref(new Map());
  const excludedCity: string[] = ["Sherbrooke"];

  async function fetchMainArenas() {
    try {
      const data = await axios.get('/arenasqc/data/arenas.json')
      data.data.forEach((arena_data: DataArena) => {
        if (arena_data.coordinates !== null && excludedCity.indexOf(arena_data.city) === -1) {
          arenas.value.push({
            name: arena_data.name,
            coordinate: {
              lat: arena_data.coordinates.coordinates[1],
              lng: arena_data.coordinates.coordinates[0]
            },
            region: arena_data.region
          })
          if (arenaPerRegion.value.has(arena_data.region)) {
            let v = arenaPerRegion.value.get(arena_data.region);
            if (v === undefined) v = 0;
            arenaPerRegion.value.set(arena_data.region, v + 1);
          }
          else {
            arenaPerRegion.value.set(arena_data.region, 1);
          }

        }
      });
    }
    catch (error) {
      alert(error)
      console.log(error)
    }
  }

  async function fetchSherbrookeArenas() {
    try {
      const data = await axios.get('https://services3.arcgis.com/qsNXG7LzoUbR4c1C/arcgis/rest/services/InstallationSportLoisir/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json')
      data.data.features.forEach((arena_data:any) => {
        if (arena_data.attributes.TYPE === "Aréna") {
          arenas.value.push({
            name: arena_data.attributes.NOM,
            coordinate: {
              lat: arena_data.geometry.y,
              lng: arena_data.geometry.x
            },
            region: 5
          });
        }
      });
    }
    catch (error) {
      alert(error)
      console.log(error)
    }
  }

  async function fetchArenas() {
    await Promise.all([
      fetchMainArenas(),
      fetchSherbrookeArenas()
    ]);
  }


  return { arenas, arenaPerRegion, fetchArenas }
})
