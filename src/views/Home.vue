<template>
  <div class="bgp">
    <v-app-bar
      extended
      extension-height="30"
      absolute
      scroll-target="#scrolling-techniques-6"
      class="pa-2 d-flex align-center"
      color="transparent"
      elevation="0"
      :width="{ '60px': mobileView }"
    >
      <v-app-bar-nav-icon
        class="nav_icon"
        :class="{ 'mx-1': !mobileView }"
        @click="drawer = !drawer"
      >
        <v-img src="../assets/glug.png" aspect-ratio="1"></v-img>
      </v-app-bar-nav-icon>
      <v-toolbar-title
        v-if="!mobileView"
        class="d-flex flex-column title ml-n2"
      >
        <p class="mb-0 title_text">GNU/LINUX USERS' GROUP</p>
        <p class="mb-0 title_text">NIT DURGAPUR</p>
      </v-toolbar-title>

      <div v-if="!mobileView" style="width: 55vw"></div>

      <router-link v-if="!mobileView" to="faq" class="nav_item">
        <v-list-item link>
          <v-list-item-title>FAQ</v-list-item-title>
        </v-list-item>
      </router-link>
      <router-link v-if="!mobileView" to="rules" class="nav_item">
        <v-list-item link>
          <v-list-item-title>RULES</v-list-item-title>
        </v-list-item>
      </router-link>
      <router-link v-if="!mobileView" to="contacts" class="nav_item">
        <v-list-item link>
          <v-list-item-title>CONTACT US</v-list-item-title>
        </v-list-item>
      </router-link>
    </v-app-bar>

    <v-navigation-drawer
      v-if="mobileView"
      v-model="drawer"
      width="100vw"
      bottom
      temporary
      absolute
      height="200px"
    >
      <router-link to="faq" class="nav_item">
        <v-list-item link>
          <v-list-item-title>FAQ</v-list-item-title>
        </v-list-item>
      </router-link>
      <router-link to="rules" class="nav_item">
        <v-list-item link>
          <v-list-item-title>RULES</v-list-item-title>
        </v-list-item>
      </router-link>
      <router-link to="contacts" class="nav_item">
        <v-list-item link>
          <v-list-item-title>CONTACT US</v-list-item-title>
        </v-list-item>
      </router-link>
    </v-navigation-drawer>

    <div class="d-flex bd" :class="{ 'flex-column mb-4': mobileView }">
      <div
        class="d-flex flex-column justify-center heading"
        :class="{ 'ml-10': !mobileView, 'align-center mx-auto': mobileView }"
      >
        <p>AUDITION</p>
        <p>PORTAL</p>
      </div>
      <div class="d-flex align-center justify-center"><Login /></div>
    </div>
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
    };
  },
  computed: {
    mobileView() {
      var s = this.$vuetify.breakpoint.name;
      if (s == "xs" || s == "sm") {
        return true;
      } else {
        return false;
      }
    },
  },
  beforeCreate() {
    var token = this.$route.query.token;
    if (token != null) {
      token = "Bearer " + token;
      localStorage.setItem("token", token);
      this.$router.push("/dashboard");
    }
  },
};
</script>

<style>
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
  letter-spacing: 0.4em;
}
.bd {
  width: 100%;
  height: 90%;
  margin-top: 100px;
}
.bgp {
  width: 100vw;
  height: 90vh;
}
.nav_icon {
  width: 60px;
  height: 60px;
}
@media screen and (max-width: 960px) {
  .heading {
    height: auto;
    width: 100%;
    font-size: 30px;
    margin-left: 40px;
    margin-bottom: 40px;
  }
  .bgp {
    height: 100vh;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .title_text {
    font-size: 13px;
  }
  .nav_icon {
    width: 40px;
    height: 40px;
  }
}
</style>
