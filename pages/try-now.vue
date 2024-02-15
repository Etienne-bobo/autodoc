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
          <v-img :src="imagePreview" aspect-ratio="1.1" class="mb-2"></v-img>
          <div class="flex items-center justify-center py-5">
            <v-btn color="error" @click="removeImage">Remove Image</v-btn>
            <v-btn class="ml-4" @click="getPredictions">
              Get Predictions
            </v-btn>
          </div>
        </div>
      </div>
      <div class="border rounded-s-md p-4">
        <v-card color="primary" variant="primary">
          <v-card-item>
            <div v-if="model_prediction.length != 0">
              <div class="flex ">
                <div class="text-h6 mb-1">{{ model_prediction[0].label }}</div>
              <v-btn color="success" class="ml-4" @click="getPredictions">{{ model_prediction[0].score.toFixed(2) }}</v-btn>
              </div>
              <div class="text-caption mt-4">ChatGpt prediction....</div>

            </div>
          </v-card-item>
        </v-card>
      </div>
    </div>
  </v-container>
</template>
  
<script>
import { pipeline } from "@xenova/transformers";

export default {
  data() {
    return {
      imagePreview: null,
      model: null,
      model_prediction: [],
    };
  },
  async created() {
    this.model = await pipeline("image-classification", "full_autodoc"); // Load the model when the component is created
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
    async getPredictions() {
      if (!this.model || !this.imagePreview) return;
      try {
        const prediction = await this.model(this.imagePreview);
        this.model_prediction = prediction;
      } catch (error) {
        console.error("Error getting predictions:", error);
      }
    },
  },
};
</script>
  