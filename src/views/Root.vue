<template>
  <div class="background">
    <NavigationDrawer/>
    <div class="main">
     <v-btn color="#BEFFC1" class="mt-2 black--text" @click="uploadAudio" style="max-width:10%">
                PUSH ROUND
    </v-btn>
    <Sparkline/>
    <Table/>
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
import Sparkline from '../components/sparkline.vue'
import Table from '../components/Table.vue'
export default {
    name: 'Root',
    components:{
       NavigationDrawer,
       Table,
       Sparkline
    },
  }
</script>
