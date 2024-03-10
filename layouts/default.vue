<template>
  <v-app-bar app dark flat class="border borrder-b py-2">
    <v-toolbar-title>
      <v-btn class="text-indigo-500 btn" :to="{ name: 'index' }">AutoDoc</v-btn>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn class="px-4 btn" :to="{ name: 'try-now' }"
      >Try now
      <svg
        class="w-4 h-4 text-primary ml-2 dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2M12 4v12m0-12 4 4m-4-4L8 8"
        />
      </svg>
    </v-btn>
    <v-btn flat class="btn ml-3">About</v-btn>
    <!-- <v-btn>Contact</v-btn> -->
  </v-app-bar>
  <slot />

  <v-footer app>
    <span class="white--text">&copy; 2024</span>
  </v-footer>
</template>
<style>
.btn {
  text-transform: none !important;
}
</style>