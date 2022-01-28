<template>
    <div class="bg">
        <Navigation/>
        <div class="d-flex flex-column align-center justify-center main">
            <Round class="text-center text-lg-h4"/>
            <v-btn class="mx-auto mt-3">Attempt Quiz</v-btn>
        </div>
    </div>
</template>

<script>
import Navigation from '../components/Navigation_student.vue'
import Round from '../components/Round.vue'
export default{
    name: 'Dashboard_Student',
    components: {
        Navigation,
        Round,
    },
}
</script>

<style>
.main{
  height: 100%;
  width: 100%;
  margin: 30px;
  overflow: hidden;
  margin-left: 210px;
}

.bg{
    background-color:  #111315;
    display: flex;
    height: 100%;
    overflow: hidden;
}
</style>