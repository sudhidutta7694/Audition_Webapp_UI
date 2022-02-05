<template>
  <div class="background">
    <NavigationDrawer :role="role" />
    <div class="main">
      <v-card class="overview" max-width="95%" outlined color="#1A1D1F">
        <v-list-item>
          <v-list-item-content style="height: 50px">
            <div class="text-overline mb-4">
              <div class="pointer"></div>LOG
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-card>
      <v-card class="overview mt-5 pa-5" max-width="95%" outlined color="#1A1D1F">
        <v-card-text class="py-0">
          <v-timeline align-top dense v-for="(msg,index) in messages" :key="index">
            <v-timeline-item :color="color[index%2]" small>
              <v-row class="pt-1">
                  
                <v-col cols="3">
                  <strong>{{new Date(msg.createdAt).toString().substring(0,24)}}</strong>
                </v-col>
                <v-col>
                  <strong>{{msg.user}}</strong>
                </v-col>
                <v-col>
                  <strong>{{msg.message}}</strong>
                </v-col>
              </v-row>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>
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
import VueJwtDecode from "vue-jwt-decode";
// import Round from '../components/Header.vue'
export default {
  name: "Logs",
  components: {
    NavigationDrawer,
  },
  data: () => ({
    messages: [],
    color:["pink","teal lighten-3"
    ]
  }),
  created() {
    var tok = VueJwtDecode.decode(localStorage.getItem("token").substring(6));
    this.role = tok.role;
    let event = new EventSource(`${process.env.VUE_APP_BASE_URL}events`);
    // console.log(event);
    event.onmessage = (ev) => {
      JSON.parse(ev.data).forEach((log) => {
        this.messages.push(log);
        console.log("Messages");
        console.log(this.messages);
      });
    };
  },

  beforeCreate() {
    console.log(localStorage.getItem("token"));
    if (localStorage.getItem("token") === null) {
      this.$router.push("/");
    } else if (
      VueJwtDecode.decode(localStorage.getItem("token").substring(6)).role !=
      "su"
    ) {
      this.$router.push("/");
    }
  },
};
</script>
