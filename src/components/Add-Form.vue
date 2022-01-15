<template>
  <div>
    <v-card class="overview" max-width="95%" outlined color="#1A1D1F">
      <v-list-item three-line>
        <v-list-item-content style="height: 50px">
          <div class="text-overline mb-4">
            <div class="pointer"></div>
            ROUND : 1
          </div>
        </v-list-item-content>
      </v-list-item>
      <v-container fluid>
        <v-row align="center">
          <v-col class="d-flex flex-column mx-10" cols="12" sm="12">
            <v-textarea
              outlined
              color="#BEFFC1"
              name="input-7-4"
              label="Question"
              v-model="Ques"
              value=" "
              style="width: 80%"
            ></v-textarea>
            <v-row>
              <v-col cols="12" sm="6">
                <v-btn
                  color="#a692ff"
                  class="mr-2 white--text"
                  @click="uploadImage"
                >
                  ADD IMAGE
                </v-btn>
                <v-btn
                  color="#BEFFC1"
                  class="mr-2 grey--text"
                  @click="uploadAudio"
                >
                  ADD AUDIO
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6" sm="6">
                <v-file-input
                  label="Pick your audio file"
                  outlined
                  dense
                  style="width: 40%"
                  v-if="Media === 'AUDIO'"
                ></v-file-input>
                <v-file-input
                  label="Pick your image"
                  outlined
                  dense
                  v-model="selectedFile"
                  style="width: 40%"
                  prepend-icon="mdi-camera"
                  v-if="Media === 'IMAGE'"
                ></v-file-input>
              </v-col>
              <v-col>
                <v-btn
                  v-if="Media === 'IMAGE' || Media === 'AUDIO'"
                  @click="uploadMedia"
                >
                  SAVE
                </v-btn>
              </v-col>
            </v-row>
            <v-select
              :items="Qtype"
              v-model="Questype"
              label="Question Type"
              dense
              outlined
              value=""
              color="#BEFFC1"
              style="width: 30%"
            ></v-select>
            <div
              class="mcq-options mx-5 pa-5"
              v-if="
                Questype === 'SINGLE CHOICE' || Questype === 'MULTIPLE CHOICE'
              "
            >
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="choice1"
                      label="Choice 1"
                      solo
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="choice2"
                      solo
                      label="Choice 2"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="choice3"
                      solo
                      label="Choice 3"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="choice4"
                      label="Choice 4"
                      solo
                    ></v-text-field>
                  </v-col>
                </v-row>
                <div class="d-flex float-right mr-12 pa-2">
                  <v-btn
                    class="ma-2 black--text"
                    :loading="loading"
                    :disabled="loading"
                    color="#BEFFC1"
                    @click="saveOptions"
                    v-if="showBtn"
                  >
                    Save
                    <template v-slot:loader>
                      <span class="custom-loader">
                        <v-icon light>mdi-cached</v-icon>
                      </span>
                    </template>
                  </v-btn>
                </div>
              </v-container>
            </div>

            <v-btn
              class="mx-2"
              fab
              dark
              color="#4288CA"
              :disabled="Ques === '' || Questype === ''"
              @click="addQues"
            >
              <v-icon dark> mdi-plus </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <br />
    <v-container v-for="(question, index) in Questions" :key="index">
      <v-card class="overview" max-width="50%" outlined color="#1A1D1F">
        <DispQues :question="question" />
      </v-card>
    </v-container>
    <div class="d-flex float-right mr-12 pa-2">
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
    <router-view />
  </div>
</template>
<style scoped>
.pointer {
  background-color: #beffc1;
}
.mcq-options {
  border: 0.02rem solid rgba(245, 245, 245, 0.521);
  border-radius: 4px;
  width: 60%;
  margin-bottom: 25px;
  padding-bottom: 0px;
}
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

<script>
import DispQues from "./Display-Ques.vue";
export default {
  components: {
    DispQues,
  },
  data: () => ({
    Media: "",
    showBtn: true,
    selectedFile: "",
    Questype: "",
    Ques: "  ",
    choice1: "",
    choice2: "",
    choice3: "",
    choice4: "",
    options: [],
    Questions: [],
    MediaFiles: [],
    loader: null,
    loading: false,
    loading1: false,
    Rtime: ["10", "15", "20", "25"],
    Qtype: ["SINGLE CHOICE", "MULTIPLE CHOICE", "ATTACH FILE", "TEXTAREA"],
  }),
  methods: {
    saveOptions() {
      this.options.push({
        choice1: this.choice1,
        choice2: this.choice2,
        choice3: this.choice3,
        choice4: this.choice4,
      });
      console.log(this.options);
      this.showBtn = false;
    },
    addQues() {
      if (this.Ques !== "") {
        this.Questions.push({
          Ques: this.Ques,
          Files: this.MediaFiles,
          options: this.options,
        });
        console.log(this.Questions);
        this.Ques = [];
        this.Questype = "";
        this.options = [];
        this.choice1 = "";
        this.choice2 = "";
        this.choice3 = "";
        this.choice4 = "";
        this.showBtn = true;
      }
    },
    uploadImage() {
      this.Media = "IMAGE";
    },
    uploadAudio() {
      this.Media = "AUDIO";
    },
    uploadMedia() {
      console.log(this.selectedFile.name);
      this.MediaFiles.push({
        file: this.selectedFile.name,
      });
      this.Media = "";
    },
  },
};
</script>
