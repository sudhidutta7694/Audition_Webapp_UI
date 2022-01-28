<template>
      <image-input v-model="avatar">
        <div slot="activator">
          <div v-ripple v-if="!avatar" class="upload pa-3">
            <div class="inner">
               <v-icon
          dark
          right
          x-large
        > 
          mdi-headphones
        </v-icon>
            </div>
            
          </div> 
            <v-avatar size="100px" v-ripple v-else class="upload pa-3">
            <img :src="avatar.imageURL" alt="avatar">
          </v-avatar>
        </div>
      </image-input>
</template>

<script>
import ImageInput from './ImageInput.vue'
export default {
  name: 'app',
  data () {
    return {
      avatar: null,
      saving: false,
      saved: false
    }
  },
  components: {
    ImageInput: ImageInput
  },
  watch:{
    avatar: {
      handler: function() {
        this.saved = false
      },
      deep: true
    }
  },
  methods: {
    uploadImage() {
      this.saving = true
      setTimeout(() => this.savedAvatar(), 1000)
    },
    savedAvatar() {
      this.saving = false
      this.saved = true
    }
  }
}
</script>

<style scoped>
.upload{
  display: flex;
  justify-content: center;
  height: 200px;
  width: 200px;
  border-radius: 20px;
  background-color: #1A1D1F;
  border: 1px solid #7B849F;
  margin: 10px;
  margin-bottom: 30px;
  margin-top: 30px;
}
.text{
  opacity: 0.4;
}
.inner{
  border: 2px dashed rgb(7, 7, 7);
  height: 170px;
  width: 170px;
  border-radius: 20px;
  display: flex;justify-content: center;
  align-items: center;
}
</style>