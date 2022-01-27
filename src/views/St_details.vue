<template>
  <div class="background">
    <NavigationDrawer />
    <div class="main">
      <div class="top">
      <v-btn
        @click="wildcard"
        outlined
        color="red"
        class="mr-2"
        >REJECTED</v-btn
      >
      <v-btn
        @click="wildcard"
        color="primary"
        >WILD-CARD</v-btn
      >
       <v-btn
          class="mx-2"
          light
          small
          v-on:click="extendtime"
          height="35px"
          >Extend Time (By 10 min)</v-btn
        >
        </div>
      <v-stepper v-model="e1" width="95%">
        <v-stepper-header>
          <v-stepper-step :complete="1" step="1"> RUDRADITYA </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="2" step="2"> 9876543210 </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3" :complete="3">
            rudraditya@gmail.com
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="4" :complete="4"> 21F8098 </v-stepper-step>
        </v-stepper-header>
      </v-stepper>
      <div class="mt-10">
        <v-card class="overview" max-width="95%" outlined color="#1A1D1F">
          <v-tabs
            v-model="tab"
            background-color="transparent"
            color="basil"
            grow
            class="mt-10"
          >
            <v-tab v-for="item in items" :key="item">
              {{ item }}
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item v-for="item in items" :key="item">
              <v-card color="basil" flat>
                <v-stepper
                  v-model="e6"
                  vertical
                  style="background-color: transparent"
                >
                  <v-stepper-step :complete="e6 > 1" step="1" color="#a692ff">
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
                      NEXT
                    </v-btn>
                  </v-stepper-content>

                  <v-stepper-step :complete="e6 > 2" step="2" color="#a692ff">
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
                      NEXT
                    </v-btn>
                  </v-stepper-content>

                  <v-stepper-step :complete="e6 > 3" step="3" color="#a692ff">
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
                      NEXT
                    </v-btn>
                  </v-stepper-content>

                  <v-stepper-step step="4" color="#a692ff">
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
                      NEXT
                    </v-btn>
                  </v-stepper-content>
                </v-stepper>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </div>

      <div class="mt-10">
        <v-card class="overview pa-10" max-width="95%" outlined color="#1A1D1F">
          SELECTION STATUS:
          <v-select
            :items="Status"
            v-model="status"
            dense
            outlined
            value="SELECTION STATUS"
            color="#7B849F"
            class="mt-5 mb-5 dropdown"
            style="width: 30%; border: 0.2px solid #7b849f; height: 40px"
          ></v-select>
          SUBMIT FEEDBACK:
          <v-textarea
            outlined
            name="input-7-4"
            value=""
            class="mt-5"
            style="width: 60%"
          ></v-textarea>

          <v-btn color="#beffc1" class="black--text"> SAVE </v-btn>
        </v-card>
      </div>
    </div>
      <v-snackbar
          v-model="extendtimeSnackbar"
          class="text-center"
          color="success"
          :timeout="2000"
          >Time Extended for the student by 10 minutes</v-snackbar
        >
  </div>
</template>
<style scoped>
.background {
  background-color: #111315;
  display: flex;
  height: 100%;
  overflow: hidden;
}
.main {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  margin: 30px;
  overflow: hidden;
  margin-left: 210px;
}
.details {
  margin: 20px;
  line-height: 45px;
  font-size: 1.5rem;
}
strong {
  color: #7b849f;
}
.status {
  font-size: 1.3rem;
}
.inner {
  border: 1px solid #7b849f;
  margin: 20px;
  height: 280px;
}
.top{
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
  width: 95%;
}
</style>

<script>
import NavigationDrawer from "../components/Navigation.vue";

export default {
  name: "Dashboard",
  components: {
    NavigationDrawer,
  },
  data() {
    return {
      e6: 1,
      tab: null,
      status: "",
      extendtimeSnackbar:true,
      items: ["ROUND 1", "ROUND 2"],
      Status: ["SELECT", "REJECT"],
    };
  },
};
</script>
