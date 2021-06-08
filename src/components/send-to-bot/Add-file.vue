<template>
  <v-container>
    <v-row>
      <v-select
        :items="assetTypes"
        label="Asset type"
        v-model="asset.type"
      ></v-select>
    </v-row>
    <v-row>
      <v-textarea v-if="asset.type === 'text'" v-model="asset.text"></v-textarea>
      <v-text-field v-else-if="asset.type === 'link'" v-model="asset.link"></v-text-field>
      <v-file-input
        show-size
        v-else-if="asset.type === 'picture' || asset.type === 'audio'"
        v-model="files"
        truncate-length="15"
        @change="selectFile"
      ></v-file-input>
    </v-row>
    <v-row>
      <p v-if="error == true">
        {{ error }}
      </p>
    </v-row>
  </v-container>
</template>

<script>
import FileApi from '../../backend-api/fileApi';

export default {
  props: ["asset"],
  data: () => ({
    assetTypes: ["text", "picture", "link", "audio"],
    error: null,
    files: [],
    currentFile: undefined,
  }),
  methods: {
      selectFile: function (file) {
      this.progress = 0;
      this.currentFile = file;
      FileApi.uploadFile(file)
      .then((data) => {
        this.asset.filePath = data.filePath;
      })
      .catch((error) => {
        this.error = error;
      });
    },
  }
};
</script>