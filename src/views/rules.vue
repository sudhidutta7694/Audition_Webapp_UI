<template>
    <div class="d-flex flex-column align-center justify-center wall" style="height: 100%;">
        <div class="fil" style="z-index:1;"></div>
        <v-card
            outlined
            :width="mobileView === false ? '40%' : '80%'"
            style="border-radius: 10px; z-index:2;"
        >
            <div
                class="text-xl-h4 text-center ma-5"
                style="font-family: 'Carrois Gothic SC', sans-serif !important; font-weight: bold;"
            >Rules</div>
            <div class="items">
                <ol>
                    <li class="ma-5" v-for="(rule, i) in rules" :key="i">
                        <div>{{ rule }}</div>
                    </li>
                </ol>
            </div>
        </v-card>
        <div class="d-flex justify-end back">
            <router-link
                class="text-md-h5 white--text mt-5"
                :to="{ name: 'Home' }"
                style="text-decoration:none; font-family: Inter; font-style: regular;"
            >
                <v-list-item link>
                    <v-list-item-icon class="mr-3">
                        <v-icon>mdi-arrow-left-circle-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title class="text-xl-h5">Back To Home</v-list-item-title>
                </v-list-item>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            rules: [
                "You can attempt the round anytime within the 3 day duration but you need to submit your responses within 1 hour once the timer starts.",
                "Attempt the questions as honestly as possible.",
                "The questions can be text, image, or audio based.",
                "Remember to save your answer before moving on to the next question.",
                "You are free to answer in a candid manner. We are not looking for a bookish answer",
                "In case of any confusion/doubts, you are free to contact any of the GLUG members."
            ]
        }
    },
    computed: {
        mobileView() {
            var s = this.$vuetify.breakpoint.name;
            if (s == "xs" || s == "sm" || s == 'md') {
                return true;
            } else {
                return false;
            }
        },
    },
}
</script>

<style>
ol > li::marker {
    font-weight: bold;
    font-size: 20px;
}

.back {
    width: 40%;
    z-index: 2;
}

.wall {
    background: url("../assets/tunnel.gif");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}

@media screen and (max-width: 1263px) {
    .back {
        width: 80%;
    }
}
</style>
