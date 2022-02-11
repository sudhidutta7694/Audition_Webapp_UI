<template>
  <div class="table-container">
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-select
                  :items="Role"
                  v-model="role"
                  label="Role"
                  dense
                  outlined
                  class="mb-10 dropdown"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="changeRole()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div class="table-header">
      <v-list-item three-line>
        <v-list-item-content style="height: 50px">
          <div class="text-overline mb-4">
            <div class="pointer"></div>

            <template v-if="dashboard">
              <v-tabs
                v-model="tab"
                align-with-title
                background-color="transparent"
              >
                <v-tabs-slider color="yellow"></v-tabs-slider>

                <v-tab v-for="stu in record" :key="stu" class="ml-0"
                  >ROUND {{ stu.roundNo }}</v-tab
                >
              </v-tabs>
            </template>
            <template v-if="!dashboard">
              <div>
                <v-tabs
                v-model="tab"
                align-with-title
                background-color="transparent"
              >
                <v-tabs-slider color="yellow"></v-tabs-slider>

                <v-tab v-for="item in Role_ui" :key="item" class="ml-0">{{
                  item
                }}</v-tab>
              </v-tabs>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify mx-6 my-3"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
              </div>
            </template>
          </div>
        </v-list-item-content>
      </v-list-item>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify mx-6 my-3"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </div>
    <v-tabs-items
      v-model="tab"
      style="width: 1500px; background-color: #1a1d1f"
      class="pa-5"
    >
      <v-tab-item v-for="stu in record" :key="stu" style="width: 100%">
        <v-data-table
          :headers="headers"
          :items="stu.records"
          class="elevation-8 pa-5"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
          @page-count="pageCount = $event"
          style="width: 100%"
          :search="search"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-row>
              <v-col>
                <v-icon v-if="dashboard" @click="popup(item)"
                  >mdi-open-in-new</v-icon
                >
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-icon
                  small
                  v-if="!dashboard"
                  class="mr-2"
                  @click="editItem(item)"
                  >mdi-pencil</v-icon
                >
              </v-col>
            </v-row>
          </template>
        </v-data-table>
        <v-pagination
          v-model="page"
          :length="pageCount"
          color="#B5E4CA"
          class="ma-5"
        ></v-pagination>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import common from "@/services/common.js";
import VueJwtDecode from "vue-jwt-decode";
// import Header from './Header.vue';
// import tableHeader from "./Table_header.vue";
export default {
  // components: { tableHeader },
  props: ["headers", "dashboard", "un"],
  data: () => ({
    currentround: "",
    search: "",
    tab: null,
    all: [],
    dialog: false,
    dialogDelete: false,
    page: 1,
    pageCount: 0,
    itemsPerPage: 40,
    store: [],
    superusers: [],
    members: [],
    students: [],
    rounds: [],
    Role: ["s", "m", "su"],
    user: null,
    Role_ui: ["STUDENTS", "MEMBERS", "SUPERUSERS"],
  }),
  created() {
    this.adminUser = VueJwtDecode.decode(
      localStorage.getItem("token").substring(6)
    ).UserName;
    console.log(this.adminUser);
    common.getUsers().then((res) => {
      if (res.status === 200) {
        // console.log(res.data);
        this.all = res.data.data;
        this.all.forEach((e) => this.store.push(e[0]));
        console.log(this.store);
        this.students = this.store.filter((stu) => stu.role === "s");
        console.log(this.students);

        this.members = this.store.filter((stu) => stu.role === "m");
        // console.log("Members");
        // console.log(this.members);
        this.superusers = this.store.filter((stu) => stu.role === "su");
        // console.log("SuperUsers");
        // console.log(this.superusers);
      } else if (res.status === 401) {
        alert("UNAUTHORISED ACCESS");
        localStorage.clear("token");
        this.$router.push("/");
      } else {
        alert("No data");
      }
    });
  },
  beforeCreate() {
    common.getAuditionStatus().then((res) => {
      console.log(res);
      this.currentround = res.data.round;
      console.log(this.currentround);
    });
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    record() {
      let rounds = [];
      for (let i = 0; i <= this.currentround; i++) {
        var roundentry = {
          roundNo: i + 1,
          records: [],
        };
        // console.log(this.students);
        this.students.forEach((e) => {
          if (e.round === i + 1) {
            roundentry.records.push(e);
          }
        });
        rounds.push(roundentry);
      }
      console.log(rounds);
      return rounds;
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    students() {},
  },
  methods: {
    editItem(user) {
      console.log("clicked");
      this.dialog = true;
      this.item = user;
      console.log(this.item);
    },
    // close() {
    //   this.dialog = false;
    //   this.$nextTick(() => {
    //     this.editedItem = Object.assign({}, this.defaultItem);
    //     this.editedIndex = -1;
    //   });
    // },
    changeRole() {
      var a = {
        uuid: this.item.uuid,
        role: this.role,
      };
      console.log(a);
      common.changeRole(a).then(() => {
        if (this.role === "m") {
          var b = {
            uuid: this.item.uuid,
            clearance: this.clearance,
          };
          common.setClearance(b).then(() => {
            // this.roleSnackbar = true;
            this.dialog = false;
          });
          common.getUsers().then((res) => {
            if (res.status === 200) {
              this.all = res.data.data;
            }
          });
        } else {
          // this.roleSnackbar = true;
          this.dialog = false;
          common.getUsers().then((res) => {
            if (res.status === 200) {
              this.all = res.data.data;
            }
          });
        }
      });
      // if (this.editedIndex > -1) {
      //   Object.assign(this.students[this.editedIndex], this.editedItem);
      // } else {
      //   this.students.push(this.editedItem);
      // }
      // this.close();
    },
    popup(a) {
      var payload = a;
      // payload["lastUser"] = this.adminUser;
      // console.log(this.adminUser);
      common.updateEntry(payload);
      let routeData = this.$router.resolve({
        name: "St_details",
        query: { uuid: a.uuid },
      });
      window.open(routeData.href, "_blank");
    },
  },
};
</script>

<style scoped>
.table-header {
  /* border: 2px solid red; */
  background-color: #111315;
  border-radius: 10px;
  margin: 30px;
  width: 95%;
}
.text-overline {
  display: flex;
  align-items: center;
}
.pointer {
  background-color: #a692ff;
  width: 10px;
  height: 15px;
  border-radius: 10px;
  margin-right: 8px;
}
.table-container {
  /* border: 2px solid red; */
  margin-top: 50px;
  width: 82.5vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #1a1d1f;
  border-radius: 10px;
}
</style>
