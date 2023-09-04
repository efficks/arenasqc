

<template>
  <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
    
    <v-container fluid>
      <v-row justify="center" >
        <v-col  lg="8">
          <Map />
        </v-col>
      </v-row>
      
      <v-row justify="center" >
        <v-col lg="6">
          <Graph />
        </v-col>
      </v-row>

      <v-row justify="center" >
        <v-col lg="6">
          <Table />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
  
<script lang="ts" setup>
import Map from '@/components/Map.vue'
import Graph from '@/components/Graph.vue'
import Table from '@/components/Table.vue'
</script>
  
  