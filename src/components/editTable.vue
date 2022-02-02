<template>
  <div>
    <v-card class="edit pa-5">
      <v-list-item>
        <v-list-item-content style="height: 50px">
          <div class="text-overline mb-4">
            <div class="pointer"></div>
            EDIT ROUNDS
          </div>
        </v-list-item-content>
      </v-list-item>
      <v-dialog v-model="dialog" max-width="800px">
        <v-card
          class="pa-5"
          style="border: 2px solid grey; border-radius: 20px"
        >
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="editQues.quesText"
                    label="Question"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select
                    :items="Qtype"
                    v-model="editQues.quesType"
                    dense
                    outlined
                    label="quesType"
                    color="#7B849F"
                    class="mb-10 dropdown"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-file-input
                    chips
                    multiple
                    label="Image Input"
                  ></v-file-input>
                </v-col>
                <v-col>
                  <v-file-input
                    chips
                    multiple
                    label="Audio Input"
                  ></v-file-input>
                </v-col>
              </v-row>
              <v-row>
                <v-container
                  v-if="
                    editQues.quesType == 'SINGLE CHOICE' ||
                    editQues.quesType == 'MULTIPLE CHOICE'
                  "
                >
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
                      color="#BEFFC1"
                      @click="saveOptions"
                      v-if="showBtn"
                    >
                      Save Options
                    </v-btn>
                  </div>
                </v-container>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
            <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title class="text-h5"
            >Are you sure you want to delete this item?</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDelete"
              >Cancel</v-btn
            >
            <v-btn color="blue darken-1" text @click="deleteItemConfirm"
              >OK</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-tabs
        v-model="tab"
        background-color="transparent"
        color="basil"
        grow
        class="mt-10"
      >
        <v-tab v-for="(item, index) in rounds" :key="index">
          ROUND {{ index + 1 }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item v-for="(item, index) in rounds" :key="index">
          <v-card color="basil" flat>
            <v-stepper
              v-model="e6"
              vertical
              style="background-color: transparent"
              v-for="(question, n) in item.question_set_models"
              :key="n"
            >
              <v-stepper-step
                :complete="e6 > n + 1"
                :step="n + 1"
                color="#a692ff"
              >
                {{ question.quesText }}
                <v-icon class="ma-2" @click="editItem(question)">
                  mdi-pencil
                </v-icon>
                <small>{{ question.quesType }}</small>
              </v-stepper-step>
              <v-stepper-items>
                <v-stepper-content :step="n + 1">
                  <v-img
                    height="300"
                    width="300"
                    class="ma-5"
                    src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                  ></v-img>
                  <v-textarea
                    class="mt-10"
                    v-if="question.quesType == 'TEXTAREA'"
                    outlined
                    name="input-7-4"
                    label="ANSWER"
                    value=" "
                    style="width: 600px"
                  ></v-textarea>
                  <v-file-input
                    v-if="question.quesType == 'ATTACH FILE'"
                    class="mt-10"
                    style="width: 600px"
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
                  <v-btn class="ma-2" outlined color="primary" @click="next(n)">
                    NEXT
                  </v-btn>
                  <v-btn
                    class="ma-2"
                    outlined
                    color="red"
                    @click="deleteItem(question)"
                  >
                    DELETE
                  </v-btn>
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
    <div class="btm">
      <v-btn class="ma-5" outlined color="red">DELETE ROUND</v-btn>
      <v-btn
        class="ma-5"
        fab
        dark
        color="#4288CA"
        :disabled="Ques === '' || Questype === ''"
        @click="addQues"
      >  
        <v-icon dark> mdi-plus </v-icon>
      </v-btn>
      <v-btn outlined color="green" class="ma-5">SAVE ROUND</v-btn>
    </div>
  </div>
</template>

<script>
import common from "@/services/common.js";
export default {
  data() {
    return {
      e6: 1,
      tab: null,
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      showBtn: true,
      editQues: {},
      dltQues: {},
      Qtype: ["MULTIPLE CHOICE", "SINGLE CHOICE", "ATTACH FILE", "TEXTAREA"],
      rounds: [],
      Questions: [],
    };
  },
  beforeCreate() {
    common.getRounds().then((res) => {
      console.log(res);
      this.rounds = res.data;
    });
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  methods: {
    next(n) {
      var l = this.Questions.length;
      if (n + 1 == l) {
        this.e6 = 1;
      } else {
        this.e6 = n + 2;
      }
    },
    datapopulate(round) {
      this.time = round.time;

      if (this.panel != undefined) {
        this.questions = null;
      }
    },
    editItem(item) {
      this.editedIndex = this.Questions.indexOf(item);
      console.log(item);
      this.dialog = true;
      this.editQues = item;
    },

    deleteItem(item) {
      this.editedIndex = this.Questions.indexOf(item);
      this.dialogDelete = true;
      this.dltQues = item;
    },

    deleteItemConfirm() {
      this.Questions.splice(this.editedIndex, 1);
      console.log(this.dltQues.quesId);
      var a = {
        quesId: this.dltQues.quesId,
      };
      common.deleteQues(a);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editQues = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editQues = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.Questions[this.editedIndex], this.editQues);
      } else {
        this.Questions.push(this.editQues);
      }
      var a = {
        quesId: this.editQues.quesId,
        quesText: this.editQues.quesText,
        quesType: this.editQues.quesType,
      };

      console.log(this.editQues.quesId);
      common.editQues(a);
      this.close();
    },
  },
};
</script>
<style scoped>
.edit {
  border-radius: 10px;
}
.btm{
  display: flex;justify-content: center;
}
</style>
