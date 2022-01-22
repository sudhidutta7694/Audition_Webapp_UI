<template>
  <v-card class="overview ml-10" max-width="100%" outlined color="#111315">
      <Header/>
      <v-container fluid>
        <v-row align="center">
          <v-col class="d-flex flex-column mx-10" cols="12" sm="12">
              ROUND TIME:
              <input type="number" style="width:20%" v-model="Rtime">
              QUESTION:
              <input
              outlined
              color="#BEFFC1"
              name="input-7-4"
              v-model="Ques"
              style="width: 80%;"
            />
            <div class="media">
              UPLOAD FILES:
              <div class="uploadBox">
              <UploadImg/> 
              <UploadImg/> 
              </div>
            </div>
            <v-row class="ma-3">
              <v-col>
                <v-btn
                  color="#BEFFC1"
                  v-if="showMediabtn"
                  class="black--text"
                  @click="uploadMedia"
                >
                  SAVE MEDIA
                </v-btn>
              </v-col>
            </v-row>
            QUSETION TYPE:
            <v-select
              :items="Qtype"
              v-model="Questype"
              dense
              outlined
              value=""
              color="#7B849F"
              class="mb-10 dropdown"
              style="width: 30%; border:0.2px solid #7B849F; height:40px"
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
                    v-if="showMediaBtn"
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
</template>

<script>
import UploadImg from '../components/UploadImg.vue'
import Header from '../components/Header.vue'
// import VueJwtDecode from "vue-jwt-decode";

export default {
  components: {
    UploadImg,
    Header,

  },
  data: () => ({
    Rtime:"",
    Ques: "",
    Questype: "",
    ImageLink:"",
    AudioLink:"",
    MediaFiles: [],
    showBtn: true,
    showMediaBtn:false,
    selectedFile: "",
    choice1: "",
    choice2: "",
    choice3: "",
    choice4: "",
    options: [],
    Questions: [],
    
    loader: null,
    loading: false,
    loading1: false,
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
          Questype: this.Questype,
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
  mounted() {
    console.log("App mounted!");
    if (localStorage.getItem("Questions"))
      this.Questions = JSON.parse(localStorage.getItem("Questions"));
    else localStorage.removeItem("Questions");
  },
  // beforeCreate() {
  //   if (localStorage.getItem("token") === null) {
  //     this.$router.push("/");
  //   } else if (
  //     VueJwtDecode.decode(localStorage.getItem("token").substring(6)).role ===
  //     "s"
  //   ) {
  //     this.$router.push("/");
  //   }
  // },
  watch: {
    Questions: {
      handler() {
        localStorage.setItem("Questions", JSON.stringify(this.Questions));
      },
      deep: true
    },
    file: {
      handler() {
        console.log(this.file);
      }
    }
  }
}
</script>

<style scoped>
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
input{
  border: 0.2px solid #7B849F;
  margin-bottom: 30px;
  margin-top: 30px;
  border-radius: 2px;
  color: white;
  padding: 5px;
  padding-left: 10px;
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
.media{
  display: flex;
  flex-direction: column;
}
.uploadBox{
  display: flex;
}
.dropdown{
  margin-top: 10px;
}
</style>

