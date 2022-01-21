<template>
  <div class="background">
    <NavigationDrawer/>
    <div class="main">
    <EditTable/>
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
import EditTable from '../components/editTable.vue'
export default {
    name: 'Dashboard',
    components:{
       NavigationDrawer,
       EditTable


    },
  }
</script>