<template>
  <v-layout class="">
    <AppBar />
    <InformationDialog />
    <Main />
    <Footer />
  </v-layout>
</template>

<script lang="ts" setup>
import AppBar from '@/components/AppBar.vue'
import Main from '@/components/Main.vue'
import Footer from '@/components/Footer.vue'
import InformationDialog from '@/components/InformationDialog.vue'
</script>
