<template>
  <div class="background">
    <NavigationDrawer :role="role"/>
    <div class="main">
    <div class="container">
          <QuesTimeline v-bind:Questions="Questions"/>
      <div class="inputQues">
          <AddForm v-bind:Questions="Questions"/>
      </div>
  
    </div>
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
  margin-right: 95px;
  
}
.container{
  display: flex;
  border: 2px solid #293135;
  border-radius: 10px;
  padding: 20px;
  
}
.inputQues{
  /* border: 2px solid pink; */
  width: 100%;
}
</style>

<script>
import QuesTimeline from '../components/QuestionTimeline.vue'
import NavigationDrawer from '../components/Navigation.vue'
import AddForm from '../components/Add-Form.vue'
import VueJwtDecode from "vue-jwt-decode";
export default {
  data: () => ({
      Questions:[]
    }),

  components: {
    NavigationDrawer,
    AddForm,
    QuesTimeline
  },
  watch: {
    Questions: {
      handler() {
        if (localStorage.getItem("Questions"))
      this.Questions = JSON.parse(localStorage.getItem("Questions"));
      },
      deep: true
    },
  },
  created() {

            var tok = VueJwtDecode.decode(localStorage.getItem("token").substring(6));
            this.role = tok.role;
    },
}
</script>
