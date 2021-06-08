<template>
  <v-container>
    <v-row>
      <v-btn color="primary" to="/assets/add">Add</v-btn>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-card v-for="(asset, i) in getAssets" :key="i">
          <v-card-subtitle>
            <p>{{ asset.id }}</p>
            <p>{{ asset.link }}</p>
            <p>{{ asset.text }}</p>
            <p>{{ asset.picture }}</p>
          </v-card-subtitle>
          <v-card-actions>
            <v-btn v-on:click="deleteAsset(asset)">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
    data: () => ({
        selectedAsset: null,
    }),
    mounted: function () {
      this.$store.dispatch("getAllAssets");
    },
    computed: {
        getAssets() {
            return this.$store.state.assets;
        },
    },
    methods: {
      deleteAsset: function (asset) {
        this.$store.dispatch("deleteAsset", asset);
      },
    }
};
</script>