<template>
  <div class="stats">
    <v-card
      class="overview"
      max-width="95%"
      height="260px"
      outlined
      color="#1A1D1F"
    >
      <v-list-item>
        <v-list-item-content style="height: 50px">
          <div class="text-overline mb-4">
            <div class="pointer"></div>
            OVERVIEW
          </div>
        </v-list-item-content>
      </v-list-item>
      <v-container fluid>
        <v-row dense>
          <v-col
            v-for="card in cards"
            :key="card.title"
            :cols="card.flex"
            style="margin: 5px; height: 250px"
          >
            <v-card :color="card.color" style="border-radius: 20px">
              <div class="card-top">
                <v-icon style="height: 25px" class="pa-4 mt-3">{{
                  card.icon
                }}</v-icon>
                <v-progress-circular
                  :rotate="card.rotate"
                  :size="50"
                  :width="5"
                  :value="value"
                  :color="card.progresscolor"
                  >{{ value }}</v-progress-circular
                >
              </div>
              <v-card-title
                v-text="card.title"
                style="font-size: 40px"
                class="font-weight-black pb-5"
              ></v-card-title>
              <v-card-subtitle v-text="card.subtitle"></v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import common from "../services/common.js";
export default {
  name: "Stats",
  data: () => ({
    cards: [
      {
        icon: "mdi-account",
        title: "",
        subtitle: "  Appeared Round 1",
        flex: 3.5,
        color: "#2F333F",
        progresscolor: "#B5E4CA",
        rotate: "-90",
      },
      {
        icon: "mdi-thumb-up",
        title: "",
        subtitle: "Evaluated",
        flex: 3.5,
        color: "#293135",
        progresscolor: "purple",
        rotate: "90",
      },
      {
        icon: "mdi-av-timer",
        title: "",
        subtitle: "Pending",
        flex: 3.5,
        color: "#2F333F",
        progresscolor: "#CABEFF",
        rotate: "180",
      },
    ],
    interval: {},
    value: 0,
    un: 0,
    tot: 0,
    all: [],
    students: [],
    store: [],
  }),
  beforeDestroy() {
    clearInterval(this.interval);
  },
  mounted() {
    common.getUsers().then((res) => {
      if (res.status === 200) {
        this.all = res.data.data;
        this.all.forEach((e) => this.store.push(e[0]));
        this.students = this.store.filter((stu) => stu.role === "s");
        console.log(this.students);
        this.tot = this.students.length;
        console.log(this.tot);
        this.students.forEach((e) => {
          if (e.status == "unevaluated") this.un++;
        });
        this.cards[0].title = this.tot;
        this.cards[1].title = this.un;
        this.cards[2].title = this.tot - this.un;
        console.log(this.un);
      } else if (res.status === 401) {
        alert("UNAUTHORISED ACCESS");
        localStorage.clear("token");
        this.$router.push("/");
      } else {
        alert("No data");
      }
    });
    console.log("----");
    console.log(this.tot);

    this.interval = setInterval(() => {
      if (this.value === 50) {
        return (this.value = 0);
      }
      this.value += 10;
    }, 1000);
  },
};
</script>

<style>
.text-overline {
  display: flex;
  align-items: center;
}
.pointer {
  background-color: #a692ff;
  width: 10px;
  height: 15px;
  border-radius: 10px;
  margin-right: 8px;
}
.overview {
  display: flex;
  flex-direction: column;
}
.v-progress-circular {
  margin: 1rem;
}
.card-top {
  display: flex;
  justify-content: space-between;
}
</style>
