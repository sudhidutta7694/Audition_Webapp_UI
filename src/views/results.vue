<template>
    <div>
        <Navigation :role="role" />
        <v-container class="d-flex align-center justify-center" style="width: 80%">
            <v-card class="elevation-8">
                <div>
                    <v-list-item three-line>
                        <v-list-item-content>
                            <div class="text-overline">
                                <div class="pointer"></div>
                                <div>PARTICIPANTS SELECTED FOR NEXT ROUND</div>
                            </div>
                        </v-list-item-content>
                    </v-list-item>
                </div>
                <v-data-table
                    :headers="headers"
                    :items="result.username"
                    :items-per-page="itemsPerPage"
                    class="pa-5 pt-0"
                ></v-data-table>
            </v-card>
        </v-container>
    </div>
</template>
<script>
import Navigation from '../components/Navigation.vue'
import VueJwtDecode from 'vue-jwt-decode'
import common from '../services/common.js'

export default {
    name: 'result',
    components: {
        Navigation,
    },
    data() {
        return {
            itemsPerPage: 10,
            headers: [
                {
                    text: 'Name',
                    align: 'start',
                    value: 'name',
                },
                { text: 'Feedback', value: 'feedback' },
            ],
            desserts: [
                {
                    name: 'Akhilesh Yadav',
                    feedback: 'Bruh',

                },
                {
                    name: 'Rudra Jalan',
                    feedback: 'Kya bhai?'
                },
            ],
            result: null,
            role: "",
        }
    },
    created() {
        this.$vuetify.theme.dark = true;
        if (localStorage.getItem("token") === null) {
            this.$router.push("/");
        } else {
            var tok = VueJwtDecode.decode(localStorage.getItem("token").substring(6));
            this.role = tok.role;
        }
    },
    beforeCreate() {
        common.result().then((res) => {
            this.result = res.data
            console.log("----------")
            console.log(this.result)
            console.log("-----------")
            console.log(res.data)
        })

    }
}
</script>

<style >
.pointer {
    background-color: #a692ff;
    width: 10px;
    border-radius: 10px;
    margin-right: 8px;
}

.text-overline {
    display: flex;
    align-items: center;
}
</style>