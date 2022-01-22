<template>
  <div class="background">
    <NavigationDrawer/>
    <div class="main">
    <v-card
    class="overview"
    max-width="95%"
    outlined color="#1A1D1F" 
    >
    <v-list-item>
      <v-list-item-content style="height:50px">
        <div class="text-overline mb-4">
          <div class="pointer"></div> LOG
        </div>
      </v-list-item-content>
    </v-list-item>
    </v-card>
    <v-card
    class="overview mt-5 pa-5"
    max-width="95%"
    outlined color="#1A1D1F" 
    >
    <v-card-text class="py-0">
      <v-timeline
        align-top
        dense
      >
        <v-timeline-item
          color="pink"
          small
        >
          <v-row class="pt-1">
            <v-col cols="3">
              <strong>5pm</strong>
            </v-col>
            <v-col>
              <strong>New Icon</strong>
            </v-col>
            <v-col>
              <strong>New Icon</strong>
            </v-col>
          </v-row>
        </v-timeline-item>

        <v-timeline-item
          color="teal lighten-3"
          small
        >
          <v-row class="pt-1">
            <v-col cols="3">
              <strong>3-4pm</strong>
            </v-col>
            <v-col>
              <strong>Design Stand Up</strong>
            </v-col>
            <v-col>
              <strong>Design Stand Up</strong>
            </v-col>
          </v-row>
        </v-timeline-item>

        <v-timeline-item
          color="pink"
          small
        >
          <v-row class="pt-1">
            <v-col cols="3">
              <strong>12pm</strong>
            </v-col>
            <v-col>
              <strong>Lunch break</strong>
            </v-col>
          </v-row>
        </v-timeline-item>

        <v-timeline-item
          color="teal lighten-3"
          small
        >
          <v-row class="pt-1">
            <v-col cols="3">
              <strong>9-11am</strong>
            </v-col>
            <v-col>
              <strong>Finish Home Screen</strong>
            </v-col>
            <v-col>
              <strong>Finish Home Screen</strong>
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
.background{
    background-color:  #111315;
    display: flex;
    height: 100%;
    overflow: hidden;
}
.main{
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
import NavigationDrawer from '../components/Navigation.vue'
// import Round from '../components/Header.vue'
export default {
    name: 'Logs',
    components:{
       NavigationDrawer,
    //    Round,
    },
  }
</script>
