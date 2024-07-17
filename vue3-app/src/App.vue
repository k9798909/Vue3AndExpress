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
        <v-list-item title="TodoItem" to="/todoItem"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="d-flex justify-center">
      <RouterView class="w-100 pa-5" />
    </v-main>
  </v-app>
</template>

<style scoped></style>
