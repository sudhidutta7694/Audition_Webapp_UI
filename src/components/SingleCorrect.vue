<template>
    <div>
        <v-container class="d-flex justify-center">
            <div style="width:95%;">
                <v-card-text class="justify-start">
                    {{ question.text }}
                </v-card-text>
            </div>
            <div >
            <v-radio-group v-if="admin != true" v-model="answer">
            <v-radio
              v-for="option in question.options.split(',')"
              :key="option"
              :label="option"
              :value="option"
              color="red"
            ></v-radio>
          </v-radio-group>
          <v-radio-group v-if="admin === true" readonly v-model="studentanswer">
            <v-radio
              v-for="option in question.options.split(',')"
              :key="option"
              :label="option"
              :value="option"
              color="#00FFBF"
            ></v-radio>
          </v-radio-group>
            </div>
        </v-container>
    </div>
</template>

<script>
export default {
    name: 'SingleCorrect',
    props: ["question", "admin", "studentAnswer"],
    data(){
        return{
            option: [],
            answer: "",
        }
    }
}
</script>