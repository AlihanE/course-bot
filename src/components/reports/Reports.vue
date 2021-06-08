<template>
  <v-container>
    <v-row>
      <v-btn color="primary" v-on:click="refresh">Refresh</v-btn>
    </v-row>
    <v-row>
      <v-col cols="2">
        <v-card>
          <v-list style="max-height: 800px" class="overflow-y-auto" flat>
            <v-subheader>USERS</v-subheader>
            <v-list-item-group color="primary">
              <v-list-item
                v-for="(repUsr, i) in getUsers"
                :key="i"
                v-on:click="selectReportUser(repUsr)"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    <p>{{ getClientName(repUsr) }}</p>
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    <p>{{ getClientLogin(repUsr) }}</p>
                  </v-list-item-subtitle>
                  <v-divider :key="i"></v-divider>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card class="mx-auto" tile>
          <v-list style="max-height: 800px" class="overflow-y-auto" flat>
            <v-subheader>MESSAGES</v-subheader>
            <v-list-item-group color="primary">
              <v-list-item
                v-for="(report, i) in getReports"
                :key="i"
                v-on:click="selectReport(report)"
                v-bind:style="
                  report.accepted ? 'background: #ccffdd;' : 'border: #ffffff;'
                "
              >
                <v-list-item-content>
                  <v-list-item-title>
                    <p>Text report</p>
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    <p>Report Date: {{ report.createDate }}</p>
                    <p>{{ report.accepted ? "Accepted" : "Not Accepted" }}</p>
                  </v-list-item-subtitle>
                  <v-divider :key="i"></v-divider>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="7">
        <v-card min-height="400">
          <v-card-title v-if="!selectedReport"
            >Select report to edit</v-card-title
          >
          <v-container v-else>
            <div>Report edit</div>
            <v-text-field
              label="Id"
              disabled
              v-model="selectedReport.id"
            ></v-text-field>
            <p>Name :{{ getClientName(selectedReport.userId) }}</p>
            <p>Login :{{ getClientLogin(selectedReport.userId) }}</p>
            <v-textarea
              name="report-text"
              label="Report"
              v-model="selectedReport.text"
            ></v-textarea>
            <v-switch
              v-model="selectedReport.accepted"
              class="ma-1"
              label="Accepted"
            ></v-switch>
            <v-btn color="primary" v-on:click="saveReport">Save</v-btn>
          </v-container>
        </v-card>
        <v-card v-if="selectedReport" min-height="400">
          <v-row>
            <v-col cols="5">
              <v-card>
                <v-card-title> Send message </v-card-title>
                <v-container>
                  <v-textarea
                    name="message-text"
                    label="Message text"
                    v-model="messageText"
                  ></v-textarea>
                  <v-checkbox v-model="ready" :label="`Ready`"></v-checkbox>
                  <v-btn
                    color="primary"
                    :disabled="!ready"
                    v-on:click="sendMessage"
                    >Send</v-btn
                  >
                </v-container>
              </v-card>
            </v-col>
            <v-col cols="7">
              <v-card class="mx-auto" tile>
                <v-list style="max-height: 500px" class="overflow-y-auto" flat>
                  <v-subheader>MESSAGES</v-subheader>
                  <v-list-item-group color="primary">
                    <v-list-item v-for="(message, i) in conversation" :key="i">
                      <v-list-item-content>
                        <v-list-item-subtitle>
                          <p>{{ message.createDate }}</p>
                        </v-list-item-subtitle>
                        <v-textarea
                          name="messaage-text"
                          label="Message"
                          v-model="message.text"
                        ></v-textarea>
                        <v-divider :key="i"></v-divider>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <p v-if="error == true">
        {{ error }}
      </p>
    </v-row>
  </v-container>
</template>

<script>
import clientConvApi from "../../backend-api/client-convApi";

export default {
  data: () => ({
    selectedReportUser: null,
    selectedReport: null,
    messageText: "",
    ready: false,
    conversation: [],
    error: null,
  }),
  mounted: function () {
    this.$store.dispatch("getAllClients");
    this.$store.dispatch("getAllReports");
  },
  computed: {
    getUsers() {
      let reps = this.$store.state.reports;

      let repUsers = [];
      reps.map((rep) => {
        if (repUsers.length === 0) {
          repUsers.push(rep.userId);
        }

        if (
          repUsers.findIndex((respUsr) => {
            return respUsr === rep.userId;
          }) === -1
        ) {
          repUsers.push(rep.userId);
        }
      });

      let sorted = repUsers.sort();

      return sorted;
    },
    getReports() {
      let reps = this.$store.state.reports;

      let userReps = [];
      reps.map((rep) => {
        if (rep.userId === this.selectedReportUser) {
          userReps.push(rep);
        }
      });

      let sorted = userReps.sort((a, b) => {
        return new Date(b.createDate) - new Date(a.createDate);
      });

      return sorted;
    },
    getClients() {
      return this.$store.state.clients;
    },
  },
  methods: {
    getConversation: function (reportId) {
      clientConvApi
        .getConv(reportId)
        .then((data) => {
          let sorted = data.sort((a, b) => {
            return new Date(b.createDate) - new Date(a.createDate);
          });

          this.conversation = sorted;
        })
        .catch((error) => {
          this.error = error;
        });
    },
    sendMessage: function () {
      let message = {
        userId: this.selectedReport.userId,
        reportId: this.selectedReport.id,
        text: this.messageText,
      };

      clientConvApi.sendMessage(message).then(() => {
        this.messageText = "";
        this.ready = false;
        this.getConversation(this.selectedReport.id);
      });
    },
    selectReportUser: function (usrId) {
      this.selectedReportUser = usrId;
      this.selectedReport = null;
    },
    selectReport: function (report) {
      this.clearConversation();
      this.selectedReport = report;
      this.getConversation(report.id);
    },
    clearConversation: function () {
      this.conversation = [];
    },
    getClientLogin: function (clientId) {
      let clients = this.getClients.filter((cli) => cli.id == clientId);
      if (clients.length > 0) {
        return clients[0].login;
      }
    },
    getClientName: function (clientId) {
      let clients = this.getClients.filter((cli) => cli.id == clientId);
      if (clients.length > 0) {
        return clients[0].firstName + " " + clients[0].lastName;
      }
    },
    saveReport: function () {
      this.$store.dispatch("updateReport", this.selectedReport);
      this.selectedReport = null;
    },
    refresh: function () {
      this.$store.dispatch("getAllReports");
      this.$store.dispatch("getAllClients");
    },
  },
};
</script>