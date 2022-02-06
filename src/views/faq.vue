<template>
    <div>
        <Navigation :role="role" />
        <v-card width="80%">
            <div class="text-xl-h4 text-center">FAQ</div>
        </v-card>
    </div>
</template>

<script>
import Navigation from '../components/Navigation.vue'
import VueJwtDecode from 'vue-jwt-decode'

export default {
    data() {
        return {
            role: null,
        }
    },
    components: {
        Navigation,
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
}
</script>