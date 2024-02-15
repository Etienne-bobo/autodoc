<template>
  <v-container class="mt-24">
    <div class="flex items-center justify-center" v-if="!imagePreview">
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        @change="previewImage"
        class="hidden"
      />
      <v-btn
        class="flex justify-centeritems-center"
        size="x-large"
        @click="$refs.fileInput.click()"
      >
        <v-icon left>mdi-image</v-icon>
        Select Image
      </v-btn>
    </div>
    <div v-else class="grid grid-cols-2 justify-center">
      <div class="flex items-center justify-center">
        <!-- Image preview section -->
        <div>
          <v-img :src="imagePreview" aspect-ratio="1.7" class="mb-2"></v-img>
          <div class="flex items-center justify-center py-5">
            <v-btn color="error" @click="removeImage">Remove Image</v-btn>
            <v-btn class="ml-4" type="submit"> Get Predictions </v-btn>
          </div>
        </div>
      </div>
      <div class="border rounded-s-md p-4">Hello</div>
    </div>
  </v-container>
</template>
  
  <script>
export default {
  data() {
    return {
      imagePreview: null,
    };
  },
  methods: {
    previewImage(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith("image/")) {
        this.imagePreview = URL.createObjectURL(file);
      }
    },
    removeImage() {
      this.imagePreview = null;
      // Reset the file input
      this.$refs.fileInput.value = "";
    },
  },
};
</script>
  