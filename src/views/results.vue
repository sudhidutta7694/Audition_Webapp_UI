<template>
    <div>
        <Navigation :role="role" />
        <v-container>
            <v-simple-table fixed-header height="300px" style="width:L 80%">
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left">Name</th>
                            <th class="text-left">Calories</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in desserts" :key="item.name">
                            <td>{{ item.name }}</td>
                            <td>{{ item.calories }}</td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-container>
    </div>
</template>
<script>
import Navigation from '../components/Navigation.vue'
import VueJwtDecode from 'vue-jwt-decode'

export default {
    name: 'result',
    components: {
        Navigation,
    },
    data() {
        return {
            desserts: [
                {
                    name: 'Frozen Yogurt',
                    calories: 159,
                },
                {
                    name: 'Ice cream sandwich',
                    calories: 237,
                },
                {
                    name: 'Eclair',
                    calories: 262,
                },
                {
                    name: 'Cupcake',
                    calories: 305,
                },
                {
                    name: 'Gingerbread',
                    calories: 356,
                },
                {
                    name: 'Jelly bean',
                    calories: 375,
                },
                {
                    name: 'Lollipop',
                    calories: 392,
                },
                {
                    name: 'Honeycomb',
                    calories: 408,
                },
                {
                    name: 'Donut',
                    calories: 452,
                },
                {
                    name: 'KitKat',
                    calories: 518,
                },
            ],
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
}
</script>