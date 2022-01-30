<template>
  <div class="nav">
    <v-navigation-drawer
      permanent
      expand-on-hover
      color="#1A1D1F"
      class="drawer"
      height="100%"
      width="180px"
    >
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img src="../assets/glug.png"></v-img>
          </v-list-item-avatar>
          <v-list-item-title class="header">GLUG</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-list nav dense>
        <v-list-item class="mt-5"></v-list-item>
        <router-link :to="{ name: 'Landing' }" class="navbar-items">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon color="#7B849F">mdi-view-dashboard</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="font-weight-light sidebar">Dashboard</v-list-item-title>
          </v-list-item>
        </router-link>
        <router-link :to="{ name: 'Profile' }" class="navbar-items">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon color="#7B849F">mdi-account-box</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="font-weight-light sidebar">Profile</v-list-item-title>
          </v-list-item>
        </router-link>
        <router-link :to="{ name: 'Rules' }" class="navbar-items">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon color="#7B849F">mdi-book-edit-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="font-weight-light sidebar">Rules</v-list-item-title>
          </v-list-item>
        </router-link>
      </v-list>
      <router-view />
      <template v-slot:append>
        <div class="pa-2">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon color="#7B849F">mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="sidebar">Logout</v-list-item-title>
          </v-list-item>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>

export default {
  name: 'Navigation',
  props: ['quiz', 'questions'],
  components: {
  },
  data() {
    return {
      drawer: false,
    }
  }
}
</script>

<style scoped>
.nav {
  height: 100%;
  position: fixed;
}
.drawer {
  border-radius: 0px 10px 10px 0px;
}
.header {
  color: #06ab48;
  font-family: "Rubik", sans-serif;
  font-family: 300;
}

.sidebar {
  color: #7b849f;
  font-weight: bold;
}
.navbar-items {
  text-decoration: none;
}
</style>
