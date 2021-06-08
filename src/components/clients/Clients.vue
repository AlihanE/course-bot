<template>
  <v-container class="grey lighten-4">
    <v-row dense>
      <v-col cols="4">
        <v-card>
          <v-list style="max-height: 800px" class="overflow-y-auto" flat>
            <v-subheader>USERS</v-subheader>
            <v-list-item-group color="primary">
              <v-list-item
                v-for="(client, i) in getClients"
                :key="i"
                v-on:click="selectClient(client)"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    <p>{{ client.firstName + " " + client.lastName }}</p>
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    <p>{{ client.active ? "Active" : "Inactive" }}</p>
                  </v-list-item-subtitle>
                  <v-divider :key="i"></v-divider>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="8">
        <v-card min-height="400">
          <v-card-title v-if="!selectedClient"
            >Select client to edit</v-card-title
          >
          <v-container v-else>
            <div>Client edit</div>
            <p class="display-2 text--primary">{{ selectedClient.login }}</p>
            <v-text-field
              label="Id"
              disabled
              v-model="selectedClient.id"
            ></v-text-field>
            <v-text-field
              label="Name"
              v-model="selectedClient.firstName"
            ></v-text-field>
            <v-text-field
              label="Last Name"
              v-model="selectedClient.lastName"
            ></v-text-field>
            <v-text-field
              label="Chat Id"
              disabled
              v-model="selectedClient.chatId"
            ></v-text-field>
            <v-switch
              v-model="selectedClient.active"
              class="ma-1"
              label="Active"
            ></v-switch>
            <v-btn color="primary" v-on:click="saveClient">Save</v-btn>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    selectedClient: null,
  }),
  mounted: function () {
    this.$store.dispatch("getAllClients");
  },
  computed: {
    getClients() {
      let users = this.$store.state.clients;
      let sorted = users.sort();
      return sorted;
    },
  },
  methods: {
    selectClient: function (client) {
      this.selectedClient = client;
    },
    saveClient: function () {
      this.$store.dispatch("updateClient", this.selectedClient);
      this.selectedClient = null;
    },
  },
};
</script>