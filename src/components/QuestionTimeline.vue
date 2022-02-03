<template>
  <v-card
    class="timeline overview pa-5"
    style="width: 50%"
    outlined
    color="#1A1D1F"
  >
    <div v-if="Questions.length == 0" class="emptyTimeline">
      ADD QUESTIONS FOR ROUND {{currentround+1}}
    </div>
    <v-timeline v-else>
      <v-timeline-item
        v-for="(question, index) in Questions"
        :key="index"
        color="#BEFFC1"
        small
      >
        <template v-slot:opposite>
          <span>{{ question.quesType }}</span>
        </template>
        <v-dialog transition="dialog-bottom-transition" max-width="600">
          <template v-slot:activator="{ on, attrs }">
            <v-card
              class="elevation-2 card"
              max-width="100%"
              v-bind="attrs"
              v-on="on"
            >
              <v-card-title class="text-h7">
                QUESTION NO.{{ index + 1 }}
              </v-card-title>
              <v-card-text>
                {{ question.quesText }}
              </v-card-text>
            </v-card>
          </template>
          <template v-slot:default="dialog">
            <v-card class="pr-8 pl-8">
              <v-card-title>
                <div class="text-h6 pa-5">{{ question.quesText }}</div>
              </v-card-title>
              <v-img
                height="250"
                :src="question.ImageLink"
              ></v-img>
              <vuetify-audio
                :file="question.AudioLink"
                class="ma-5 elevation-0"
                :ended="audioFinish"
                downloadable
              ></vuetify-audio>
              <v-card-text>
                <v-textarea
                  class="mt-10"
                  v-if="question.quesType == 'TEXTAREA'"
                  outlined
                  name="input-7-4"
                  label="ANSWER"
                  value=" "
                ></v-textarea>
                <v-file-input
                  v-if="question.quesType == 'ATTACH FILE'"
                  class="mt-10"
                  label="ATTACH YOUR FILE"
                  outlined
                  dense
                ></v-file-input>

                <v-container
                  class="px-0"
                  fluid
                  v-if="
                    question.quesType == 'SINGLE CHOICE' ||
                    question.quesType == 'MULTIPLE CHOICE'
                  "
                >
                  <v-radio-group>
                    <v-radio
                      v-for="n in question.options[0]"
                      :key="n"
                      :label="n"
                      :value="n"
                      style="color: red"
                    ></v-radio>
                  </v-radio-group>
                </v-container>
              </v-card-text>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h6"
                    >Are you sure you want to delete this
                    question?</v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete"
                      >Cancel</v-btn
                    >
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="deleteItemConfirm(index)"
                      >OK</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-card-actions class="justify-end">
                <v-btn text @click="deleteItem">Delete</v-btn>
                <v-btn text @click="dialog.value = false">Close</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-timeline-item>
    </v-timeline>
  </v-card>
</template>

<style scoped>
.timeline {
  border-radius: 10px;
}
.card:hover {
  cursor: pointer;
}
.emptyTimeline {
  display: flex;
  justify-content: center;
  font-weight: bolder;
  font-size: 2.5rem;
}
</style>

<script>
import common from "@/services/common.js";
export default {
  props: ["Questions"],
  components: {
    VuetifyAudio: () => import("vuetify-audio"),
  },
  data: () => ({
    options: [],
    dialog: false,
    dialogDelete: false,
    currentround: "",
    file: "http://www.hochmuth.com/mp3/Boccherini_Concerto_478-1.mp3",
  }),
  methods: {
    deleteItem() {
      this.dialogDelete = true;
    },

    deleteItemConfirm(index) {
      this.Questions.splice(index, 1);
      this.dialog = false;
      this.closeDelete();
    },
    closeDelete() {
      this.dialogDelete = false;
    },
  },
  mounted() {
    console.log("App mounted!");
    if (localStorage.getItem("Questions"))
      this.Questions = JSON.parse(localStorage.getItem("Questions"));
    else localStorage.removeItem("Questions");
  },
  beforeCreate() {
    common.getAuditionStatus().then((res) => {
      console.log(res);
      this.currentround = res.data.round;
    });
  },
};
</script>
