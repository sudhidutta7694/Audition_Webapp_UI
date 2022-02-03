<template>
    <div class="round">
      Current Round : {{currentround+1}}
      </div>
</template>

<script>
import common from "@/services/common.js";
export default{
   name:'Round',
   data:() =>({
    currentround: ""
   }),
   created() {
     common.getAuditionStatus().then((res) => {
      console.log(res);
      this.round = res.data.round;
    });
   },
   beforeCreate() {
    common.getAuditionStatus().then((res) => {
      console.log(res);
      this.currentround = res.data.round;
    });
  },
   
}
</script>

<style >
.round{
  margin: 10px;
  /* color: #a692ff; */
  font-weight: bold;
}
</style>
