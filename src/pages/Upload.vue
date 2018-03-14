<template>
  <div class="upload">
    <div class="upload-title">
      <p>在下方上传上半身照</p>
      <p>选择图片后可缩放或者左右滑动，选取正确照片区域</p>
    </div>
    <croppa
      class="upload-croppa"
      v-model="myCroppa"
      placeholder="点击此处打开相册或者相机"
      :prevent-white-space="true"
      :height="cropHeight"
      :width="cropWidth"
      :quality="cropQuality"
    />
    <div class="upload-operation">
      <om-progress
        v-show="showProgress"
        :value="progressValue"
        :bar-height="5"
      />
      <om-button
        type="primary"
        @click="handleUpload"
        :disabled="disabled"
        :size="'large'"
        >上传照片</om-button>
    </div>
  </div>
</template>

<script>
import * as qiniu from 'qiniu-js'
export default {
  name: 'Upload',
  data () {
    return {
      myCroppa: {},
      disabled: true,

      cropHeight: 500,
      cropWidth: 350.3333,
      cropQuality: 3,

      token: '',
      config: {},
      putExtra: {},
      showProgress: false,
      progressValue: 0
    }
  },

  methods: {
    fetchToken () {
      this.$http.get('/api/token')
        .then(res => {
          this.disabled = false
          this.token = res.data.uptoken

          this.config = {
            useCdnDomain: true,
            region: qiniu.region.z2
          }

          this.putExtra = {
            fname: '',
            params: {},
            mimeType: null
          }
        })
    },
    handleUpload () {
      this.myCroppa.generateBlob(blob => {
        this.showProgress = true
        let file = blob
        let key = 'textName' + +new Date()
        let observable = qiniu.upload(file, key, this.token, this.putExtra, this.config)
        observable.subscribe(this.next)
      })
    },
    next (res) {
      let precent = res.total.percent
      this.progressValue = precent
      if (precent >= 100) {
        this.showProgress = false
      }
    },
    setCropSize () {
      let deviceWidth = document.documentElement.clientWidth
      if (deviceWidth < this.cropWidth) {
        let _cropWidth = deviceWidth - 100
        this.cropHeight = _cropWidth * this.cropHeight / this.cropWidth
        this.cropQuality = _cropWidth * this.cropQuality / this.cropWidth
        this.cropWidth = _cropWidth
      }
    }
  },

  created () {
    this.setCropSize()
    this.fetchToken()
  }
}
</script>

<style>
.upload {
  width: 100%;
  text-align: center;
}
.upload-croppa {
  margin: 10px 0;
}
.upload-operation {
  width: 80%;
  margin: auto;
}
</style>
