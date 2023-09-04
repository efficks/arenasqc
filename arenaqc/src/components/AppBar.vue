<template>
  <v-app-bar color="#003399">
    <v-avatar :tile="true">
      <v-img :src="iconUrl" alt="Lys" max-height="40" max-width="40" class="ml-2"></v-img>
    </v-avatar>
    <v-toolbar-title class="ml-2">
      <v-app-bar-title style="color:#FFFFFF">
        Arénas du Québec</v-app-bar-title>
    </v-toolbar-title>

  </v-app-bar>
</template>

<script setup lang="ts">
import iconUrl from '@/assets/lys-blanc.svg';
</script>
