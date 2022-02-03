<template>
    <v-list-item three-line>
        <v-list-item-content style="height: 90px">
          <div class="text-overline mb-4 head">
            <div class="pointer"></div>
            <div class="text">ROUND : {{currentround + 1}}</div>
            
          </div>
        </v-list-item-content>
      </v-list-item>
</template>

<style scoped>
.pointer {
  background-color: #beffc1;
  height: 30px;
  width: 20px;
}

.text{
  font-size: 20px;
  font-weight: bold;
}
</style>
<script>
import common from "@/services/common.js";

export default {
  data:()=> ({
    currentround: "",
  }),
  beforeCreate() {
    common.getAuditionStatus().then((res) => {
      console.log(res);
      this.currentround = res.data.round;
    });
  },
}
</script>
