<template>
  <div class="upload">
    <div class="upload-title">
      <p>请点击下方灰色区域上传"上半身照"</p>
      <p>选择图片后可缩放或者左右滑动</p>
      <p>选取正确照片区域</p>
    </div>
    <croppa
      class="upload-croppa"
      v-model="myCroppa"
      placeholder="点击此处打开相册或者相机"
      :prevent-white-space="true"
      :height="cropHeight"
      :width="cropWidth"
      :quality="cropQuality"
      @file-choose="fileChoose"
      @image-remove="imageRemove"
    />
    <om-field
      label="姓名"
      placeholder="请输入真实姓名"
      v-model="name"
      :state="nameState"
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
import { MessageBox } from 'mint-ui'
export default {
  name: 'Upload',
  data () {
    return {
      myCroppa: {},
      name: '',
      nameState: 'warning',
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

  watch: {
    name (value) {
      this.nameState = value.length >= 2 ? 'success' : 'warning'
    }
  },

  methods: {
    fetchToken () {
      this.$http.get('/api/token')
        .then(res => {
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
        }, err => {
          console.log('serve error', err)
        })
    },
    fileChoose (file) {
      if (!file) return
      this.disabled = false
    },
    imageRemove () {
      this.disabled = true
    },
    handleUpload () {
      if (!this.hasImage()) return
      if (!this.hasName()) {
        MessageBox.prompt('请输入真实姓名')
          .then(({ value, action }) => {
            if (action === 'confirm') {
              this.name = value
              this.uploadCroppedFile(value)
            }
          })
      } else {
        this.uploadCroppedFile(this.name)
      }
    },
    uploadCroppedFile (fileName) {
      this.myCroppa.generateBlob(blob => {
        this.showProgress = true
        let file = blob
        let key = `${fileName}-${+new Date()}`
        let observable = qiniu.upload(file, key, this.token, this.putExtra, this.config)
        observable.subscribe(this.uploadNext, this.uploadError, this.uploadComplete)
      })
    },
    uploadNext (res) {
      let precent = res.total.percent
      this.progressValue = precent
      if (precent >= 100) {
        this.showProgress = false
      }
    },
    uploadError () {
      MessageBox.alert('上传失败，请联系管理员！').then(action => {
        console.log('上传失败')
      })
    },
    uploadComplete (res) {
      // let fileName = res.key
      // 上传到服务器的一个文件
    },
    hasImage () {
      return this.myCroppa.hasImage()
    },
    hasName () {
      return this.name.length >= 2
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
  margin-bottom: 100px;
}
.upload-title {
  margin: 0 10px;
}
.upload-title p {
  font-size: 16px;
}
.upload-croppa {
  margin: 10px 0;
}
.upload-operation {
  width: 93%;
  margin: auto;
}
</style>
