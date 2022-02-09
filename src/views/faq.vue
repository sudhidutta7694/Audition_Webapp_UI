<template>
    <div class="d-flex flex-column align-center justify-center wall" style="height: 100%;">
        <div class="fil" style="z-index:1;"></div>
        <v-card outlined width="80%" style="border-radius: 10px; z-index:2;">
            <div
                class="text-xl-h4 text-center ma-5"
                style="font-family: 'Carrois Gothic SC', sans-serif !important; font-weight: bold;"
            >Frequently Asked Questions</div>
            <div class="items">
                <ol>
                    <li class="ma-5" v-for="(ques, i) in faq" :key="i">
                        <div class="text-lg-h6 mb-1">{{ ques.question }}</div>
                        <div
                            class="text-md-body-1 ma-1"
                            v-for="(point, key) in ques.answer"
                            :key="key"
                        >
                            <v-icon class="mb-3 mr-1">mdi-arrow-right-bottom</v-icon>
                            {{ point }}
                        </div>
                    </li>
                </ol>
            </div>
        </v-card>
        <div class="d-flex justify-end" style="width:80%; z-index: 2;">
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
            faq: [
                {
                    question: 'Who are we?',
                    answer: ["We’re the GNU/Linux User’s Group, a community that promotes the use of Free and Open Source Software. We are a plethora of designers, contributors and developers that believe in learning and sharing through opening up your mind to Open Source. You can know more about us on our website, https://nitdgplug.org."]
                },
                {
                    question: 'What we do as a club?',
                    answer: ["We provide budding Open Source enthusiasts like ourselves a forum to contribute through varied workshops on revolutionary Open Source Technologies throughout the year.We provide help and resources to everyone who wants to make the technical world a better place."]
                },
                {
                    question: 'What are the prerequisites to join GLUG?',
                    answer: ["There are absolutely no prerequisites. If you are interested to learn and grow, you are welcome. We look for enthusiastic participants that are willing to work together as a team. "]
                },
                {
                    question: 'Do I need to be a master of Linux to join GLUG?',
                    answer: ["Absolutely not! Everyone is a beginner at some point, and it's okay to be so as long as you have an eagerness to learn."]
                },
                {
                    question: 'What do we look for in a candidate?',
                    answer: ["Interest in the club and it's activities",
                        "Eagerness to learn new things",
                        "Passion for technology and open source",
                        "Willingness to make substantial contribution to the causes of the club",
                        "Teamwork and other soft skills"]
                },
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
</style>
