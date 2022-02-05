<template>
  <audio-input v-model="avatarAudio" @getAudioLink="updateLink">
    <div slot="activator">
      <div v-ripple v-if="!avatarAudio" class="upload pa-3">
        <div class="inner">
          <v-icon dark right x-large> mdi-headphones </v-icon>
        </div>
      </div>
      <v-icon
        v-else
        class="upload"
        style="height: 100px; width: 100px"
        size="50px"
        >mdi-volume-high</v-icon
      >
    </div>
  </audio-input>
</template>

<script>
import AudioInput from "./AudioInput.vue";
export default {
  name: "app",
  props:["avatarAudio"],
  data() {
    return {
      saving: false,
      saved: false,
      AudioLink: "",
    };
  },
  components: {
    AudioInput: AudioInput,
  },
  watch: {
    avatarAudio: {
      handler: function () {
        this.saved = false;
      },
      deep: true,
    },
  },
  methods: {
    uploadAudio() {
      this.saving = true;
      setTimeout(() => this.savedAvatar(), 1000);
    },
    savedAvatar() {
      this.saving = false;
      this.saved = true;
    },
    updateLink(link) {
      // console.log(link.link);
      this.AudioLink = link.link;
      this.$emit("getAudioLink", {
        link: this.AudioLink,
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
