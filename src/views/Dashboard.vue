<template>
  <div class="background">
    <NavigationDrawer/>
    <div class="main">
    <Round/>
    <Stats/> 
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
import Stats from '../components/Stats-Section.vue'
import Round from '../components/Round.vue'
import Table from '../components/Table.vue'
export default {
    name: 'Dashboard',
    components:{
       NavigationDrawer,
       Stats,
       Round,
       Table
    },
  }
</script>
