<template>
  <div class="main">
    <div class="main-title">
      <p>南安三中81高中同学会</p>
      <p>个人半身照采集</p>
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
        'http://img.hkphoto.vip/s-1.jpg',
        'http://img.hkphoto.vip/s-2.jpg',
        'http://img.hkphoto.vip/s-3.jpg'
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
  border: 3px solid #b4b4b4;
  margin: 10px;
}

.main-title p {
 font-size: 16px;
 color: #555555;
 font-weight: bold;
}

.main-swipe {
  height: 300px;
}

.main-upload {
  margin-top: 5%;
  width: 80%;
}
</style>
