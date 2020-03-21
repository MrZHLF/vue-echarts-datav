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
      <dv-decoration-11 class="moer">点击查看更</dv-decoration-11>
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
      fans: []
    }
  },
  methods: {
    getFans () {
      // 获取粉丝
      this.$axios.get(`https://api.github.com/users/${this.dataObj.login}/followers`).then((res) => {
        let { data } = res
        if (data.length > 0) {
          this.fans = data
        }
      })
    }
  },
  created () {
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
</style>