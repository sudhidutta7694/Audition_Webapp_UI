<template>
  <div>
    <v-container :class="{ 'd-flex flex-column justify-center': mobileView }">
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
      <div class="input_field">
        <v-file-input
          v-model="file"
          show-size
          dense
          counter
          chips
          accept="image/png, image/jpeg, image/bmp, image/jpg, audio/mp3, audio/wav, .txt, .zip, .cpp, .js, .css, .html, .c"
          color="success"
          prepend-icon="mdi-file"
          label="Pick an File"
          outlined
        />
      </div>
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
import common from '../services/common.js'
export default {
  name: "FileUpload",
  props: ["question", "admin", "studentanswer", "mobileView"],
  data: () => ({
    test: [],
    answer: "",
    file: null,
  }),
  components: {
    VuetifyAudio: () => import('vuetify-audio'),
  },

  created() {
    console.log(localStorage.getItem("answers"));
    if (localStorage.getItem("answers") != null) {
      var answers = JSON.parse(localStorage.getItem("answers"));
      answers.forEach(answer => {
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
    file: {
      handler() {
        console.log(this.file);
        if (
          localStorage.getItem("answers") === null &&
          (this.admin === null || this.admin === undefined)
        ) {
          console.log("============")
          console.log(this.file)
          console.log("============")
          var newanswer = {
            answer: this.answer,
            qid: this.question.quesId,
            qtype: this.question.quesType,
            roundInfo: this.question.roundmodelRoundNo,
            ansLink: this.file,
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
              answer.ansLink = this.file;
              foundanswer = true;
            }
          });
          if (foundanswer === false) {
            var newans = {
              answer: this.answer,
              qid: this.question.quesId,
              qtype: this.question.quesType,
              roundInfo: this.question.roundmodelRoundNo,
              ansLink: this.file,
              userUuid: this.uuid,
            };
            answers.push(newans);
          }
          localStorage.setItem("answers", JSON.stringify(answers));
        }
      },
    }
  }
}
</script>

<style>
#text {
  color: white;
  /* text-align: center !important; */
  font-size: 1rem;
  font-weight: 500;
}
.input_field {
  background-color: rgba(0, 0, 0, 0);
  width: 40%;
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