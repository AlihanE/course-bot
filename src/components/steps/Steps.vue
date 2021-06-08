<template>
  <v-container>
    <v-row>
      <v-btn color="primary" to="/steps/add">Add</v-btn>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-card v-for="(step, i) in getSteps" :key="i">
          <v-card-subtitle>
            <p>{{ step.name }}</p>
            <p>{{ step.type }}</p>
          </v-card-subtitle>
          <v-card-actions>
            <v-btn v-on:click="selectStep(step)">Edit</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="8">
        <v-card min-height="400">
          <v-card-title v-if="!selectedStep">Select step to edit</v-card-title>
          <v-container v-else>
            <div>Step edit</div>
            <v-text-field label="Id" disabled v-model="selectedStep.id"></v-text-field>
            <v-text-field label="Name" v-model="selectedStep.name"></v-text-field>
            <v-text-field label="Type" v-model="selectedStep.type"></v-text-field>
            <v-text-field label="Step number" type="number" v-model="selectedStep.stepNumber"></v-text-field>
            <v-btn color="primary" v-on:click="saveStep">Save</v-btn>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    selectedStep: null,
  }),
  mounted: function () {
    this.$store.dispatch("getAllSteps");
  },
  computed: {
    getSteps() {
      return this.$store.state.steps;
    },
  },
  methods: {
    selectStep: function (step) {
      this.selectedStep = step;
    },
    saveStep: function () {
      this.$store.dispatch("updateStep", this.selectedStep);
      this.selectedStep = null;
    },
  },
};
</script>
