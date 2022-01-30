<template>
    <div>
        <Navigation :role="role" />
        <div class="d-flex justify-center align-center box">
            <v-card width="30%" class="d-flex flex-column align-center">
                <v-icon class="pro_icon" size="60">mdi-account-circle-outline</v-icon>
                <div class="text-center mx-auto text-lg-h6 mb-5">PROFILE</div>
                <div class="mx-auto">
                    <v-text-field v-model="username" readonly solo>{{ username }}</v-text-field>
                </div>
                <div class="mx-auto">
                    <v-text-field v-model="emailId" readonly solo>{{ emailId }}</v-text-field>
                </div>
                <div class="d-flex justify-center align-center mx-auto">
                    <v-text-field
                        v-model="phoneNo"
                        label="Phone Number"
                        :disabled="!edit"
                        :readonly="!edit"
                        :solo="!edit"
                        :outlined="edit"
                        :rules="phoneRules"
                    >{{ phoneNo }}</v-text-field>
                </div>
                <div class="d-flex mx-auto">
                    <v-text-field
                        v-model="roll"
                        label="Roll Number"
                        :disabled="!edit"
                        :readonly="!edit"
                        :solo="!edit"
                        :outlined="edit"
                        :rules="rollRules"
                    >{{ roll }}</v-text-field>
                </div>
                <v-btn
                    v-if="!edit"
                    class="black--text mx-auto mb-4"
                    color="#4288CA"
                    @click="edit = true"
                >
                    <v-icon class="mr-1">mdi-pencil</v-icon>Edit Profile
                </v-btn>
                <v-btn
                    v-if="edit"
                    class="black--text mx-auto mb-4"
                    color="#4288CA"
                    @click="setProfile()"
                >
                    <v-icon class="mr-1">mdi-content-save</v-icon>Save Profile
                </v-btn>
            </v-card>
        </div>
    </div>
</template>

<script>
import Navigation from '../components/Navigation.vue'
import VueJwtDecode from 'vue-jwt-decode'
import common from '../services/common.js'

export default {
    name: "Profile",
    components: {
        Navigation,
    },
    data() {
        return {
            role: "",
            username: "",
            emailId: "",
            phoneNo: null,
            roll: null,
            phoneRules: [
                v => !!v || "Phone No is required",
                v => /^-?(\d+\.?\d*)$|(\d*\.?\d+)$/.test(v) || "Phone no must be valid",
                v =>
                    (v && v.length <= 10 && v.length >= 10) ||
                    "Enter a valid (91+) 10 digit Phone no"
            ],
            rollRules: [
                v => !!v || "Roll No is required",
                v => /^([a-zA-Z0-9-]+)$/.test(v) || "Roll No must be valid",
                v =>
                    (v && v.length <= 10) ||
                    "Enter a valid Roll no"
            ],
            edit: false,
        }
    },
    created() {
        this.$vuetify.theme.dark = true;
        if (localStorage.getItem("token") === null) {
            this.$router.push("/");
        } else {
            var tok = VueJwtDecode.decode(localStorage.getItem("token").substring(6));
            this.role = tok.role;
            this.username = tok.username;
            this.emailId = tok.email;
            this.phoneNo = tok.phone;
            this.roll = tok.roll;
            console.log(tok)
        }
    },
    methods: {
        setProfile() {
            common.setProfile({ roll: this.roll, phone: this.phone }).then(() => {
                this.dialog = false;
                this.profile.profilebool = true;
            });
            this.edit = false;
        }
    }
}
</script>

<style>
.box {
    height: 100vh;
}
.pro_icon {
    width: 120px;
    height: 120px;
}
</style>