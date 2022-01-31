<template>
  <div>
    <v-container fluid>
      <div
        class="d-flex mb-2"
        style="background-color: rgba(0,0,0,0); width: 95%;"
        v-bind:class="{ 'flex-column justify-center mx-auto': mobileView, 'ml-4': !mobileView }"
      >
        <v-card-text
          class="mb-6 pa-0"
          id="text"
          :class="{ 'justify-center text-center mx-auto': mobileView, 'd-flex align-center justify-start text-left': !mobileView }"
        >{{ question.quesText }}</v-card-text>
        <div
          class="mx-auto d-flex flex-column"
          :class="{ 'flex-column justify-center': mobileView }"
          style="min-width: 20%;"
        >
          <v-img
            class="ma-4 img"
            v-if="question.ImageLink"
            :src="question.ImageLink"
            :class="{ 'mx-auto': mobileView, 'mt-0': !mobileView }"
          ></v-img>
          <vuetify-audio
            class="ma-4"
            v-if="question.AudioLink"
            :file="question.AudioLink"
            color="success"
            :ended="audioFinish"
            downloadable
            :class="{ 'mx-auto': mobileView }"
          ></vuetify-audio>
        </div>
      </div>
      <v-container class="d-flex justify-center">
        <div
          v-if="admin != true"
          class="d-flex flex-wrap opt_cont"
          :class="{ 'flex-column justify-center': mobileView, 'ml-4': !mobileView }"
        >
          <h4 v-if="!mobileView" style="width: 100%;">Options:</h4>
          <label
            class="option_item mx-10"
            v-for="(option, i) in question.options.split(',')"
            :key="i"
            :class="{ 'ma-3': !mobileView, 'mx-auto': mobileView }"
          >
            <input
              type="radio"
              class="checkbox"
              :value="option"
              :id="option"
              :name="option"
              v-model="answer"
            />
            <div class="option_inner d-flex flex-row py-auto">
              <div class="tickmark d-flex align-center justify-center">
                <v-icon class="icon align-center justify-center">mdi-check</v-icon>
              </div>
              <div class="name d-flex justify-center align-center text-center">{{ option }}</div>
            </div>
          </label>
        </div>
      </v-container>
    </v-container>
    <v-btn
      class="ma-2 black--text"
      :loading="loading"
      :disabled="loading"
      color="#4288CA"
      @click="saveAnswer"
    >
      <v-icon class="mr-2">mdi-content-save</v-icon>Save
    </v-btn>
  </div>
</template>

<script>
import common from "../services/common.js";
export default {
  name: "Mcqs",
  props: ["question", "admin", "studentanswer", "mobileView", "uuid"],
  data() {
    return {
      option: [],
      answer: "",
    };
  },
  components: {
    VuetifyAudio: () => import('vuetify-audio'),
  },

  created() {
    console.log(localStorage.getItem("answers"));
    if (localStorage.getItem("answers") != null) {
      var answers = JSON.parse(localStorage.getItem("answers"));
      answers.forEach((answer) => {
        if (answer.qid === this.question._id) {
          this.answer = answer.answer;
        }
      });
    }
  },
  methods: {
    saveAnswer() {
      var current_answer = JSON.parse(localStorage.getItem("answers")).find(
        answer => answer.qid === this.question.quesId
      );
      common.updateAnswer(current_answer).then(() => {
        console.log(current_answer)
      });
    },
  },
  watch: {
    answer: {
      handler() {
        console.log(this.answer);
        if (
          localStorage.getItem("answers") === null &&
          (this.admin === null || this.admin === undefined)
        ) {
          var newanswer = {
            answer: this.answer,
            qid: this.question.quesId,
            qtype: this.question.quesType,
            roundInfo: this.question.roundmodelRoundNo,
            ansLink: null,
            userUuid: this.uuid,
          };
          var ans = [];
          ans.push(newanswer);
          localStorage.setItem("answers", JSON.stringify(ans));
        } else {
          var answers = JSON.parse(localStorage.getItem("answers"));
          var foundanswer = false;
          answers.forEach(answer => {
            if (answer.qid === this.question.quesId) {
              answer.answer = this.answer;
              foundanswer = true;
            }
          });
          if (foundanswer === false) {
            var newans = {
              answer: this.answer,
              qid: this.question.quesId,
              qtype: this.question.quesType,
              roundInfo: this.question.roundmodelRoundNo,
              ansLink: null,
              userUuid: this.uuid,
            };
            answers.push(newans);
          }
          localStorage.setItem("answers", JSON.stringify(answers));
        }
      },
    }
  }
};
</script>

<style >
#text {
  color: white;
  /* text-align: center !important; */
  font-size: 1rem;
  font-weight: 500;
  max-width: 75%;
}
#studentans {
  background-color: rgba(0, 0, 0, 0);
  border-radius: 20px;
  border: 1px solid white;
}
v-img {
  text-align: center !important;
}
.rad-btn {
  width: 40% !important;
  margin: 10px;
  display: block;
}
.img {
  display: block;
  max-height: 300px;
  max-width: 300px;
  width: auto;
  height: auto;
}

.opt_cont {
  width: 700px;
}

.option_item {
  display: block;
  margin: 10px;
  width: 180px !important;
  height: 50px !important;
}

.option_item .option_inner {
  height: 100%;
  width: 100%;
  background-color: #2f333f;
  border-radius: 10px;
  padding: 5px auto;
  text-align: center;
  cursor: pointer;
  color: #fff;
  display: block;
  border: 3px solid transparent;
}

.option_item .checkbox {
  z-index: 1;
  opacity: 1;
  display: none;
}

.name {
  width: 69%;
}

.option_item .checkbox:checked ~ .option_inner {
  border-color: #515c64;
}

.option_inner .icon {
  opacity: 0;
}

.option_item .checkbox:checked ~ .option_inner {
  border-color: #515c64;
}

.option_item .checkbox:checked ~ .option_inner .tickmark {
  border-radius: 0;
}

.option_item .option_inner .tickmark {
  background-color: #515c64;
  border-radius: 5px;
  width: 31%;
  height: 100%;
}

.tickmark .icon {
  align-self: center;
}

@media screen and (max-width: 960px) {
  .img {
    max-height: 200px;
    max-width: 200px;
  }

  .opt_cont {
    width: 100%;
    margin-left: 0%;
  }

  #text {
    max-width: 90%;
  }
}
</style>
