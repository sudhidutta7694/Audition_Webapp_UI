<template>
  <div class="bgp">
    <div class="fil" style="z-index:1;"></div>
    <v-app-bar
      v-if="!mobileView"
      extended
      extension-height="30"
      absolute
      class="pa-2 d-flex align-center"
      color="transparent"
      elevation="0"
      :width="{ '60px': mobileView, '100%': !mobileView }"
      style="z-index:2; background-color:transparent;"
    >
      <div class="d-flex alidgn-center">
        <v-app-bar-nav-icon class="nav_icon mx-1" href="https://nitdgplug.org/" target="_blank">
          <v-img src="../assets/glug.png" aspect-ratio="1"></v-img>
        </v-app-bar-nav-icon>
        <v-toolbar-title class="d-flex flex-column title ml-4">
          <p class="mb-0 title_text">GNU/LINUX USERS' GROUP</p>
          <p class="mb-0 title_text">NIT DURGAPUR</p>
        </v-toolbar-title>
      </div>
      <div class="menu">
        <a href="https://linktr.ee/glug_nitdgp_social" target="_blank" class="nav_item">
          <v-list-item link>
            <v-list-item-title>CONTACT US</v-list-item-title>
          </v-list-item>
        </a>
      </div>
    </v-app-bar>
    <v-btn v-if="mobileView" fab color="blue darken-3" fixed class="ma-3" @click="drawer = !drawer">
      <v-icon>mdi-menu</v-icon>
    </v-btn>
    <v-navigation-drawer
      v-if="mobileView"
      v-model="drawer"
      width="100vw"
      bottom
      temporary
      absolute
      height="200px"
      style="z-index:10;"
    >
      <!-- <router-link :to="{ name: 'faq' }" class="nav_item">
        <v-list-item link>
          <v-list-item-title>FAQ</v-list-item-title>
        </v-list-item>
      </router-link>
      <router-link :to="{ name: 'rules' }" class="nav_item">
        <v-list-item link>
          <v-list-item-title>RULES</v-list-item-title>
        </v-list-item>
      </router-link>-->
      <a href="https://linktr.ee/glug_nitdgp_social" class="nav_item">
        <v-list-item link>
          <v-list-item-title>CONTACT US</v-list-item-title>
        </v-list-item>
      </a>
    </v-navigation-drawer>

    <div
      class="d-flex align-center bd"
      :class="{ 'flex-column mb-4': mobileView }"
      style="z-index:2;"
    >
      <div
        class="d-flex flex-column justify-center heading"
        :class="{ 'ml-16': !mobileView, 'align-center mx-auto': mobileView }"
        style="z-index:2;"
      >
        <p>AUDITION</p>
        <p>PORTAL</p>
      </div>
      <div class="d-flex align-center justify-center" style="z-index:2; height:max-content">
        <Login />
      </div>
    </div>
    <v-snackbar v-model="emailSnack" color="error" elevation="12" app>Mail is already in use</v-snackbar>
  </div>
</template>

<script>
import Login from "../components/login.vue";

export default {
  components: {
    Login,
  },
  data() {
    return {
      collapse: true,
      drawer: false,
      emailSnack: false,
    };
  },
  computed: {
    mobileView() {
      var s = this.$vuetify.breakpoint.name;
      if (s == "xs" || s == "sm" || s == 'md') {
        return true;
      } else {
        return false;
      }
    },
  },
  beforeCreate() {
    var token = this.$route.query.token;
    console.log("this.route.query")
    console.log(this.$route)
    if (token != null) {
      token = "Bearer " + token;
      localStorage.setItem("token", token);
      this.$router.push("/dash");
    }
  },
  created() {
    var error = this.$route.query.error;
    console.log(error);
    if (error != null) {
      this.emailSnack = true;
    }
  },
  mounted() {
    this.token = localStorage.getItem('token');
    if (this.token != null && this.token != undefined) {
      this.$router.push("/dash")
    }
  }
};
</script>

<style>
.v-toolbar__content {
  justify-content: space-between;
  width: 100%;
}
.title_text {
  font-family: Rubik;
  letter-spacing: 0.4em;
}
.nav_item {
  text-decoration: none;
}
.heading {
  height: 100%;
  width: 55%;
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 60px;
  letter-spacing: 0.6em;
  padding-left: 4vw;
  color: white;
}
.bd {
  width: 100%;
  height: 100%;
}
.bgp {
  width: 100%;
  height: 100%;
  /* overflow-x: hidden; */
  /* overflow-y: auto; */
  background: url("../assets/tunnel.gif");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.nav_icon {
  width: 60px;
  height: 60px;
}
.fil {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
}
@media screen and (max-width: 1264px) {
  .heading {
    height: auto;
    width: 100%;
    font-size: 30px;
    margin-left: 40px;
    margin-bottom: 40px;
    padding: 0;
  }
  .bgp {
    overflow-y: auto;
    overflow-x: hidden !important;
  }
  .title_text {
    font-size: 13px;
  }
  .nav_icon {
    width: 40px;
    height: 40px;
  }
  .bd {
    padding-top: 80px;
  }
}
</style>
