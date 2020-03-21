<template>
  <div class="info-wrap border-box-content">
    <div class="info-left">
      <img :src="dataObj.avatar_url"
           alt="" />
    </div>
    <div class="info-right">
      <h1 v-if="dataObj.login">{{dataObj.login}}</h1>
      <h1 v-else>暂无</h1>
      <p v-if="dataObj.created_at">{{dataObj.created_at | formatDate}}</p>
      <p v-else>暂无</p>
      <span>加入github</span>
      <p>{{dataObj.location}}</p>
    </div>
  </div>
</template>

<script>
import { formatDate } from './../../common/js/date'
export default {
  name: "User",
  props: {
    dataObj: Object
  },
  filters: {
    // 对日期格式化处理
    formatDate (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy--MM-dd')
    }
  },
  created () {
    console.log(this.dataObj, 'ppp')
  }
}
</script>

<style scoped lang="scss">
.info-wrap {
  display: flex;
  flex-direction: row;
  z-index: 99;
  .info-left {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    padding: 10px;
    border: 1px solid #4788fb;
    img {
      display: block;
      width: 100%;
      height: 100%;
      background-size: 100% 100% !important;
      border-radius: 50%;
      vertical-align: middle;
    }
  }
  .info-right {
    vertical-align: top;
    margin-left: 10px;
    h1 {
      margin-top: 10px;
      font-size: 30px;
      line-height: 20px;
      font-weight: 700;
      color: #25f3e6;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    p {
      display: block;
      color: #f6a645;
      font-size: 20px;
      padding: 10px 0;
      text-decoration: none;
      cursor: none;
    }
    span {
      color: #fff;
    }
  }
}
</style>