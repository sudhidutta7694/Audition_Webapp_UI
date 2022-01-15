<!--<template>
<div>
<v-card
    class="overview"
    max-width="95%"
    height="400px"
    outlined color="#1A1D1F" 
  >
    <v-list-item>
      <v-list-item-content style="height:50px">
        <div class="text-overline">
          <div class="pointer"></div> OVERVIEW
        </div>
      </v-list-item-content>
    </v-list-item>
    <v-container fluid>
      <v-row dense>
    
      </v-row>
    </v-container>
  </v-card>
  </div>
</template>-->
<template>
<div class="sp">
       <v-sparkline
    :labels="labels"
    color="white"
    height="65px"
    :value="value"
    :gradient="gradient"
    :smooth="radius || false"
    :padding="padding"
    :line-width="width"
    :stroke-linecap="lineCap"
    :gradient-direction="gradientDirection"
    :fill="fill"
    :type="type"
    :auto-line-width="autoLineWidth"
    auto-draw
    class="font-weight-thin text"
  ></v-sparkline>
  </div>
</template>

<script>
  const gradients = [
    ['#222'],
    ['#42b3f4'],
    ['red', 'orange', 'yellow'],
    ['purple', 'violet'],
    ['#00c6ff', '#F0F', '#FF0'],
    ['#f72047', '#ffd200', '#1feaea'],
  ]

  export default {
    data: () => ({
      width: 1,
      radius: 10,
      padding: 10,
      lineCap: 'round',
      gradient: gradients[5],
      value: [0, 2, 9, 5, 7, 0, 9, 7, 9, 0],
      labels: [
        'Day 1',
        'Day 2',
        'Day 3',
        'Day 4',
        'Day 5',
        'Day 6',
        'Day 7',
        'Day 8',
        'Day 9',
        'Day 10',
      ],
      gradientDirection: 'top',
      gradients,
      fill: false,
      type: 'trend',
      autoLineWidth: false,
    }),
  }
</script>

<style scoped>
.sp{
    width: 90%;
}
</style>
