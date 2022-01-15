<template>
  <v-container fluid>
    <div class="bord" style="background-color: rgba(0,0,0,0); width: 95%; margin: 0 auto;">
      
      <v-card-text class="justify-center" id="text">{{
        question.Ques
      }}</v-card-text>
      
      <v-layout class="justify-center">
        <v-flex xs12 sm12 lg12>
          <div align-center>
            <v-img contain max-height="400px" style="border-radius: 10px; margin: 20px;" src="./wallppr.jpg"></v-img>
            <vuetify-audio :file="file" color="white" :ended="audioFinish" downloadable style="background-color:#1A1D1F; box-shadow:none"></vuetify-audio>
            <v-container>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-card class="pa-3">
                      {{question.options[0].choice1}}
                    </v-card>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-card class="pa-3">
                      {{question.options[0].choice2}}
                    </v-card>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-card class="pa-3">
                      {{question.options[0].choice3}}
                    </v-card>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-card class="pa-3">
                      {{question.options[0].choice4}}
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
              <div class="d-flex float-right mr-12 pa-2">
                 <v-btn
      class="ma-2"
      outlined
      color="red"
    >
      Delete Question
      <v-icon>mdi-delete-empty-outline</v-icon>
                    <template v-slot:loader>
                      <span class="custom-loader">
                        <v-icon light>mdi-cached</v-icon>
                      </span>
                    </template>
                  </v-btn>
                </div>
          </div>
        </v-flex>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "Imageques",
  props: ["question"],
  components: {
        VuetifyAudio: () => import('vuetify-audio'),
  },
    data: () => ({
        file: 'http://www.hochmuth.com/mp3/Boccherini_Concerto_478-1.mp3',
    }),

  created() {
    
    // console.log(localStorage.getItem("answers"));
    // if (localStorage.getItem("answers") != null) {
    //   var answers = JSON.parse(localStorage.getItem("answers"));
    //   answers.forEach((answer) => {
    //     if (answer.qid === this.question._id) {
    //       this.answer = answer.answer;
    //     }
    //   });
    // }
  },

//   watch: {
//     answer: {
//       handler() {
//         console.log(this.answer);
//         if (localStorage.getItem("answers") === null) {
//           var newanswer = {
//             answer: this.answer,
//             qid: this.question._id,
//             qtype: this.question.quesType,
//           };
//           var ans = [];
//           ans.push(newanswer);
//           localStorage.setItem("answers", JSON.stringify(ans));
//         } else {
//           var answers = JSON.parse(localStorage.getItem("answers"));
//           var foundanswer = false;
//           answers.forEach((answer) => {
//             if (answer.qid === this.question._id) {
//               answer.answer = this.answer;
//               foundanswer = true;
//             }
//           });
//           if (foundanswer === false) {
//             var newans = {
//               answer: this.answer,
//               qid: this.question._id,
//               qtype: this.question.quesType,
//             };
//             answers.push(newans);
//           }

//           localStorage.setItem("answers", JSON.stringify(answers));
//         }
//       },
//       deep: true,
//     },
//   },
};
</script>

	
<style scoped>
#text {
  color: white;
  text-align: center !important;
  font-size: 1rem;
  font-weight: 500;
  
}
#studentans{
  background-color: rgba(0,0,0,0);
  border-radius: 20px;
  border: 1px solid white;
}
v-img {
  text-align: center !important;
}
</style>