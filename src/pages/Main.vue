<template>
  <div class="main">
    <div class="main-title">
      <p>同学会半身照片收集</p>
    </div>
    <om-swipe class="main-swipe">
      <om-swipe-item
        v-for="img in swipeImages"
        :key="img"
      >
        <img style="width: 100%;" :src="img" alt="img">
      </om-swipe-item>
    </om-swipe>
    <om-button
      class="main-upload"
      type="primary"
      @click="handleUpload"
    >
      去上传照片
    </om-button>
  </div>
</template>

<script>
export default {
  name: 'Main',

  data () {
    return {
      swipeImages: [
        'http://img.hkphoto.vip/swipe_1.jpg',
        'http://img.hkphoto.vip/swipe_2.jpg',
        'http://img.hkphoto.vip/swipe_3.jpg'
      ]
    }
  },

  methods: {
    handleUpload () {
      this.$router.push('/upload')
    }
  }
}
</script>

<style>
.main {
  height: 100%;
  width: 100%;
  text-align: center;
}

.main-title {

}

.main-swipe {
  height: 250px;
}

.main-upload {
  margin-top: 5%;
  width: 80%;
}
</style>
