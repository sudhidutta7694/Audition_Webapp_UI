<template>
  <v-card>
    <v-toolbar
      color="#111315"
      dark
      flat
    >
      <template v-slot:extension>
          
        <v-tabs
          v-model="tab"
          align-with-title
        >
          <v-tabs-slider color="#111315"></v-tabs-slider>

          <v-tab
            v-for="item in items"
            :key="item"
          >
          <v-chip color="tab?'red':'pink'">{{ item }}</v-chip>
            
          </v-tab>
        </v-tabs>		
      </template>
    </v-toolbar>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in items"
        :key="item"
      >
        <v-card flat>
          <v-card-text v-text="text"></v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        tab: null,
        highlightTab:1,
        items: [
          'web', 'shopping', 'videos', 'images', 'news',
        ],
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      }
    },
  }
</script>