<template>
  <div class="page-user-profile">
    <van-nav-bar left-arrow @click-left="$router.back()" title="编辑资料" right-text="保存" @click-right="save()"></van-nav-bar>
    <van-cell-group>
      <van-cell is-link title="头像" @click="sheetShow=true" center>
        <van-image
          slot="default"
          width="1.5rem"
          height="1.5rem"
          fit="cover"
          round
          :src="userProfile.photo"
        />
      </van-cell>
      <van-cell is-link title="名称" :value="userProfile.name" />
      <van-cell is-link title="性别" @click="popupShow=true" :value="userProfile.gender===0?'男':'女'" />
      <van-cell is-link title="生日" @click="openDate()" :value="userProfile.birthday" />
    </van-cell-group>
    <van-popup v-model="popupShow" position="bottom">
      <van-cell value="男" @click="changeGender(0)" is-link />
      <van-cell value="女" @click="changeGender(1)" is-link />
    </van-popup>
    <van-action-sheet v-model="sheetShow" :actions="actions" @select="onSelect" cancel-text="取消" />
    <van-popup v-model="dateShow" position="bottom">
      <van-datetime-picker
        title="选择生日"
        v-model="nowDate"
        type="date"
        :min-date="minDate"
        @cancel="dateShow=false"
        @confirm="confirmDate"
      />
    </van-popup>
    <input type="file" @change="previewFile()" class="uploadInput" ref="uploadInput">
  </div>
</template>

<script>
import { getUserProfile, editUser } from '@/api/user'
import moment from 'moment'
export default {
  data () {
    return {
      sheetShow: false,
      popupShow: false,
      dateShow: false,
      nowDate: new Date(),
      minDate: new Date('1950-01-01'),
      actions: [{ name: '从相册中选择' }, { name: '拍照' }],
      userProfile: {
        photo: '',
        name: '',
        gender: 0,
        birthday: ''
      }
    }
  },
  created () {
    this.getUserProfile()
  },
  methods: {
    openDate () {
      this.dateShow = true
      this.nowDate = new Date(this.userProfile.birthday || new Date())
    },
    confirmDate (value) {
      this.dateShow = false
      this.userProfile.birthday = moment(value).format('YYYY-MM-DD')
    },
    changeGender (gender) {
      this.userProfile.gender = gender
      this.popupShow = false
    },
    onSelect (item, i) {
      this.sheetShow = false
      if (i === 0) {
        this.$refs.uploadInput.click()
      }
    },
    previewFile () {
      // 从本地都去图片 进行预览
      const file = this.$refs.uploadInput.files[0]
      const fileReader = new FileReader()
      fileReader.onload = () => {
        this.userProfile.photo = fileReader.result
      }
      fileReader.readAsDataURL(file)
    },
    async save () {
      await editUser(this.userProfile)
      this.$toast.success('保存成功')
    },
    async getUserProfile () {
      const {
        data: { data }
      } = await getUserProfile()
      this.userProfile = data
    }
  }
}
</script>

<style scoped lang='less'>
.uploadInput{
  display: none
}
</style>
