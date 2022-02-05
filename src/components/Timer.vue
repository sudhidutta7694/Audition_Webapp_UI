<template>
  <v-container class="d-flex justify-end">
    <!-- <div class="block" v-if="days > 0">
      <p class="digit">{{ days | two_digits }}</p>
      <p class="text">Days</p>
    </div>
    <div class="block" v-if="hours > 0">
      <p class="digit">{{ hours | two_digits }}</p>
      <p class="text">Hours</p>
    </div>-->
    <div class="block" v-if="!stop">
      <p class="digit">{{ minutes | two_digits }}</p>
      <p class="text">Minutes</p>
    </div>
    <div class="block" v-if="!stop">
      <p class="digit">{{ seconds | two_digits }}</p>
      <p class="text">Seconds</p>
    </div>
    <div v-if="stop" class="text-lg-h5">Time Up!</div>
  </v-container>
</template>
<script>
import common from '../services/common.js'
export default {
  name: 'Timer',
  mounted() {
    window.setInterval(() => {
      this.now = Math.trunc((new Date()).getTime() / 1000);
    }, 1000);
  },
  props: ["time", "mobileView", "question"],
  data() {
    return {
      timePassed: 0,
      timerInterval: null,
      stop: false,
      now: Math.trunc((new Date()).getTime() / 1000),
    }
  },
  computed: {
    seconds: function () {
      return Math.trunc(this.timeLeft % 60);
    },
    minutes: function () {
      return Math.trunc(this.timeLeft / 60) % 60;
    },
    // hours() {
    //   return Math.trunc((this.date - this.now) / 60 / 60) % 24;
    // },
    // days() {
    //   return Math.trunc((this.date - this.now) / 60 / 60 / 24);
    // },
    timeLeft: function () {
      return this.time - this.now;
    }
  },
  watch: {
    timeLeft(value) {
      if (value <= 0) {
        this.stop = true;
        console.log("ZA WARUDOOOO!!!!")
        this.timeUp()
      }
    }
  },
  methods: {
    timeUp() {
      this.saveAnswer();
      localStorage.removeItem("answers")
      this.$router.push("/dash");
    },
    saveRound() {
      var current_answer = JSON.parse(localStorage.getItem("answers"))
      let ans = {
        answers: current_answer
      }
      common.submitRound(ans).then(() => {
        console.log(ans)
        console.log(typeof (ans))
      });
    },
  }
}
</script>
<style>
@import url(https://fonts.googleapis.com/css?family=Roboto+Condensed:400|Roboto:100);
.block {
  display: flex;
  flex-direction: column;
  margin: 10px;
}
.text {
  color: #1abc9c;
  font-size: 13px;
  font-family: "Roboto Condensed", serif;
  font-weight: bolder;
  margin-top: 0px;
  margin-bottom: 5px;
  text-align: center;
}
.digit {
  color: #ecf0f1;
  font-size: 40px;
  font-weight: regular;
  font-family: "Roboto", serif;
  margin: 2px;
  margin-bottom: 0px !important;
  text-align: center;
}

@media screen and (max-width: 960px) {
  .text {
    font-size: 10px;
    font-weight: bold;
  }

  .digit {
    font-size: 30px;
    font-weight: lighter;
  }
}
</style>