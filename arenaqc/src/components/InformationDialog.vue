<template>
  <v-dialog v-model="dialog" width="auto">
    <template v-slot:activator="{ props }">
      <v-btn icon small color="primary" v-bind="props" style="position: fixed; margin-top: 75px;">
        <v-icon>mdi-information-variant</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-text style="max-width: 75%;">
        <p>
          Ce site répertorie les arénas du Québec à l'aide de source disponibles publiquement.<br />
          Pour des suggestions d'améliorations vous pouvez ouvrir un ticket dans GitHub <a
            href="https://github.com/efficks/arenasqc">https://github.com/efficks/arenasqc</a>
        </p>
        <br />
        <h3>Sources</h3>
        <ul>
          <li><a href="https://www.aqairs.ca/bibliotheque?doc=1">Arénas du Québec | AQAIRS, 2019</a></li>
          <li><a
              href="https://donneesouvertes-sherbrooke.opendata.arcgis.com/datasets/b6498f3436974ecbb8fa636a7d9c0b2f_0/about">
              Données ouvertes de la Ville de Sherbrooke, Installations sportives et récréatives</a></li>
          <li><a
              href="https://www.donneesquebec.ca/recherche/dataset/vque_14/resource/8902c982-bbb6-4e84-814a-550d094c0bae">Cartographie
              des lieux et infrastructures administrés par la Ville de Québec et certaines institutions privées. | Données
              Québec</a></li>
          <li><a href="https://www.donneesquebec.ca/recherche/dataset/lieux-et-edifices-municipaux">Lieux et édifices
              municipaux de la ville de Laval | Données Québec</a></li>
          <li><a href="https://www.donneesquebec.ca/recherche/dataset/sag_arena-et-batiment-sportif">Aréna et bâtiment
              sportif de la ville de Saguenay | Données Québec</a></li>
        </ul>
        <br />
        <p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title"
            rel="cc:attributionURL" href="https://efficks.github.io/arenasqc/">Liste des arénas du Québec</a> par <a
            rel="cc:attributionURL dct:creator" property="cc:attributionName"
            href="https://github.com/efficks">François-Xavier Choinière</a> est marqué <a
            href="http://creativecommons.org/publicdomain/zero/1.0?ref=chooser-v1" target="_blank"
            rel="license noopener noreferrer" style="display:inline-block;">CC0 1.0<img
              style="height:22px!important;margin-left:3px;vertical-align:text-bottom;"
              src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img
              style="height:22px!important;margin-left:3px;vertical-align:text-bottom;"
              src="https://mirrors.creativecommons.org/presskit/icons/zero.svg?ref=chooser-v1"></a></p>


      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click="dialog = false">Fermer</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dialog = ref(false)
</script>
