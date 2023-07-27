<template>
  <div class="product-add">
      <div class="product-add-title">新增图书</div>
      <div>
          <input type="text" v-model="model.name" placeholder="输入书名">
      </div>
      <div>
          <input type="text" v-model="model.author" placeholder="输入作者">
      </div>
      <van-field
        readonly
        clickable
        name="picker"
        :value="model.category"
        label="分类"
        placeholder="点击选择分类"
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
      <div>
          <input type="text" v-model="model.brief" placeholder="输入简介">
      </div>
      <div>
          <input type="text" v-model="model.stock" placeholder="数量">
      </div>
      <van-field name="uploader" label="上传图书封面">
        <template #input>
          <van-uploader v-model="model.preview" :before-read="beforeRead" />
        </template>
      </van-field>
      <!-- <van-uploader class="avatar" :before-read="beforeRead" v-if="model.preview.url !== undefined">
          <img :src="model.avatar" alt="">
          <button>666</button>
      </van-uploader>
      <van-uploader class="avatar" :before-read="beforeRead" v-if="model.preview.url === undefined">
          <img :src="model.preview" alt="">
          232
      </van-uploader> -->
      <div class="btn-container">
          <button @click="ok" class="ok">确认</button>
          <button @click="cancel" class="cancel">取消</button>
      </div>
  </div>
</template>

<script>
  export default {
      name: "BookAddView",
      data() {
          return {
            columns: ['文学', '历史', '艺术', '计算机', '科学', 'history'],
            showPicker: false,
            model: {
              cid: "2",
              name: "",
              author: "",
              avatar: null,
              category: "",
              brief: "",
              rate: "0",
              price: "59",
              stock: null,
              read: "0",
              preview: [
                { url: null }
              ]
            }
          }
      },
      methods: {
          async ok() {
            // let formData = new FormData();
            // if(Array.isArray(this.model.avatar)) {
            //   this.model.avatar.forEach((item, index) => {
            //     formData.append(`avatar${index + 1}`, item.file);
            //   })
            // } else {
            //   formData.append('avatar', this.model.avatar.file);
            // }
            // 添加其他参数到 formData
            // formData.append('cid', this.model.cid);
            // formData.append('name', this.model.name);
            // formData.append('author', this.model.author);
            // formData.append('category', this.model.category);
            // formData.append('brief', this.model.brief);
            // formData.append('rate', this.model.rate);
            // formData.append('price', this.model.price);
            // formData.append('stock', this.model.stock);
            // formData.append('read', this.model.read);
            // formData.append('avatar', this.model.preview);

            // await this.$api.admin.add(formData);
            // console.log(this.model.preview);
            // console.log(this.model.preview.url);
            // console.log(formData);
            this.$Notice('新增成功')
            this.$route.query.flag = "ok"
            this.$router.back()
          },
          async cancel() {
              await this.$Confirm('确定退出？')
              this.$router.back()
          },
          onConfirm(value) {
            this.model.category = value;
            this.showPicker = false;
            if(this.model.category === '文学') this.model.cid = 5
            else if(this.model.category === '历史') this.model.cid = 6
          },
          beforeRead(file) {
            const isImage = file.type.indexOf('image') === 0;
            const isLt2M = file.size / 1024 / 1024 < 2;

            if(!isImage) this.$Alert('请选择图片文件');
            if(!isLt2M) this.$Alert('图片大小不能超过2MB');
            if(isImage && isLt2M) this.model.preview = file; // 将文件对象赋值给info.avatar
            this.model.preview = URL.createObjectURL(file);
            console.log('02222'+file);
            console.log('3333'+this.model.preview.url);
            return isImage && isLt2M
        },
      },
      watch: {
            model: {
                handler() {
                    console.log('avatar'+this.model.avatar);
                    console.log('url:::'+this.model.preview.url);
                    // console.log(this.flag);
                },
                deep: true,
                immediate: true
            }
        }
  }
</script>

<style lang="sass" scoped>
  img
    width: 50px
  .product-add
      position: fixed
      left: 0
      top: 0
      width: 100%
      height: 100%
      background-color: #fff
      padding: 0 px2vw(20)
      box-sizing: border-box
      .product-add-title
          height: px2vw(40)
          line-height: px2vw(40)
          text-align: center
          // margin-bottom: 50px
      input
          font-family: jinBu
          text-indent: 1em
          width: 100%
          height: px2vw(40)
          margin: px2vw(5) 0
          border: 2px solid black
          box-sizing: border-box
      .van-cell--clickable
        border: 2px solid black
      .btn-container
          display: flex
          height: px2vw(40)
          margin-top: 5px
          button
              border: none
              font-family: jinBu
          button.ok
              flex: 3
              font-size: 14px
              background-color: #db214c
              color: #fff
          button.cancel
              flex: 1
              font-size: 14px
              background-color: #333
              color: #fff
</style>