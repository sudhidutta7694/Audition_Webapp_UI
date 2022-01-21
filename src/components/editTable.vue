<template>
  <v-card class="edit pa-5">
   <v-list-item>
      <v-list-item-content style="height:50px">
        <div class="text-overline mb-4">
          <div class="pointer"></div> EDIT ROUNDS
        </div>
      </v-list-item-content>
    </v-list-item>
   <v-tabs
      v-model="tab"
      background-color="transparent"
      color="basil"
      grow
      class="mt-10"
    >
      <v-tab
        v-for="item in items"
        :key="item"
      >
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in items"
        :key="item"
      >
        <v-card
          color="basil"
          flat
        >
         <v-stepper
    v-model="e6"
    vertical
    style="background-color:transparent"
  >
    <v-stepper-step
      :complete="e6 > 1"
      step="1"
      color="#a692ff"
    >
      QUESTION 1
      <small>Single Choice</small>
    </v-stepper-step>

    <v-stepper-content step="1">
      <v-card
        color="grey lighten-1"
        class="mb-12"
        height="200px"
      ></v-card>
     <v-btn
      class="ma-2"
      outlined
      color="primary"
      @click="e6 = 2"
    >
      NEXT  </v-btn>
      <v-btn
      class="ma-2"
      outlined
      color="red"
    >
      DELETE    </v-btn>
    </v-stepper-content>

    <v-stepper-step
      :complete="e6 > 2"
      step="2"
      color="#a692ff"
    >
      QUSETION 2
      <small>Multiple Choice</small>
    </v-stepper-step>

    <v-stepper-content step="2">
      <v-card
        color="grey lighten-1"
        class="mb-12"
        height="200px"
      ></v-card>
        <v-btn
      class="ma-2"
      outlined
      color="primary"
      @click="e6 = 3"
    >
      NEXT    </v-btn>
      <v-btn
      class="ma-2"
      outlined
      color="red"
    >
      DELETE    </v-btn>
    </v-stepper-content>

    <v-stepper-step
      :complete="e6 > 3"
      step="3"
      color="#a692ff"
    >
      QUESTION 3
      <small>File Upload</small>
    </v-stepper-step>

    <v-stepper-content step="3">
      <v-card
        color="grey lighten-1"
        class="mb-12"
        height="200px"
      ></v-card>
     <v-btn
      class="ma-2"
      outlined
      color="primary"
      @click="e6 = 4"
    >
      NEXT  </v-btn>
      <v-btn
      class="ma-2"
      outlined
      color="red"
    >
      DELETE    </v-btn>
    </v-stepper-content>

    <v-stepper-step step="4"
    color="#a692ff">
      QUSETION 4
      <small>Type Answer</small>
    </v-stepper-step>
    <v-stepper-content step="4">
      <v-card
        color="grey lighten-1"
        class="mb-12"
        height="200px"
      ></v-card>
      <v-btn
      class="ma-2"
      outlined
      color="primary"
      @click="e6 = 1"
    >
      NEXT  </v-btn>
      <v-btn

      class="ma-2"
      outlined
      color="red"
    >
      DELETE    </v-btn>
    </v-stepper-content>
  </v-stepper>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        e6: 1,
        tab: null,
        items: [
          'ROUND 1', 'ROUND 2', 'ROUND 3', 'ROUND 4' ,'ROUND 5',
        ],
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      }
    },
  }
</script>
<style scoped>
.edit{
    border-radius: 10px;
}
</style>


