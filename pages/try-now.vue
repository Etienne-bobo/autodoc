<template>
  <v-container class="mt-32">
    <!-- <div class="flex items-center justify-center" v-if="!imagePreview">
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
    </div> -->
    <div v-if="!imagePreview" class="flex items-center justify-center">
      <label class="custum-file-upload" for="file">
        <div class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24">
            <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
            <g
              stroke-linejoin="round"
              stroke-linecap="round"
              id="SVGRepo_tracerCarrier"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                fill=""
                d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                clip-rule="evenodd"
                fill-rule="evenodd"
              ></path>
            </g>
          </svg>
        </div>
        <div class="text">
          <span>Click to upload image</span>
        </div>
        <input
          ref="fileInput"
          type="file"
          id="file"
          accept="image/*"
          @change="previewImage"
        />
      </label>
    </div>
    <div v-else class="grid grid-cols-2 justify-center">
      <div class="flex items-center justify-center border pt-4 mr-4 rounded-lg">
        <!-- Image preview section -->
        <div>
          <v-img :src="imagePreview" class="mb-2 image_preview"></v-img>
          <div class="flex items-center justify-center py-5">
            <button class="bg-red-400 hover:shadow-md" @click="removeImage">
              <svg
                class="w-6 h-6 text-white dark:text-white"
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
                  d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                />
              </svg>
              Remove Image
            </button>
            <button
              class="ml-4 bg-green-500 hover:shadow-md"
              @click="getPredictions"
            >
              <svg
                class="w-6 h-6 text-white dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 2c.4 0 .8.3 1 .6l7 18a1 1 0 0 1-1.4 1.3L13 19.5V13a1 1 0 1 0-2 0v6.5L5.4 22A1 1 0 0 1 4 20.6l7-18a1 1 0 0 1 1-.6Z"
                  clip-rule="evenodd"
                />
              </svg>

              Get Predictions
            </button>
          </div>
        </div>
      </div>
      <div class="border rounded-lg p-4">
        <v-card :loading="loading" color="primary" variant="primary">
          <v-card-item>
            <div v-if="model_prediction.length != 0">
              <div class="flex">
                <div class="text-h6 mb-1">{{ model_prediction[0].label }}</div>
                <v-btn color="success" class="ml-4" @click="getPredictions">{{
                  model_prediction[0].score.toFixed(2)
                }}</v-btn>
              </div>
              <div class="text-caption mt-4">ChatGpt prediction....</div>
            </div>
            <div v-else>
              <div class="text-caption mt-4">Please click on the prediction button....</div>
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
      loading: false,
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
      this.model_prediction = [];
      this.$refs.fileInput.value = "";
    },
    async getPredictions() {
      if (!this.model || !this.imagePreview) return;
      try {
        this.loading = true;
        const prediction = await this.model(this.imagePreview);
        this.model_prediction = prediction;
        this.loading = false;
      } catch (error) {
        console.error("Error getting predictions:", error);
      }
    },
  },
};
</script>
<style>
.custum-file-upload {
  height: 300px;
  width: 700px;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  gap: 20px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border: 2px dashed #cacaca;
  background-color: rgba(255, 255, 255, 1);
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0px 48px 35px -48px rgba(0, 0, 0, 0.1);
}

.custum-file-upload .icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.custum-file-upload .icon svg {
  height: 80px;
  fill: rgba(75, 85, 99, 1);
}

.custum-file-upload .text {
  display: flex;
  align-items: center;
  justify-content: center;
}

.custum-file-upload .text span {
  font-weight: 400;
  color: rgba(75, 85, 99, 1);
}

.custum-file-upload input {
  display: none;
}
.image_preview {
  border-radius: 10px;
  border: 1px solid #cacaca;
  height: 450px;
  width: 450px;
}
button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-family: inherit;
  font-size: 13px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: #fff;
  /* background-color: #e0e8ef; */
  border-style: solid;
  border-width: 2px 2px 2px 2px;
  /* border-color: rgba(255, 255, 255, 0.333); */
  border-radius: 40px 40px 40px 40px;
  padding: 18px 37px 18px 37px;
  transform: translate(0px, 0px) rotate(0deg);
  transition: 0.2s;
  box-shadow: -4px -2px 16px 0px #ffffff, 4px 2px 16px 0px rgb(95 157 231 / 48%);
  /* put text in camel case*/
  text-transform: capitalize;
}

/* button:hover {
 color: #516d91;
 background-color: #E5EDF5;
 box-shadow: -2px -1px 8px 0px #ffffff, 2px 1px 8px 0px rgb(95 157 231 / 48%);
} */

button:active {
  box-shadow: none;
}
</style>