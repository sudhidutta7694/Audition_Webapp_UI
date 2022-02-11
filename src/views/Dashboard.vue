<template>
  <div class="background">
    <NavigationDrawer :role="role" />
    <div class="main">
      <Round />
      <Stats/>
      <Table :headers="dashHeaders" :dashboard="true"/>
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
import Stats from "../components/Stats-Section.vue";
import Round from "../components/Round.vue";
import Table from "../components/Table.vue";
import VueJwtDecode from "vue-jwt-decode";

export default {
  name: "Dashboard",
  components: {
    NavigationDrawer,
    Stats,
    Round,
    Table,
  },
  data: () => ({
    all:[],
    students:[],
    store:[],
    un:0,
    tot:0,
    dashHeaders: [
      {
        text: "Name",
        align: "start",
        sortable: false,
        value: "username",
      },
      { text: "Phone No", value: "phone" },
      { text: "Email", value: "email" },
      { text: "Status", value: "status" },
      { text: "Details", value: "actions", sortable: false },
    ],
    role: "",
  }),
  mounted() {
     
  },
  created() {
    var tok = VueJwtDecode.decode(localStorage.getItem("token").substring(6));
    this.role = tok.role;
    
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
