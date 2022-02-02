<template>
  <div class="table-header">
    <v-list-item three-line>
      <v-list-item-content style="height: 50px">
        <div class="text-overline mb-4">
          <div class="pointer"></div>
          <div v-if="dashboard">PARTICIPANTS</div>
          
          <template v-if="!dashboard" >
            <v-tabs v-model="abc" align-with-title background-color="transparent">
              <v-tabs-slider color="yellow"></v-tabs-slider>

              <v-tab v-for="item in Role" :key="item">
                {{ item }}
              </v-tab>
            </v-tabs>
          </template>
        </div>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>

<script>

export default({
    props:["dashboard","abc"],
  data: () => ({
    Role: ["STUDENT", "MEMBER", "SUPERUSER"],
  }),
})
</script>

