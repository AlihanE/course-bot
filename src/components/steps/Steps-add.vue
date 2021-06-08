<template>
  <v-form v-model="valid">
    <v-container class="grey lighten-4">
      <v-row>
        <h2 class="mx-5">Add new step</h2>
      </v-row>
      <v-row>
        <v-text-field class="mx-5" label="Name" v-model="name" :rules="nameRules" required></v-text-field>
        <v-text-field class="mx-5" label="Type" v-model="type" :rules="typeRules" required></v-text-field>
        <v-text-field
          class="mx-5"
          label="StepNum"
          v-model="stepNumber"
          :rules="stepNumberRules"
          required
        ></v-text-field>
      </v-row>
      <v-row class="d-flex justify-space-between">
        <v-btn class="ml-5 mt-3" to="/steps">Back</v-btn>
        <v-btn color="primary" class="mr-5 mt-3" v-on:click="saveStep">Save</v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    name: "",
    type: "",
    stepNumber: "0",
    nameRules: [(v) => !!v || "Name is required"],
    typeRules: [(v) => !!v || "Type is required"],
    stepNumberRules: [(v) => !!v || "Step number is required"],
  }),
  mounted: function() {
    this.stepNumber = this.$store.state.steps.length + 1;
  },
  methods: {
    saveStep: function () {
      if (this.valid === true) {
        let step = { name: this.name, type: this.type };
        this.$store.dispatch("addStep", step);
        this.$router.go(-1);
      }
    },
  },
};
</script>