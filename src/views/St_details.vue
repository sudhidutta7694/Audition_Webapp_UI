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
        v-if="
            currentround > details.round &&
            (status === 'rejected' || status === 'unevaluated') &&
            subool === true
          "
        color="primary"
        >WILD-CARD</v-btn
      >
       <v-btn
          class="mx-2"
          light
          small
          v-if="currentround === details.round && subool === true"
          v-on:click="extendtime"
          height="35px"
          >Extend Time (By 10 min)</v-btn
        >
        </div>
        <h2 class="text-center" v-if="details.time > 0" style="padding: 0px; margin: 5px;">
          Time ends at: {{ new Date(details.time).toString().substring(0, 24) }}
        </h2>
        <h2 class="text-center" v-if="details.time == 0" style="padding: 0px; margin: 5px;">Hasn't attempted yet</h2>
      <v-stepper v-model="e1" width="95%">
        <v-stepper-header>
          <v-stepper-step :complete="1" step="1"> {{ details.name.toUpperCase() }} </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="2" step="2"> {{ details.phone }} </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3" :complete="3">
            {{ details.email }}
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="4" :complete="4"> {{ details.roll }} </v-stepper-step>
        </v-stepper-header>
      </v-stepper>
      <v-row>
        <v-col>
      <div class="mt-10">
        <v-card v-if="answers.length == 0">
            <h2 style="color: red; text-align: center;">Hasn't attempted any questions.</h2>
        </v-card>
        <v-card class="overview" max-width="95%" outlined color="#1A1D1F" v-if="answers.length != 0">
          <v-tabs
            v-model="tab"
            background-color="transparent"
            color="basil"
            grow
            class="mt-10"
          >
            <v-tab v-for="round in answers" :key="round.roundNo">
              Round {{ round.roundNo }}
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item v-for="round in answers" :key="round.roundNo">
              <v-card color="basil" flat>
                <div v-for="(question,index) in round.questions"
                  :key="question._id" class="ma-5">
                  <h1>{{index+1}}. {{question.Ques}}</h1>
                  <h5>ANSWER:</h5><small>{{question.answer}}</small>
                </div>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </div>
        </v-col>
        <v-col>
      <div class="mt-10">
        <v-card class="overview pa-10" max-width="90%" outlined color="#1A1D1F">
          SELECTION STATUS:
          <v-select
            :items="Status"
            v-model="status"
            v-on:change="changeStatus()"
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
            v-model="feedback"
            name="input-7-4"
            value=""
            class="mt-5"
            style="width: 60%"
          ></v-textarea>

          <v-btn color="#beffc1" class="black--text" @click="submitFeedback"> SAVE </v-btn>
        <v-alert outlined color="#00FFFF">
              <div class="title">FEEDBACKS</div>
              <v-select
                v-model="filter"
                :items="filteroptions"
                label="See feedback for ..."
                solo
              ></v-select>

              <div>
                <v-data-iterator
                  :items="filteredItems"
                  item-key="_id"
                  :single-expand="expand"
                >
                  <template v-slot:default="{ items }">
                    <v-row>
                      <v-col
                        v-for="item in items"
                        :key="item._id"
                        cols="40"
                        sm="12"
                      >
                        <v-alert outlined color="#00FFFF">
                          <v-list-item-content>
                            {{ item.feedback }}
                          </v-list-item-content>
                          <v-divider
                            class="my-4 info"
                            style="opacity: 0.22"
                          ></v-divider>
                          <v-list-item-content>
                            <v-list-item-title
                              >- {{ item.user }} in Round
                              {{ item.round }}</v-list-item-title
                            >
                          </v-list-item-content>
                        </v-alert>
                      </v-col>
                    </v-row>
                  </template>
                </v-data-iterator>
              </div>
            </v-alert>
        </v-card>
      </div>
      </v-col>
    </v-row>
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
      Questions: [
        {
          Ques: "abc",
          QuesType: "SINGLE CHOICE",
          options:[
            {
              choice1:"xyz",
              choice2:"xyz",
              choice3:"xyz",
              choice4:"xyz",
            }
          ]
        },
        {
          Ques: "abc",
          QuesType: "TEXTAREA",
        },
        {
          Ques: "abc",
          QuesType: "MULTIPLE CHOICE",
          options:[
            {
              choice1:"xyz",
              choice2:"xyz",
              choice3:"xyz",
              choice4:"xyz",
            }
          ]
        },
        {
          Ques: "abc",
          QuesType: "ATTACH FILE",
        }
      ],
      desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
          },
          {
            name: 'Eclair',
            calories: 262,
          },
          {
            name: 'Cupcake',
            calories: 305,
          },
          {
            name: 'Gingerbread',
            calories: 356,
          },
          {
            name: 'Jelly bean',
            calories: 375,
          },
          {
            name: 'Lollipop',
            calories: 392,
          },
          {
            name: 'Honeycomb',
            calories: 408,
          },
          {
            name: 'Donut',
            calories: 452,
          },
          {
            name: 'KitKat',
            calories: 518,
          },
        ],
    };
  },
};
</script>
