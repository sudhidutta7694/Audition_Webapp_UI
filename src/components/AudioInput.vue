<template>
  <div>
    <div @click="launchFilePicker()">
      <slot name="activator"></slot>
    </div>
    <input
      type="file"
      ref="file"
      :name="uploadFieldName"
      @change="onFileChange($event.target.name, $event.target.files)"
      style="display: none"
    />
    <v-dialog v-model="errorDialog" max-width="300">
      <v-card>
        <v-card-text class="subheading">{{ errorText }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="errorDialog = false" flat>Got it!</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import common from "@/services/common.js";
export default {
  name: "audio-input",
  data: () => ({
    errorDialog: null,
    errorText: "",
    uploadFieldName: "file",
    maxSize: 1024,
    AudioLink: "",
  }),
  props: [{ value: Object }],
  methods: {
    launchFilePicker() {
      this.$refs.file.click();
    },
    async onFileChange(fieldName, file) {
      const { maxSize } = this;
      let audioFile = file[0];
      if (file.length > 0) {
        let size = audioFile.size / maxSize / maxSize;
        console.log(audioFile.type);
        if (size > 1) {
          this.errorDialog = true;
          this.errorText =
            "Your file is too big!"
        } else {
          let formData = new FormData();
          let audioURL = URL.createObjectURL(audioFile);
          formData.append(fieldName, audioFile);
          this.$emit("input", { formData, audioURL });
          await common.upload(formData).then((res) => {
            this.AudioLink = res.data.link;
            console.log(this.AudioLink);
            this.$emit("getAudioLink", {
              link: this.AudioLink,
            });
          });
        }
      }
    },
  },
};
</script>
