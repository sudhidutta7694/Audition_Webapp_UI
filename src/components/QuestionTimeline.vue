<template>
 <v-card class="timeline overview pa-5 " max-width="40%" outlined color="#1A1D1F">
  <v-timeline>
    <v-timeline-item
      v-for="n in 4"
      :key="n"
      color="#BEFFC1"
      small
    >
      <template v-slot:opposite>
        <span>SINGLE CHOICE</span>
      </template>
      <v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-card class="elevation-2 card" max-width="100%"
           v-bind="attrs"
            v-on="on">
        <v-card-title class="text-h7">
          QUESTION NO.{{n}}
        </v-card-title>
        <v-card-text>
        Cost et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.
        </v-card-text>
      </v-card>
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-card-text>
              <div class="text-h2 pa-12">Hello world!</div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="dialog.value = false"
              >Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-timeline-item>
  </v-timeline>
 </v-card>
</template>

<style scoped>
.timeline{
    border-radius: 10px;
}
.card:hover{
    cursor: pointer;
}
</style>