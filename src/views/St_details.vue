<template>
  <div class="background">
    <NavigationDrawer :role="role" />
    <div class="main">
      <div class="top">
        <v-btn outlined :color="color" class="mr-2">{{ details.status }}</v-btn>
        <v-btn
          @click="wildcard"
          v-if="
            currentround > details.round &&
            (details.status === 'rejected' ||
              details.status === 'unevaluated') &&
            subool === true
          "
          color="primary"
          >WILD-CARD</v-btn
        >
        <v-btn
          class="mx-2"
          light
          small
          v-if="subool === true"
          v-on:click="extendtime"
          height="35px"
          >Extend Time (By 10 min)</v-btn
        >
      </div>
      <h2
        class="text-center"
        v-if="details.time > 0"
        style="padding: 0px; margin: 5px"
      >
        Time ends at: {{ new Date(details.time).toString() }}
      </h2>
      <h2
        class="text-center"
        v-if="details.time == 0"
        style="padding: 0px; margin: 5px"
      >
        Hasn't attempted yet
      </h2>
      <v-stepper v-model="e1" width="95%">
        <v-stepper-header>
          <v-stepper-step :complete="1" step="1"
            >{{ details.username.toUpperCase() }}
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="2" step="2"
            >{{ details.email.toUpperCase() }}
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3" :complete="3"
            >{{ details.roll }}
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="4" :complete="4"
            >{{ details.phone }}
          </v-stepper-step>
        </v-stepper-header>
      </v-stepper>
      <v-row>
        <v-col>
          <div class="mt-10">
            <v-card v-if="answers.length == 0" class="pa-10">
              <h2 style="color: red; text-align: center">
                Hasn't attempted any questions.
              </h2>
            </v-card>
            <v-card
              class="overview"
              max-width="95%"
              outlined
              color="#1A1D1F"
              v-if="answers.length != 0"
            >
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
                    <div
                      v-for="(question, index) in round.questions"
                      :key="index"
                      class="ma-5"
                    >
                      <h2>{{ index + 1 }}. {{ question.quesText }}</h2>
                      <div style="display: flex">
                        <h5 style="color: grey">ANSWER:</h5>
                        <h4 class="ml-5" style="color: blue">
                          {{ question.answer }}
                        </h4>
                      </div>
                    </div>
                  </v-card>
                </v-tab-item>
              </v-tabs-items>
            </v-card>
          </div>
        </v-col>
        <v-col>
          <div class="mt-10">
            <v-card
              class="overview pa-10"
              max-width="90%"
              outlined
              color="#1A1D1F"
            >
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

              <v-btn
                color="#beffc1"
                class="black--text"
                @click="submitFeedback"
              >
                SAVE
              </v-btn>
              <!-- <v-alert outlined color="#00FFFF">
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
            </v-alert> -->
            </v-card>
          </div>
        </v-col>
      </v-row>
    </div>
    <v-snackbar v-model="statusSnackbar" color="success" elevation="12" app>{{
      statusUpdate
    }}</v-snackbar>
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
.top {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
  width: 95%;
}
</style>

<script>
import NavigationDrawer from "../components/Navigation.vue";
import VueJwtDecode from "vue-jwt-decode";
import common from "@/services/common.js";
export default {
  name: "Dashboard",
  components: {
    NavigationDrawer,
  },
  data() {
    return {
      e6: 1,
      tab: null,
      color: "",
      subool: false,
      currentround: "",
      status: "",
      extendtimeSnackbar: false,
      details: [],
      filteroptions: [],
      Status: ["selected", "rejected"],
      Questions: [],
      rounds: [],
      responses: [],
      answers: [],
      respons: [],
      statusSnackbar: false,
      statusUpdate: "",
      time: "",
    };
  },
  beforeCreate() {
    const a = { uuid: this.$route.query.uuid };
    console.log(a);
    if (localStorage.getItem("token") === null) {
      this.$router.push("/");
    } else if (
      VueJwtDecode.decode(localStorage.getItem("token").substring(6)).role ===
      "s"
    ) {
      this.$router.push("/");
    } else {
      console.log(
        VueJwtDecode.decode(localStorage.getItem("token").substring(6))
      );
      common.getUser(a).then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          this.details = res.data.data[0][0];
          this.responses = res.data.data[0][1].responses;
          console.log(this.details);
          for (var i = 1; i <= this.details.round; i++) {
            this.filteroptions.push(`Round ${i}`);
          }

          if (
            VueJwtDecode.decode(localStorage.getItem("token").substring(6))
              .clearance >= this.details.round ||
            VueJwtDecode.decode(localStorage.getItem("token").substring(6))
              .role === "su"
          ) {
            this.clearance = false;
          }
          if (
            VueJwtDecode.decode(localStorage.getItem("token").substring(6))
              .role === "su"
          ) {
            this.subool = true;
          }
          // console.log(res);
          this.time = new Date(this.details.time).toString().substring(0, 24);
          this.color =
            this.details.status == "unevaluated"
              ? "grey"
              : this.details.status == "selected"
              ? "green"
              : "red";
          common.getRounds().then((res) => {
            this.rounds = res.data;
            console.log(this.responses);
            console.log(this.rounds);
            this.rounds.forEach((round) => {
              this.responses.forEach((resp) => {
                if (resp.roundInfo == round.roundNo) {
                  this.respons.push(resp);
                }
              });
              var roundentry = {
                roundNo: round.roundNo,
                questions: [],
              };
              this.respons.forEach((question) => {
                var foundques = round.question_set_models.find(
                  (e) => e.quesId == question.qid
                );
                if (foundques != undefined) {
                  var a = {
                    quesType: question.qtype,
                    answer: question.answer,
                    _id: question.qid,
                    quesLink: foundques.quesLink,
                    quesText: foundques.quesText,
                    options: foundques.options,
                  };
                  roundentry.questions.push(a);
                }
              });
              if (roundentry.questions.length != 0) {
                this.answers.push(roundentry);
              }
            });
            console.log(this.answers);
          });
          this.tab = this.answers.length - 1;
          common.getAuditionStatus().then((res) => {
            console.log(res);
            this.currentround = res.data.round;
          });
        } else if (res.status === 401) {
          alert("UNAUTHORISED ACCESS");
          localStorage.clear("token");
          this.$router.push("/");
        } else {
          alert("No data");
        }
      });
    }
  },
  methods: {
    extendtime() {
      common.extendtime({ uuid: this.details.uuid }).then(() => {
        if (this.details.time < new Date().getTime())
          this.details.time = new Date().getTime() + 600000 + 2000;
        else this.details.time += 600000;
        this.extendtimeSnackbar = true;
        console.log(this.extendtimeSnackbar);
      });
    },
    changeStatus() {
      if (this.status != "unevaluated") {
        this.details.status = this.status;
        this.updateEntry();
      }
    },
    updateEntry() {
      this.statusSnackbar = true;
      var a = this.details;
      common.updateEntry(a).then((res) => {
        this.statusUpdate = res.data.message;
        alert(res.data.message);
      });
    },
  },
  created() {
    var tok = VueJwtDecode.decode(localStorage.getItem("token").substring(6));
    this.role = tok.role;
  },
  wildcard() {
    common.wildcard(this.details.uuid).then(() => {
      this.$router.push("/admin");
    });
  },
};
</script>
