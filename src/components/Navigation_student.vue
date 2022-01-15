<template>
   <div class="nav">
   <v-navigation-drawer
        permanent
        expand-on-hover color="#1A1D1F" class="drawer"
        height="100%" width="180px"
      >
        <v-list>
          <v-list-item class="px-2">
            <v-list-item-avatar>
              <v-img src="../assets/glug.png"></v-img>
            </v-list-item-avatar>
            <!-- <v-list-item-title class="header">GLUG AUDITION PORTAL</v-list-item-title> -->
          </v-list-item>
        </v-list>
        <v-list
          nav
          dense
        >
          <v-list-item class="mt-5">
              <Round/>
          </v-list-item>
          <router-link :to="{ name: 'DashBoard_Student' }" class="navbar-items"><v-list-item link>
            <v-list-item-icon>
              <v-icon color="#7B849F">mdi-view-dashboard</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="font-weight-light sidebar">Dashboard</v-list-item-title>
          </v-list-item></router-link>
          <router-link :to="{ name: 'Profile' }" class="navbar-items"><v-list-item link >
            <v-list-item-icon >
              <v-icon color="#7B849F" >mdi-account-box</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="font-weight-light sidebar" >Profile</v-list-item-title>
          </v-list-item></router-link>
          <router-link :to="{ name: 'Rules' }" class="navbar-items"><v-list-item link>
            <v-list-item-icon>
              <v-icon color="#7B849F">mdi-book-edit-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="font-weight-light sidebar">Rules</v-list-item-title>
          </v-list-item></router-link>
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
import Round from '../components/Round.vue'

export default {
  name: 'Navigation',
  components: {
      Round,
  }
}
</script>

<style scoped>
.nav{
  height: 100%;
}
.drawer{
  border-radius: 0px 10px 10px 0px;
}
.header{
  color: #06AB48;
  font-family: 'Rubik', sans-serif;
  font-family: 300;
}

.sidebar{
  color: #7B849F;
  font-weight: 100;
}
.navbar-items{
  text-decoration: none;
}
</style>
