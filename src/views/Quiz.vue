<template>
  <div>
    <v-btn
      v-if="!vertical"
      @click="drawer = !drawer"
      class="ml-5 mt-5"
      fab
      dark
      color="teal darken-1"
      style="position: fixed; z-index: 2"
    >
      <v-icon>mdi-menu</v-icon>
    </v-btn>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      :temporary="!vertical"
      :permanent="vertical"
      color="#1A1D1F"
      height="100vh"
      class="drawer"
      width="180px"
    >
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img src="../assets/glug.png"></v-img>
          </v-list-item-avatar>
          <v-list-item-title class="header">GLUG</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-list nav dense>
        <v-list-item class="mt-5"></v-list-item>
        <router-link :to="{ name: 'DashBoard_Student' }" class="navbar-items">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon color="#7B849F">mdi-view-dashboard</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="font-weight-light sidebar">Dashboard</v-list-item-title>
          </v-list-item>
        </router-link>
        <router-link :to="{ name: 'Profile' }" class="navbar-items">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon color="#7B849F">mdi-account-box</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="font-weight-light sidebar">Profile</v-list-item-title>
          </v-list-item>
        </router-link>
        <router-link :to="{ name: 'Rules' }" class="navbar-items">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon color="#7B849F">mdi-book-edit-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="font-weight-light sidebar">Rules</v-list-item-title>
          </v-list-item>
        </router-link>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon color="#7B849F">mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="sidebar">Logout</v-list-item-title>
          </v-list-item>
        </div>
      </template>
    </v-navigation-drawer>
    <v-container class="main_card">
      <v-card outlined elevation="2" class="mx-auto my-10" style="width: 80%">
        <div class="d-flex">
          <v-list-item three-line style="max-width: 50%" :class="{ 'ml-3': vertical }">
            <v-list-item-content>
              <div
                class="text-overline font-weight-regular mb-4"
                :class="{ 'text-lg-h6': vertical, 'text-caption': !vertical }"
              >
                <div class="pointer"></div>ROUND : 1
              </div>
            </v-list-item-content>
          </v-list-item>
          <Timer
            :class="{ 'mr-4': vertical }"
            :date="Math.trunc((timeNow + time) / 1000)"
            :mobileView="!vertical"
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
          <v-tab class="utab" v-for="(question, i) in questions" :key="i">Q. {{ i + 1 }}</v-tab>

          <v-tab-item v-for="(question, i) in questions" :key="i">
            <Textques :question="question" :mobileView="!vertical" v-if="question.type === 'text'" />
            <Mcqs :question="question" :mobileView="!vertical" v-if="question.type === 'mcq'" />
            <Mcqm :question="question" :mobileView="!vertical" v-if="question.type === 'mcqm'" />
            <FileUpload
              :question="question"
              :mobileView="!vertical"
              v-if="question.type === 'file'"
            />
          </v-tab-item>
        </v-tabs>
      </v-card>
      <div
        class="d-flex justify-end mx-auto"
        style="width: 80%"
        :class="{ 'justify-center': !vertical }"
      >
        <v-btn
          class="ma-2 black--text"
          :loading="loading"
          :disabled="loading"
          color="#4288CA"
          @click="saveOptions"
        >
          <v-icon class="mr-2">mdi-content-save</v-icon>Save
        </v-btn>
        <v-btn
          class="ma-2 black--text"
          :loading="loading"
          :disabled="loading"
          color="#4288CA"
          @click="nextQuestion"
        >
          <v-icon class="mr-2">mdi-arrow-right-top</v-icon>Next Question
        </v-btn>
      </div>
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
//import Navigation from '../components/Navigation_student.vue';
import Timer from "../components/Timer.vue";
import Textques from "../components/Textques.vue";
import Mcqs from "../components/Mcqs.vue";
import Mcqm from "../components/Mcqm.vue";
import FileUpload from "../components/FileUpload.vue";
import common from "../services/common.js"
//import SingleCorrect from '../components/SingleCorrect.vue';

export default {
  name: "Quiz",
  components: {
    Timer,
    Textques,
    Mcqm,
    Mcqs,
    FileUpload,
  },
  data: () => ({
    questions: null,
    tab: null,
    timeNow: Date.now(),
    time: 3600000,
    drawer: false,
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
    saveOptions() {
      localStorage.setItem("student_answers", JSON.stringify());
    },
  },
  beforeCreate() {
    if (localStorage.getItem("token") === null) {
      this.$router.push("/");
    } else {
      console.log("lol");
      common.getstudentRound().then(res => {
        console.log(res.data);
        let t = res.data.time - 2000 - new Date().getTime();
        if (t > 0) {
          this.time = Math.round(t / 1000);
          this.questions = res.data.question_set_models;
          this.round = res.data.roundNo;
          this.currentab = this.questions[0]._id;
          setTimeout(this.autosubmit, this.time * 1000);
        } else {
          this.$router.push("/");
        }
      });
      common.getAnswers().then(res => {
        console.log(res.data);
        localStorage.setItem("answers", JSON.stringify(res.data.answers));
      });
    }
  },
};
</script>
