<template>
    <div class="bg">
        <Navigation :role="role" />
        <div class="d-flex flex-column align-center justify-center main">
            <v-card
                class="d-flex flex-column align-center justify-center"
                style="width: 40%"
                height="30%"
                elevation="3"
            >
                <div class="d-flex flex-column align-center">
                    <div>{{ username }}</div>
                    <div class="text-center text-lg-h4">Current Round: {{ audition.round }}</div>
                    <div
                        v-if="audition.status === 'res'"
                        class="mx-auto text-center"
                    >Round {{ audition.round }} is available now!</div>
                    <v-btn
                        v-if="audition.status === 'res'"
                        class="mx-auto"
                        @click="$router.push('/result')"
                    >View Results</v-btn>

                    <div
                        v-if="audition.status === 'ong'"
                        class="mx-auto mt-3"
                    >Round {{ audition.round }} is live now!</div>
                    <v-btn
                        v-if="
                        audition.status === 'ong' &&
                        (student.studenttime === 0 || su || member || (student.studenttime > 0 && student.studenttime > new Date()))"
                        class="mx-auto mt-3"
                        @click="$router.push('/quiz')"
                    >Attempt Quiz</v-btn>

                    <div v-else class="mx-auto">Round {{ audition.round }} is not live yet.</div>
                    <v-btn
                        v-if="member || su"
                        class="mx-auto mt-3"
                        @click="$router.push('/dashboard')"
                    >Student Dashboard</v-btn>
                    <v-btn v-if="su" class="mx-auto mt-3" @click="$router.push('/root')">Root Panel</v-btn>
                </div>
            </v-card>
        </div>
    </div>
</template>

<script>
import Navigation from "../components/Navigation.vue";
import VueJwtDecode from "vue-jwt-decode";
import common from "../services/common.js";
export default {
    name: "landing",
    components: {
        Navigation,
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
        };
    },
    beforeCreate() {
        common.getStudent().then((res) => {
            this.student = res.data;
            console.log("===========")
            console.log(this.student)
            console.log(this.student)
            console.log(this.student)
            console.log(this.student)
            console.log(this.student)
            console.log(this.student)
            console.log(this.student)
            console.log(this.student)
            console.log(this.student)
            console.log(this.student)
            console.log(this.student)
            console.log(this.student)
            console.log("===========")
        });
        common.getAuditionStatus().then((res) => {
            this.audition = (res.data);
        });
        common.getProfile().then((res) => {
            this.profile = res.data;
            this.phone = this.profile.phone;
            this.roll = this.profile.roll;
            console.log(this.profile);
        });
        if (localStorage.getItem("token") === null) {
            this.$router.push("/");
        }
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
    },
};
</script>

<style>
.main {
    height: 100%;
    width: 100%;
    margin: 30px;
    overflow: hidden;
    margin-left: 210px;
}

.bg {
    background-color: #111315;
    display: flex;
    height: 100%;
    overflow: hidden;
}
</style>
