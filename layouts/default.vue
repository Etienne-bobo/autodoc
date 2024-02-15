<template>
  <v-app-bar app dark flat>
    <v-toolbar-title>
      <v-btn class="text-indigo-500" :to="{ name: 'index' }">AutoDoc</v-btn>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn :to="{name: 'try-now'}">Try now</v-btn>
    <v-btn>About</v-btn>
    <!-- <v-btn>Contact</v-btn> -->
  </v-app-bar>
  <slot />

  <v-footer app>
    <span class="white--text">&copy; 2024</span>
  </v-footer>
</template>
  