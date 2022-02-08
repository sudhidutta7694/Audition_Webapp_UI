<template>
    <div>
        <Navigation :role="role" />
        <div class="d-flex justify-center align-center box">
            <v-card width="350px" class="d-flex flex-column align-center justofy-center mt-5">
                <v-icon class="pro_icon" size="60">mdi-account-circle-outline</v-icon>
                <div class="text-center mx-auto text-lg-h6 mb-5">PROFILE</div>
                <div class="mx-auto">
                    Name:
                    <v-text-field v-model="username" readonly solo>{{ username }}</v-text-field>
                </div>
                <div class="mx-auto">
                    Email Id:
                    <v-text-field v-model="emailId" readonly solo>{{ emailId }}</v-text-field>
                </div>
                <div class="mx-auto">
                    Phone Number:
                    <v-text-field
                        v-model="phoneNo"
                        :disabled="!edit"
                        :readonly="!edit"
                        :solo="!edit"
                        :outlined="edit"
                        :rules="phoneRules"
                        placeholder="Required*"
                    >{{ phoneNo }}</v-text-field>
                </div>
                <div class="mx-auto">
                    Roll Number:
                    <v-text-field
                        v-model="roll"
                        :disabled="!edit"
                        :readonly="!edit"
                        :solo="!edit"
                        :outlined="edit"
                        placeholder="Required*"
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
                    @click="setProfile"
                >
                    <v-icon class="mr-1">mdi-content-save</v-icon>Save Profile
                </v-btn>
            </v-card>
            <v-dialog v-model="dialog" width="500">
                <v-card>
                    <v-card-text>Your Profile is updated</v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <router-link to="/dash" style="text-decoration: none;">
                            <v-btn color="primary" text @click="dialog = false">Return TO Dashboard</v-btn>
                        </router-link>
                    </v-card-actions>
                </v-card>
            </v-dialog>
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
            phoneNo: "",
            roll: "",
            profile: [],
            phoneRules: [
                v => !!v || "Phone No is required",
                v => /^-?(\d+\.?\d*)$|(\d*\.?\d+)$/.test(v) || "Phone no must be valid",
                v =>
                    (v && v.length <= 10 && v.length >= 10) ||
                    "Enter a valid 10 digit Phone no"
            ],
            rollRules: [
                v => !!v || "Roll No is required",
                v => /^([a-zA-Z0-9-]+)$/.test(v) || "Roll No must be valid",
                v =>
                    (v && v.length <= 10) ||
                    "Enter a valid Roll no"
            ],
            edit: false,
            dialog: false,
        }
    },
    beforeCreate() {
        common.getProfile().then(res => {
            this.profile = res.data;
            this.phoneNo = this.profile.phone;
            this.roll = this.profile.roll;
            console.log("-------------")
            console.log(this.profile);
        });
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
        }
    },
    methods: {
        setProfile() {
            common.setProfile({ roll: this.roll, phone: this.phoneNo }).then(() => {
                this.dialog = true;
                this.profile.profilebool = true;
            });
            this.edit = false;

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
.pro_icon {
    width: 120px;
    height: 120px;
}
</style>