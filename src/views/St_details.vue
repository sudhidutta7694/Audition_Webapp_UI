<template>
  <div class="background">
    <NavigationDrawer/>
      <div class="main">
        
    <v-card
    class="overview"
    max-width="95%"
    height="320px"
    outlined color="#1A1D1F" 
  >
  <div class="inner">
    <v-list-item>
      <v-list-item-content style="height:50px">
        <div class="text-overline mb-4 top">
          <div class="pointer"></div>
          <div class="green--text font-weight-bold status">
          SELECTED
          </div>
        </div>
      </v-list-item-content>
    </v-list-item>
    <v-container fluid>
      <v-row dense>
        
        <v-col style="margin:5px; height:250px"
        >
          <div class="details font-weight-thin">
            <strong>NAME:</strong>  RUDRA <br/>
            <strong>PHONE NUMBER:</strong>  9876543210 <br/>
            <strong>EMAIL :</strong>  rudra@gmail.com <br/>
            <strong>ROLL NO.:</strong>   21E8067 <br/>
          </div>
        </v-col>
       
      </v-row>
    </v-container>
    </div>
  </v-card>

        
        <div class="mt-10">
         <v-card
    class="overview"
    max-width="95%"
    outlined color="#1A1D1F" 
  >
        <v-tabs
      v-model="tab"
      background-color="transparent"
      color="basil"
      grow
      class="mt-10"
    >
      <v-tab
        v-for="item in items"
        :key="item"
      >
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in items"
        :key="item"
      >
        <v-card
          color="basil"
          flat
        >
         <v-stepper
    v-model="e6"
    vertical
    style="background-color:transparent"
  >
    <v-stepper-step
      :complete="e6 > 1"
      step="1"
      color="#a692ff"
    >
      QUESTION 1
      <small>Single Choice</small>
    </v-stepper-step>

    <v-stepper-content step="1">
      <v-card
        color="grey lighten-1"
        class="mb-12"
        height="200px"
      ></v-card>
     <v-btn
      class="ma-2"
      outlined
      color="primary"
      @click="e6 = 2"
    >
      NEXT  </v-btn>
     
    </v-stepper-content>

    <v-stepper-step
      :complete="e6 > 2"
      step="2"
      color="#a692ff"
    >
      QUSETION 2
      <small>Multiple Choice</small>
    </v-stepper-step>

    <v-stepper-content step="2">
      <v-card
        color="grey lighten-1"
        class="mb-12"
        height="200px"
      ></v-card>
        <v-btn
      class="ma-2"
      outlined
      color="primary"
      @click="e6 = 3"
    >
      NEXT    </v-btn>
     
    </v-stepper-content>

    <v-stepper-step
      :complete="e6 > 3"
      step="3"
      color="#a692ff"
    >
      QUESTION 3
      <small>File Upload</small>
    </v-stepper-step>

    <v-stepper-content step="3">
      <v-card
        color="grey lighten-1"
        class="mb-12"
        height="200px"
      ></v-card>
     <v-btn
      class="ma-2"
      outlined
      color="primary"
      @click="e6 = 4"
    >
      NEXT  </v-btn>
     
    </v-stepper-content>

    <v-stepper-step step="4"
    color="#a692ff">
      QUSETION 4
      <small>Type Answer</small>
    </v-stepper-step>
    <v-stepper-content step="4">
      <v-card
        color="grey lighten-1"
        class="mb-12"
        height="200px"
      ></v-card>
      <v-btn
      class="ma-2"
      outlined
      color="primary"
      @click="e6 = 1"
    >
      NEXT  </v-btn>

    </v-stepper-content>
  </v-stepper>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
        </div>

        <div class="mt-10 ">
            <v-card class="overview pa-10"
             max-width="95%"
             outlined color="#1A1D1F" >
             SELECTION STATUS:
                  <v-select
              :items="Status"
              v-model="status"
              dense
              outlined
              value="SELECTION STATUS"
              color="#7B849F"
              class="mt-5 mb-5 dropdown"
              style="width: 30%; border:0.2px solid #7B849F; height:40px;"
            ></v-select>
            SUBMIT FEEDBACK:
               <v-textarea
          outlined
          name="input-7-4"
          value=""
          class="mt-5"
          style="width:60%"
        ></v-textarea>
        
        <v-btn color="#beffc1" class="black--text">
          SAVE
        </v-btn>
            </v-card>
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
}
.details{
  margin: 20px;
  line-height: 45px;
  font-size: 1.5rem;
}
strong{
  color: #7B849F;
}
.status{
  font-size: 1.3rem;
}
.inner{
  border: 1px solid #7B849F;
  margin: 20px;
  height: 280px;
}
</style>

<script>
import NavigationDrawer from '../components/Navigation.vue'

export default {
    name: 'Dashboard',
    components:{
       NavigationDrawer,
    },
    data () {
      return {
        e6: 1,
        tab: null,
        status:"",
        items: [
          'ROUND 1', 'ROUND 2'
        ],
        Status:[
          'SELECT','REJECT'
        ]
      }
    },
  }
</script>