<template>
  <div class="background">
    <NavigationDrawer />
    <div class="main">
      <Sparkline />
      <div class="top">
        <v-btn color="#BEFFC1" class="ma-2 black--text"> PUSH ROUND </v-btn>
        <v-btn light class="ma-2 black--text"> Extend Time (By 10 min) </v-btn>
      </div>
      <Table :headers="rootHeaders" :dashboard="false" />
      <v-snackbar
        v-model="roleSnackbar"
        class="text-center black--text snackbar"
        color="red"
        :timeout="2000"
        >Role Changed</v-snackbar
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
export default {
  name: "Root",
  components: {
    NavigationDrawer,
    Table,
    Sparkline,
  },
  data: () => ({
    snackbar: false,
    roleSnackbar: false,
    extendtimeSnackbar: false,
    rootHeaders: [
      {
        text: "Name",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Phone No", value: "ph.no" },
      { text: "Email", value: "email" },
      { text: "Role", value: "role" },
      { text: "Set Role", value: "actions", sortable: false },
    ],
  }),
};
</script>
