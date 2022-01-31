<template>
  <div class="table-container">
    <tableHeader/>
    <v-data-table
      :headers="headers"
      :items="students"
      sort-by="calories"
      class="elevation-8 pa-5"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      hide-default-footer
      @page-count="pageCount = $event"
      style="width: 95%; background-color: #1a1d1f"
    >
      <template v-slot:top>
        <div v-if="dashboard">
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.phoneNo"
                        label="Ph. No."
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.email"
                        label="Email"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
        <div v-if="!dashboard">
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        :items="Role"
                        v-model="editedItem.role"
                        label="Role"
                        dense
                        outlined
                        class="mb-10 dropdown"
                        style="
                          width: 100%;
                          border: 0.2px solid #7b849f;
                          height: 40px;
                        "
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-row>
          <v-col>
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)" v-if="dashboard">
              mdi-delete
            </v-icon>
          </v-col>
          <v-col>
            <v-icon v-if="dashboard" @click="$router.push('/st_details')"
              >mdi-open-in-new</v-icon
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
  </div>
</template>

<script>
import common from "@/services/common.js";
import VueJwtDecode from "vue-jwt-decode";
// import Header from './Header.vue';
import tableHeader from './Table_header.vue';
export default {
  components: {tableHeader },
  props: ["headers", "dashboard"],
  data: () => ({
    round:"",
    dialog: false,
    dialogDelete: false,
    page: 1,
    pageCount: 0,
    itemsPerPage: 10,
    students: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      phoneNo: "",
      email: "",
    },
    defaultItem: {
      name: "",
      phoneNo: "",
      email: "",
      status: "",
      role: "",
    },
    Role: ["su", "m", "s"],
  }),
  created() {
    this.adminUser = VueJwtDecode.decode(
      localStorage.getItem("token").substring(6)
    ).UserName;

    console.log(this.adminUser);

    common.getUsers().then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        this.students = res.data;
        this.students = this.students.filter((stu) => stu.role === "s");
        // this.completed = this.students.filter(
        //   (stu) => stu.status === "selected" || item.status === "rejected"
        // );
      } else if (res.status === 401) {
        alert("UNAUTHORISED ACCESS");
        localStorage.clear("token");
        this.$router.push("/");
      } else {
        alert("No data");
      }
    });
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  methods: {

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
    // popup() {
    // var payload = a;
    // payload["lastUser"] = this.adminUser;
    // console.log(this.adminUser);
    // common.updateEntry(payload);
    // let routeData = this.$router.resolve({
    //   name: "UserControl",
    //   query: { id: a._id },
    // });

    // window.open(routeData.href, "_blank");
    // router.push('/log');
    // },
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
