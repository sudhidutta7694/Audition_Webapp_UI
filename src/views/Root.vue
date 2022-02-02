<template>
  <div class="background">
    <NavigationDrawer :role="role" />
    <div class="main">
      <Sparkline />
      <div class="top">
        <v-btn color="#BEFFC1" class="ma-2 black--text" @click="btnHandler()">
          {{ btntext }}
        </v-btn>
        <v-btn
          light
          class="ma-2 black--text"
          v-if="audition.status === 'ong'"
          v-on:click="extendtime"
        >
          Extend Time (By 10 min)
        </v-btn>
      </div>
      <Table :headers="rootHeaders" :dashboard="false" />
      <v-snackbar
        v-model="eventSnackbar"
        class="text-center black--text snackbar"
        color="red"
        :timeout="2000"
        >{{ text }}</v-snackbar
      >
      <v-snackbar
        v-model="extendtimeSnackbar"
        class="text-center"
        color="red"
        :timeout="2000"
        >Time Extended for all students by 10 minutes</v-snackbar
      >
    </div>
  </div>
</template>
<style scoped>
.background {
  background-color: #111315;
  display: flex;
  height: 100%;
  overflow: hidden;
}
.main {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  margin: 30px;
  overflow: hidden;
  margin-left: 210px;
}
</style>

<script>
import NavigationDrawer from "../components/Navigation.vue";
import Sparkline from "../components/sparkline.vue";
import Table from "../components/Table.vue";
import VueJwtDecode from "vue-jwt-decode";
import common from "@/services/common.js";
export default {
  name: "Root",
  components: {
    NavigationDrawer,
    Table,
    Sparkline,
  },
  data: () => ({
    snackbar: false,
    eventSnackbar: false,
    text: "",
    btntext: "",
    audition: [],
    tab: null,
    extendtimeSnackbar: false,
    rootHeaders: [
      {
        text: "Name",
        align: "start",
        sortable: false,
        value: "username",
      },
      { text: "Phone No", value: "ph.no" },
      { text: "Email", value: "email" },
      { text: "Role", value: "role" },
      { text: "Set Role", value: "actions", sortable: false },
    ],
  }),
  created() {
    var tok = VueJwtDecode.decode(localStorage.getItem("token").substring(6));
    this.role = tok.role;
    common.getAuditionStatus().then((res) => {
      console.log("On Load:");
      console.log(res);
      this.audition = res.data;
      if (this.audition.status === "ong") {
        this.btntext = "STOP ROUND";
      } else if (this.audition.status === "res") {
        this.btntext = "PUSH ROUND";
      } else if (this.audition.status === "def") {
        this.btntext = "PUBLISH RESULT";
      }
    });
  },
  methods: {
    extendtime() {
      common.extendtime({ id: "all" }).then(() => {
        this.extendtimeSnackbar = true;
      });
    },
    btnHandler() {
      if (this.audition.status === "ong") {
        common.stopRound().then(() => {
          this.btntext = "PUBLISH RESULT";
          this.audition.status = "def";
          this.text = "Round has been stopped";
        });
      } else if (this.audition.status === "res") {
        common.pushRound().then(() => {
          this.btntext = "STOP ROUND";
          this.audition.round += 1;
          this.audition.status = "ong";
          this.text = "Round has been successfully pushed";
        });
      } else if (this.audition.status === "def") {
        common.pushResult().then((res) => {
          console.log(res);
          if (res.data.status === true) {
            this.btntext = "PUSH ROUND";
            this.audition.status = "res";
            this.text = "Results published";
          } else {
            alert("SOME STUDENTS ARE STILL UNEVALUATED");
          }
        });
      }
      this.eventSnackbar = true;
      common.getAuditionStatus().then((res) => {
        console.log("After Btn Click:");
        console.log(res);
        this.audition = res.data;
        if (this.audition.status === "ong") {
          this.btntext = "STOP ROUND";
        } else if (this.audition.status === "res") {
          this.btntext = "PUSH ROUND";
        } else if (this.audition.status === "def") {
          this.btntext = "PUBLISH RESULT";
        }
      });
    },
  },
  beforeCreate() {
    if (localStorage.getItem("token") === null) {
      this.$router.push("/");
    } else if (
      VueJwtDecode.decode(localStorage.getItem("token").substring(6)).role ===
      "s"
    ) {
      this.$router.push("/");
    }
  },
};
</script>
