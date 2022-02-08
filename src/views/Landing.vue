<template>
    <div class="bg">
        <Navigation :role="role" />
        <div class="d-flex flex-column align-center justify-center main">
            <v-card
                min-height="30%"
                class="d-flex flex-column align-center justify-center main-card"
                elevation="3"
            >
                <div
                    v-if="student.studentround !== audition.round && role === 's' && audition.round !== 0"
                    class="text-center"
                >
                    <h1>THANK YOU FOR YOUR PARTICIPATION</h1>
                    <h4>WE HOPE TO SEE YOU IN FURTHER GLUG EVENTS</h4>
                </div>
                <div v-else class="d-flex flex-column align-center ma-4">
                    <div
                        v-if="audition.round !== 0"
                        class="text-center text-lg-h4"
                    >Current Round: {{ audition.round }}</div>
                    <v-btn
                        v-if="audition.status === 'res' && audition.round !== 0"
                        class="mx-auto mt-3"
                        @click="$router.push('/results')"
                    >View Results</v-btn>

                    <div
                        v-if="audition.status === 'ong'"
                        class="mx-auto mt-3"
                    >Round {{ audition.round }} is live now!</div>

                    <v-btn
                        v-if="
                        audition.status === 'ong' &&
                        (student.studenttime === 0 || (student.studenttime > 0 && student.studenttime > new Date()) && valid === true)"
                        class="mx-auto mt-3"
                        @click="$router.push('/quiz')"
                    >Attempt Quiz</v-btn>
                    <div
                        class="mx-auto mt-3"
                        v-else-if="audition.status === 'ong' && student.studenttime < new Date()"
                    >Your Attempt for this round is finished.</div>

                    <div
                        class="mx-auto mt-3"
                        v-if="audition.status === 'def'"
                    >Round is Over, Please wait for results.</div>

                    <div v-if="audition.status === 'res' && audition.round === 0" class="mx-auto">
                        <h4>Audition goes live in:</h4>
                        <Timer v-if="role === 's'" class="ma-2" :home="true" :time="audTime" />
                    </div>
                    <v-btn
                        v-if="member || su"
                        class="mx-auto mt-3"
                        @click="$router.push('/dashboard')"
                    >Student Dashboard</v-btn>
                    <v-btn v-if="su" class="mx-auto mt-3" @click="$router.push('/root')">Root Panel</v-btn>
                </div>
                <v-dialog v-model="dialog" width="500">
                    <v-card>
                        <v-card-text>Please Update your profile.</v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <router-link to="/profile" style="text-decoration: none;">
                                <v-btn color="primary" text @click="dialog = false">Go to Profile</v-btn>
                            </router-link>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-card>
        </div>
    </div>
</template>

<script>
import Navigation from "../components/Navigation.vue";
import VueJwtDecode from "vue-jwt-decode";
import common from "../services/common.js";
import Timer from "../components/Timer.vue"
export default {
    name: "landing",
    components: {
        Navigation,
        Timer,
    },
    data() {
        return {
            member: false,
            su: false,
            username: "",
            audition: {},
            student: null,
            profile: null,
            phone: null,
            roll: null,
            role: "",
            valid: Boolean,
            dialog: false,
            audTime: 1644499800000 / 1000,
        };
    },
    beforeCreate() {
        common.getStudent().then((res) => {
            console.log(res.data)
            this.student = res.data;
            this.student.studenttime = Number(this.student.studenttime)
        });
        common.getAuditionStatus().then((res) => {
            this.audition = (res.data);
        });
        common.getProfile().then((res) => {
            this.profile = res.data;
            this.phone = this.profile.phone;
            this.roll = this.profile.roll;
            this.valid = this.profile.profilebool;
            this.dialog = !this.valid;
            console.log(this.profile);
        });
    },
    created() {
        this.$vuetify.theme.dark = true;
        if (localStorage.getItem("token") === null) {
            this.$router.push("/");
        } else {
            var tok = VueJwtDecode.decode(localStorage.getItem("token").substring(6));
            if (tok.role === "m") {
                this.member = true;
            } else if (tok.role === "su") {
                this.su = true;
            }
            this.role = tok.role;
            this.username = tok.username;
        }

        if (this.student.studentround != this.audition.round) {
            this.valid = false;
        }
    },
    computed: {
        vertical() {
            var s = this.$vuetify.breakpoint.name;
            if (s == "xs" || s == "sm") {
                return false;
            } else {
                return true;
            }
        },
    },
};
</script>

<style>
.main {
    width: 100%;
    margin: 30px;
    overflow: hidden;
    margin-left: 210px;
}

.main-card {
    width: 40%;
}

.bg {
    background-color: #111315;
    display: flex;
    height: 100%;
    overflow: hidden;
}

@media screen and (max-width: 960px) {
    .main {
        margin: 10px;
    }

    .main-card {
        width: 80%;
    }
}
</style>
