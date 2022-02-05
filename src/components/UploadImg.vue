<template>
  <image-input v-model="avatarImg" @getLink="updateLink">
    <div slot="activator">
      <div v-ripple v-if="!avatarImg" class="upload pa-3">
        <div class="inner">
          <v-icon dark right x-large> mdi-image-plus </v-icon>
        </div>
      </div>
      <v-avatar size="100px" v-ripple v-else class="upload pa-3">
        <img :src="avatarImg.imageURL" alt="avatarImg" />
      </v-avatar>
    </div>
  </image-input>
</template>

<script>
import ImageInput from "./ImageInput.vue";
export default {
  name: "app",
  props:["avatarImg"],
  data() {
    return {
      saving: false,
      saved: false,
    };
  },
  components: {
    ImageInput: ImageInput,
  },
  watch: {
    avatarImg: {
      handler: function () {
        this.saved = false;
      },
      deep: true,
    },
  },
  methods: {
    uploadImage() {
      this.saving = true;
      setTimeout(() => this.savedAvatar(), 1000);
    },
    savedAvatar() {
      this.saving = false;
      this.saved = true;
    },
    updateLink(link) {
      // console.log(link.link);
      this.ImageLink = link.link;
      this.$emit("getImageLink", {
        link: this.ImageLink,
      });
    },
  },
};
</script>

<style scoped>
.upload {
  display: flex;
  justify-content: center;
  height: 200px;
  width: 200px;
  border-radius: 20px;
  background-color: #1a1d1f;
  border: 1px solid #7b849f;
  margin: 10px;
  margin-bottom: 30px;
  margin-top: 30px;
}
.text {
  opacity: 0.4;
}
.inner {
  border: 2px dashed rgb(7, 7, 7);
  height: 170px;
  width: 170px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
