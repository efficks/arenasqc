<template>
  <v-layout class="">
    <AppBar />
    <div class="text-center ma-4">
      <v-btn fab fixed>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
    <Main />
    <Footer />
  </v-layout>
</template>

<script lang="ts" setup>
import AppBar from '@/components/AppBar.vue'
import Main from '@/components/Main.vue'
import Footer from '@/components/Footer.vue'
</script>
