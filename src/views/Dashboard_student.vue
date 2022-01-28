<template>
    <div class="bg">
        <Navigation/>
        <div class="main">
            <Round class="text-center text-lg-h4"/>
            <v-btn class="mx-auto mt-3">Attempt Quiz</v-btn>
            <TableStudent/>
        </div>
    </div>
</template>

<script>
import Navigation from '../components/Navigation_student.vue'
import Round from '../components/Round.vue'
import TableStudent from '../components/Table_Student.vue'
export default{
    name: 'Dashboard_Student',
    components: {
        Navigation,
        Round,
        TableStudent
    },
}
</script>

<style>
.main{
  display: flex;
  flex-direction: column;
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