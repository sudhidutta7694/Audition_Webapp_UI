<template>
  <div class="background">
    <NavigationDrawer/>
    <div class="main">
    <div class="container">
          <QuesTimeline/>
      <div class="inputQues">
         <AddForm/>
      </div>
  
    </div>
    <br />
    <v-container v-for="(question, index) in Questions" :key="index">
      <v-card class="overview" max-width="50%" outlined color="#1A1D1F">
        <DispQues :question="question" />
      </v-card>
    </v-container>
    <!-- <div class="d-flex float-right mr-12 pa-2">
      <router-link :to="{ name: 'Root' }">
        <v-btn
          class="ma-2"
          :loading="loading"
          :disabled="loading"
          color="#4288CA"
          @click="loader = 'loading1'"
          style="text-decoration: none"
        >
          Save Round
          <template v-slot:loader>
            <span class="custom-loader">
              <v-icon light>mdi-cached</v-icon>
            </span>
          </template>
        </v-btn></router-link
      >
    </div>
    <router-view /> -->
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
import DispQues from "../components/Display-Ques.vue";
import QuesTimeline from '../components/QuestionTimeline.vue'
import NavigationDrawer from '../components/Navigation.vue'
import AddForm from '../components/Add-Form.vue'
export default {
  components: {
    NavigationDrawer,
    AddForm,
    DispQues,
    QuesTimeline
  },
}
</script>
