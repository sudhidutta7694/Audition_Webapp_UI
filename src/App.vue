<template>
  <v-app style="overflow: hidden">
    <v-content>
      <router-view></router-view>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Footer from './components/layout/Footer.vue'

export default {
  name: 'App',

  data: () => ({
    //
  }),
  components: {
    Footer,
  }
};
</script>
