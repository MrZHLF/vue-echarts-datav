<template>
  <div class="border-box-content">
    <div class="fans-wrap">
      <dv-decoration-7 class="moer">粉丝</dv-decoration-7>
      <ul>
        <li v-for="(item,index) in fans.slice(0,9)"
            :key="index">
          <img :src="item.avatar_url"
               alt="">
          <span>{{item.login}}</span>
        </li>
      </ul>
      <dv-decoration-11 class="moer">
        <p @click="moerClick">点击查看更</p>
      </dv-decoration-11>
    </div>
    <!-- 显示弹框 -->
    <div class="show-wrap"
         v-show="isShow">
      <div class="show-content">
        <dv-border-box-11 class="box"
                          title="粉丝展示">
          <div class="border-box-content">
            <ul>
              <li v-for="(item,index) in fans"
                  :key="index">
                <img :src="item.avatar_url"
                     alt="">
                <span>{{item.login}}</span>
              </li>
            </ul>
          </div>
        </dv-border-box-11>
        <div class="close"
             @click="close">
          <img src="./../../assets/close.png"
               alt="">
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "Fans",
  props: {
    dataObj: Object
  },
  data () {
    return {
      fans: [],
      isShow: false,
      userName: ""
    }
  },
  methods: {
    getFans () {
      // 获取粉丝
      this.$axios.get(`https://api.github.com/users/${this.userName}/followers`).then((res) => {
        let { data } = res
        if (data.length > 0) {
          this.fans = data
        }
      })
    },
    moerClick () {
      this.isShow = true
    },
    close () {
      this.isShow = false
    }
  },
  created () {

    if (localStorage.getItem('userkey')) {
      this.userName = localStorage.getItem('userkey')
    } else {
      this.userName = this.dataObj.login
    }
    this.getFans()
  }
}
</script>

<style scoped lang="scss">
.fans-wrap {
  width: 100%;
  display: block;
  ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    li {
      width: 30%;
      margin-bottom: 10px;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: block;
        margin: 0 auto;
      }
      span {
        color: #fff;
        text-align: center;
        display: block;
      }
    }
  }
  .moer {
    width: 200px;
    height: 60px;
    margin: 0 auto;
    color: #25f3e6;
    cursor: pointer;
  }
}
.show-wrap {
  position: fixed;
  top: 0%;
  left: 0%;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.8);
  .show-content {
    position: relative;
    top: 50%;
    left: 50%;
    right: 0;
    bottom: 0;
    width: 800px;
    height: 500px;
    margin-top: -250px;
    margin-left: -400px;
    .box {
      width: 100%;
      padding-top: 20px;
    }
    .close {
      position: absolute;
      left: 50%;
      img {
        width: 40px;
        height: 40px;
      }
    }
    ul {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      li {
        width: 15%;
        margin-bottom: 10px;
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: block;
          margin: 0 auto;
        }
        span {
          color: #fff;
          text-align: center;
          display: block;
        }
      }
    }
  }
}
</style>