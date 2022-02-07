<template>
  <div>
    <Navigation :role="role" />
    <v-container class="main_card">
      <v-card outlined elevation="2" class="mx-auto my-10" style="width: 80%">
        <div class="d-flex">
          <v-list-item three-line style="max-width: 50%" :class="{ 'ml-3': vertical }">
            <v-list-item-content>
              <div
                class="text-overline font-weight-regular mb-4"
                :class="{ 'text-lg-h6': vertical, 'text-caption': !vertical }"
              >
                <div class="pointer"></div>
                ROUND : {{ round }}
              </div>
            </v-list-item-content>
          </v-list-item>
          <Timer
            :class="{ 'mr-4': vertical }"
            :time="time"
            :mobileView="!vertical"
            :question="questions"
          />
        </div>
        <v-tabs
          v-model="tab"
          class="ques-box"
          :vertical="vertical"
          :show-arrows="!vertical"
          color="white"
        >
          <v-tabs-slider color="green"></v-tabs-slider>
          <v-tab
            class="utab"
            v-for="(question, i) in questions"
            :key="i"
            @click="saveAnswer(question.quesId)"
          >Q. {{ i + 1 }}</v-tab>

          <v-tab-item v-for="(question, i) in questions" :key="i">
            <Textques
              :question="question"
              :mobileView="!vertical"
              :uuid="uuid"
              v-if="question.quesType === 'TEXTAREA'"
            />
            <Mcqs
              :question="question"
              :mobileView="!vertical"
              :uuid="uuid"
              v-if="question.quesType === 'SINGLE CHOICE'"
            />
            <Mcqm
              :question="question"
              :mobileView="!vertical"
              :uuid="uuid"
              v-if="question.quesType === 'MULTIPLE CHOICE'"
            />
            <FileUpload
              :question="question"
              :mobileView="!vertical"
              :uuid="uuid"
              v-if="question.quesType === 'ATTACH FILE'"
            />
          </v-tab-item>
        </v-tabs>
      </v-card>
      <div
        class="d-flex justify-end mx-auto"
        style="width: 80%"
        :class="{ 'flex-column justify-center': !vertical }"
      >
        <v-btn
          class="ma-2 black--text"
          :loading="loading"
          :disabled="loading"
          color="#4288CA"
          @click="saveRound"
        >
          <v-icon class="mr-2">mdi-content-save</v-icon>Save Round
        </v-btn>
        <v-btn v-if="tab !== 0" class="ma-2 black--text" color="#4288CA" @click="prevQuestion">
          <v-icon class="mr-2">mdi-arrow-left-top</v-icon>Previous Question
        </v-btn>
        <v-btn
          v-if="tab !== questions.length - 1"
          class="ma-2 black--text"
          color="#4288CA"
          @click="nextQuestion"
        >
          <v-icon class="mr-2">mdi-arrow-right-top</v-icon>Next Question
        </v-btn>
      </div>
      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-text>Your Answers are saved.</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <router-link to="/dash" style="text-decoration: none;">
              <v-btn color="primary" text @click="dialog = false">Return to Dashboard</v-btn>
            </router-link>
            <v-btn color="primary" text @click="dialog = false">Return to Attempt</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<style>
.mcq-options {
  border: 0.02rem solid rgba(245, 245, 245, 0.521);
  border-radius: 4px;
  width: 50%;
}

.main_card {
  margin-left: 180px;

  width: auto;
}

.utab {
  width: 10% !important;
}

.pointer {
  background-color: #06b2dd;
  width: 10px;
  height: 25px;
  border-radius: 10px;
  margin-right: 8px;
}

.sidebar {
  color: #7b849f;
  font-weight: bold;
  font-family: "Roboto", sans-serif;
}

.drawer {
  border-radius: 0px 10px 10px 0px;
}
.header {
  color: #06ab48;
  font-family: "Rubik", sans-serif;
  font-weight: 300;
}

.navbar-items {
  text-decoration: none;
}

@media screen and (max-width: 960px) {
  .utab {
    width: 2% !important;
  }

  .main_card {
    margin-left: 0;
  }
}
</style>

<script>
import Navigation from '../components/Navigation.vue';
import Timer from "../components/Timer.vue";
import Textques from "../components/Textques.vue";
import Mcqs from "../components/Mcqs.vue";
import Mcqm from "../components/Mcqm.vue";
import FileUpload from "../components/FileUpload.vue";
import common from "../services/common.js";
import VueJwtDecode from "vue-jwt-decode";
//import SingleCorrect from '../components/SingleCorrect.vue';

export default {
  name: "Quiz",
  components: {
    Timer,
    Textques,
    Mcqm,
    Mcqs,
    FileUpload,
    Navigation,
  },
  data: () => ({
    questions: [],
    tab: null,
    timeNow: Date.now(),
    time: null,
    drawer: false,
    uuid: VueJwtDecode.decode(localStorage.getItem("token").substring(6)).uuid,
    role: "",
    dialog: false,
    loading: false,
    student: null,
  }),
  computed: {
    vertical() {
      var s = this.$vuetify.breakpoint.name;
      if (s == "xs" || s == "sm") {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    nextQuestion() {
      this.tab = this.tab + 1;
    },
    prevQuestion() {
      this.tab = this.tab - 1;
    },
    saveRound() {
      this.loading = true;
      var current_answer = JSON.parse(localStorage.getItem("answers"))
      let ans = {
        answers: current_answer
      }
      // let ans = current_answer
      common.submitRound(ans).then(() => {
        console.log(ans)
        console.log(typeof (ans))
        this.dialog = true;
        this.loading = false;
      });
    },
    saveAnswer(qid) {
      if (localStorage.getItem("answers") != null) {
        var answers = JSON.parse(localStorage.getItem("answers"));
        answers.forEach((answer) => {
          if (answer.qid === qid) {
            // console.log("---------")
            // console.log(typeof (answer))
            common.updateAnswer(answer).then(() => {
              console.log(answer)
            });
          }
        });
      }
    }
  },
  beforeCreate() {
    console.log(localStorage.getItem("token"));
    if (localStorage.getItem("token") === null) {
      this.$router.push("/");
    } else {
      //console.log("lol");
      common.getstudentRound().then(res => {
        /* console.log(res.data.time)
        console.log(new Date(res.data.time).toLocaleTimeString('en-US')) */
        let t = res.data.time - 2000;
        if (t > 0) {
          this.time = t / 1000;
          this.questions = res.data.data[0].question_set_models;
          console.log(this.questions)
          this.round = res.data.data[0].roundNo;
          this.currentab = this.questions[0].id;
          setTimeout(this.autosubmit, this.time * 1000);
        } else {
          this.$router.push("/");
        }
      });
      common.getAnswers().then(res => {
        console.log(res.data);
        if (localStorage.getItem("answers") === null) {
          localStorage.setItem("answers", JSON.stringify(res.data.answers));
        } else {
          localStorage.removeItem("answers");
          localStorage.setItem("answers", JSON.stringify(res.data.answers));
        }
      });

      common.getStudent().then(res => {
        console.log(res.data);
        this.student = res.data;
      });

      if (this.student.studentround != this.audition.round) {
        this.$router.push("/dash")
      }
    }
  },
  created() {
    this.$vuetify.theme.dark = true;
    if (localStorage.getItem("token") === null) {
      this.$router.push("/");
    } else {
      var tok = VueJwtDecode.decode(localStorage.getItem("token").substring(6));
      this.role = tok.role;
    }

  },
};
</script>
