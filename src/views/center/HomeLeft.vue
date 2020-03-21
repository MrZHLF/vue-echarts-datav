<template>
  <dv-border-box-3 class="border-box-content">
    <div class="container-item">
      <div class="box-item">
        <p class="item">公开仓库数</p>
        <dv-decoration-9 style="width:150px;height:150px;color:#fff">
          <p v-if="dataObj.public_repos>0">
            {{dataObj.public_repos}}
          </p>
          <p v-else>无</p>
        </dv-decoration-9>
      </div>
      <dv-decoration-2 style="height:5px;display: block;" />
      <div class="box-item">
        <p class="item">粉丝</p>
        <dv-decoration-9 style="width:150px;height:150px;color:#fff">
          <p v-if="dataObj.followers>0">
            {{dataObj.followers}}
          </p>
          <p v-else>无</p>
        </dv-decoration-9>
      </div>
      <dv-decoration-2 style="height:5px;display: block;" />
      <div class="box-item last-item">
        <p class="item">跟随</p>
        <dv-decoration-9 style="width:150px;height:150px;color:#fff">
          <p v-if="dataObj.following>0">
            {{dataObj.following}}
          </p>
          <p v-else>无</p>
        </dv-decoration-9>
      </div>
    </div>
  </dv-border-box-3>
</template>

<script>
export default {
  props: {
    dataObj: Object
  },
  data () {
    return {

    }
  },
  created () {
    console.log(this.dataObj)
  },
};
</script>

<style scoped lang="scss">
.container-left {
  width: 20%;
  height: 100%;
  .container-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    .box-item {
      margin-bottom: 10px;
      .item {
        color: white;
        text-align: center;
        padding-top: 10px;
      }
    }
    .last-item {
      margin-top: 20px;
      .item {
        padding-top: 5px;
      }
    }
  }
}
</style>
