<template>
  <div class="nav">
    <v-navigation-drawer
      permanent
      fixed
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
          <v-list-item-title class="header">AUDITION</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-list nav dense>
        <router-link
          v-if="role === 'su' || role === 'm'"
          :to="{ name: 'DashBoard' }"
          class="navbar-items"
        >
          <v-list-item link>
            <v-list-item-icon>
              <v-icon color="#7B849F">mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="font-weight-bold sidebar">Student Dashboard</v-list-item-title>
          </v-list-item>
        </router-link>
        <router-link v-if="role === 'su'" :to="{ name: 'Root' }" class="navbar-items">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon color="#7B849F">mdi-tools</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="font-weight-bold sidebar">Root</v-list-item-title>
          </v-list-item>
        </router-link>
        <router-link
          v-if="role === 'su' || role === 'm'"
          :to="{ name: 'AddRound' }"
          class="navbar-items"
        >
          <v-list-item link>
            <v-list-item-icon>
              <v-icon color="#7B849F">mdi-database-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="font-weight-bold sidebar">Add Round</v-list-item-title>
          </v-list-item>
        </router-link>
        <router-link
          v-if="role === 'su' || role === 'm'"
          :to="{ name: 'EditRound' }"
          class="navbar-items"
        >
          <v-list-item link>
            <v-list-item-icon>
              <v-icon color="#7B849F">mdi-square-edit-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="font-weight-bold sidebar">Edit Round</v-list-item-title>
          </v-list-item>
        </router-link>
        <router-link
          v-if="role === 'su' || role === 'm'"
          :to="{ name: 'Logs' }"
          class="navbar-items"
        >
          <v-list-item link>
            <v-list-item-icon>
              <v-icon color="#7B849F">mdi-chart-timeline-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="font-weight-bold sidebar">Go To Logs</v-list-item-title>
          </v-list-item>
        </router-link>

        <router-link v-if="role === 's'" :to="{ name: 'Landing' }" class="navbar-items">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon color="#7B849F">mdi-view-dashboard</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="font-weight-light sidebar">Dashboard</v-list-item-title>
          </v-list-item>
        </router-link>
        <router-link v-if="role === 's'" :to="{ name: 'Profile' }" class="navbar-items">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon color="#7B849F">mdi-account-box</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="font-weight-light sidebar">Profile</v-list-item-title>
          </v-list-item>
        </router-link>
        <router-link v-if="role === 's'" :to="{ name: 'Rules' }" class="navbar-items">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon color="#7B849F">mdi-book-edit-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="font-weight-light sidebar">Rules</v-list-item-title>
          </v-list-item>
        </router-link>
      </v-list>
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
  name: 'NavigationDrawer',
  props: ["role"]
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
  color: white;
  font-family: "Rubik", sans-serif;
  font-weight: bolder;
}

.sidebar {
  color: #7b849f;
  font-weight: bold;
}
.navbar-items {
  text-decoration: none;
}
</style>
