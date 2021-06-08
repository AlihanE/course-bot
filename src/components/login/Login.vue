<template>
  <v-container>
    <v-form v-model="valid">
      <v-row>
        <h2 class="mx-5">Login</h2>
      </v-row>
      <v-row>
        <v-text-field
          class="mx-5"
          label="Username"
          v-model="username"
          :rules="nameRules"
          required
        ></v-text-field>
        <v-text-field
          class="mx-5"
          label="Password"
          v-model="password"
          :rules="typeRules"
          required
        ></v-text-field>
      </v-row>
      <v-row>
        <v-btn color="primary" v-on:click="login">Ok</v-btn>
      </v-row>
      <v-row>
        <p v-if="error == true">
          {{ error }}
        </p>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import loginApi from "../../backend-api/loginApi";
import {router} from "../../routes"

export default {
  data: () => ({
    valid: false,
    username: "",
    password: "",
    nameRules: [(v) => !!v || "Name is required"],
    typeRules: [(v) => !!v || "Type is required"],
    error: null,
  }),
  methods: {
    login: function () {
      if (this.valid === true) {
        let ld = { username: this.username, password: this.password };
        loginApi
          .login(ld)
          .then((data) => {
            sessionStorage.setItem("user", JSON.stringify(data));
            router.push('/');
          })
          .catch((error) => {
            this.error = error;
          });
      }
    },
  },
};
</script>