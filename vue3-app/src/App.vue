<script setup lang="ts">
import { ref } from 'vue'

const drawer = ref(false)
</script>

<template>
  <v-app class="rounded rounded-md">
    <v-app-bar prominent
      ><v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon
      ><v-toolbar-title>Application bar</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer">
      <v-list>
        <v-list-item title="Home" to="/"></v-list-item>

        <v-list-group>
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" title="功能"></v-list-item>
          </template>
          <v-list-item to="/todoItem">待辦清單</v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-main class="d-flex justify-center">
      <RouterView class="w-100 pa-5" />
    </v-main>
  </v-app>
</template>

<style scoped></style>
