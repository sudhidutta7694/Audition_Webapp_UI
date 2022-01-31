<template>
    <div class="round">
      Current Round : {{round}}
      </div>
</template>

<script>
import common from "@/services/common.js";
export default{
   name:'Round',
   round:"",
   created() {
     common.getAuditionStatus().then((res) => {
      console.log(res);
      this.round = res.data.round;
    });
   }
   
}
</script>

<style >
.round{
  margin: 10px;
  /* color: #a692ff; */
  font-weight: bold;
}
</style>
