<template>
  <v-container>
    <v-row>
      <v-col cols="2">
        <v-card>
          <v-list style="max-height: 800px" class="overflow-y-auto" flat>
            <v-subheader>USERS</v-subheader>
            <div>
              <v-checkbox
                v-model="checkAll"
                label="Check all"
                v-on:click="checkAllActive"
              ></v-checkbox>
            </div>
            <v-list-item-group color="primary">
              <v-list-item
                v-for="(usr, i) in getUsers"
                :key="i"
                v-bind:style="
                  usr.active ? 'background: #ccffdd;' : 'border: #ffffff;'
                "
              >
                <v-list-item-content>
                  <v-checkbox
                    v-model="selected"
                    :label="usr.firstName + ' ' + usr.lastName"
                    :value="usr.chatId"
                  ></v-checkbox>
                  <div>{{ usr.active ? "Active" : "Inactive" }}</div>
                  <v-divider :key="i"></v-divider>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card>
          <h2 class="mx-5">Add new asset</h2>
        </v-card>
        <v-card class="d-flex flex-row">
          <v-btn color="primary" class="mr-5 mt-3" v-on:click="addAsset">
            <v-icon dark> mdi-plus </v-icon>
          </v-btn>
        </v-card>
        <v-card v-for="(asset, i) in assets" :key="i">
          <AddFile :asset="asset"></AddFile>
        </v-card>
        <v-card class="mt-1 pa-1">
          <div>
            <v-checkbox v-model="ready" :label="`Ready`"></v-checkbox>
            <v-btn color="primary" :disabled="!ready" v-on:click="send"
              >Send</v-btn
            >
          </div>
        </v-card>
        <v-row>
          <p v-if="error == true">
            {{ error }}
          </p>
        </v-row>
      </v-col>
      <v-col cols="6">
        <v-card>
          <v-list style="max-height: 800px" class="overflow-y-auto" flat>
            <v-subheader>HISTORY</v-subheader>
            <v-list-item-group color="primary">
              <v-list-item v-for="(ah, i) in getAssetHistory" :key="i">
                <v-list-item-content>
                  <v-list-item-title>
                    <div>Sent date: {{ ah.createDate }}</div>
                  </v-list-item-title>
                  <v-row>
                    <v-col cols="6">
                      <div v-for="(ta, j) in ah.textAssets" :key="j">
                        <v-textarea
                          v-if="ta.type === 'text'"
                          name="text-asset"
                          rows="3"
                          label="Text"
                          v-model="ta.text"
                        ></v-textarea>
                        <v-textarea
                          v-if="ta.type === 'link'"
                          name="text-asset-link"
                          rows="1"
                          label="Link"
                          v-model="ta.link"
                        ></v-textarea>
                      </div>
                    </v-col>
                    <v-col cols="6">
                      <div>Files</div>
                      <div v-for="(nta, k) in ah.nonTextAssets" :key="k">
                        <p>{{ nta.filePath }}</p>
                      </div>
                    </v-col>
                  </v-row>
                  <p>
                    <v-row>
                    <div class="text-center">
                      <v-chip v-for="(u, h) in ah.users" class="ma-2" color="green" text-color="white" :key="h">
                        {{ u.firstName + " " + u.lastName }}
                      </v-chip>
                    </div>
                  </v-row>
                  </p>
                  <v-divider :key="i"></v-divider>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AddFile from "./Add-file";
import ToBotApi from "../../backend-api/toBotApi";

export default {
  components: {
    AddFile,
  },
  data: () => ({
    assets: [{ type: "text", text: "", link: "", filePath: "" }],
    ready: false,
    error: null,
    selected: [],
    checkAll: false,
  }),
  mounted: function () {
    this.$store.dispatch("getAllClients");
    this.$store.dispatch("getAssetHistory");
  },
  computed: {
    getUsers() {
      let usrs = this.$store.state.clients;

      let sorted = usrs.sort();

      return sorted;
    },
    getAssetHistory() {
      let assHist = this.$store.state.assetHistory;
      let usrs = this.$store.state.clients;

      let assetHistory = [];
      if (assHist) {
        assHist.map((item) => {
          let data = JSON.parse(item.data);

          let users = [];
          data.clients.map((cli) => {
            let user = usrs.find((usr) => {
              return usr.chatId == cli;
            });

            if (user) {
              users.push(user);
            }
          });

          let date = new Date(item.createDate);

          let textAssets = [];
          let nonTextAssets = [];

          data.assets.map((a) => {
            switch (a.type) {
              case "text":
              case "link":
                textAssets.push(a);
                break;
              case "picture":
              case "audio":
                nonTextAssets.push(a);
            }
          });

          let ah = {
            users,
            textAssets,
            nonTextAssets,
            createDate: date.toString(),
          };

          assetHistory.push(ah);
        });
      }

      let sorted = assetHistory.sort((a, b) => {
        return new Date(b.createDate) - new Date(a.createDate);
      });

      return sorted;
    },
  },
  methods: {
    addAsset: function () {
      this.assets.push({ type: "text", text: "", link: "", filePath: "" });
    },
    send: function () {
      let sendData = {
        assets: this.assets,
        clients: this.selected,
      };
      ToBotApi.send(sendData)
        .then(() => {
          this.assets = [{ type: "text", text: "", link: "", filePath: "" }];
          this.$store.dispatch("getAssetHistory");
        })
        .catch((error) => {
          this.error = error;
        });

      this.selected = [];
    },
    checkAllActive: function () {
      if (this.checkAll) {
        let usrs = this.$store.state.clients;
        usrs.map((usr) => {
          if (usr.active) {
            this.selected.push(usr.chatId);
          }
        });
      } else {
        this.selected = [];
      }
    },
  },
};
</script>