<template>
  <v-form v-model="valid">
    <v-container class="grey lighten-4">
      <v-row>
        <h2 class="mx-5">Add new asset</h2>
      </v-row>
      <v-row>
        <v-select
          :items="assetTypes"
          label="Asset type"
          v-model="type"
        ></v-select>
      </v-row>
      <v-row>
        <v-textarea v-if="type === 'text'" v-model="text"></v-textarea>
        <v-text-field v-else-if="type === 'link'" v-model="link"></v-text-field>
        <v-file-input
          show-size
          v-else-if="type === 'picture' || type === 'audio'"
          v-model="files"
          truncate-length="15"
          @change="selectFile"
        ></v-file-input>
      </v-row>
      <v-row class="d-flex justify-space-between">
        <v-btn class="ml-5 mt-3" to="/assets">Back</v-btn>
        <v-btn color="primary" class="mr-5 mt-3" v-on:click="createAsset"
          >Save</v-btn
        >
      </v-row>
      <v-row>
        <p v-if="error == true">
          {{ error }}
        </p>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>

import FileApi from '../../backend-api/fileApi';

export default {
  data: () => ({
    assetTypes: ["text", "picture", "link", "audio"],
    valid: false,
    fileLink: "",
    type: "",
    link: "",
    text: "",
    files: [],
    currentFile: undefined,
    error: null,
  }),
  methods: {
    createAsset: function () {
      if (this.valid) {
        let asset = {
          courseId: "1",
          stepId: "1",
          type: this.type,
        };

        switch (this.type) {
          case "text":
            asset.text = this.text;
            break;
          case "link":
            asset.link = this.text;
            break;
          case "picture":
            asset.link = this.fileLink;
            break;
          case "audio":
            asset.link = this.fileLink;
            break;
          default:
            break;
        }

        this.$store.dispatch("addAsset", asset);
        this.$router.go(-1);
      }
    },
    selectFile: function (file) {
      this.progress = 0;
      this.currentFile = file;
      FileApi.uploadFile(file)
      .then((data) => {
        this.fileLink = data.filePath;
      })
      .catch((error) => {
        this.error = error;
      });
    },
  },
};
</script>
