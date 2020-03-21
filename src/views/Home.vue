<template>
  <div class="home">
    <div class="loading"
         v-if="isLoading">
      <dv-loading class="txt">数据加载中...</dv-loading>
    </div>
    <Header />
    <div class="container">
      <dv-border-box-1>
        <div class="container-wrap">
          <div class="container-left">
            <HomeLeft :dataObj="dataObj" />
          </div>
          <div class="container-right">
            <div class="container-center">
              <div class="container-center-left">
                <dv-border-box-10 class="center-item">
                  <Warehouse :dataObj="dataObj" />
                </dv-border-box-10>
                <div class="tab-list">

                  <Lately />
                </div>
              </div>
              <div class="container-center-right">
                <div style="overflow: hidden;">
                  <dv-border-box-3 class="info">
                    <User :dataObj="dataObj" />
                  </dv-border-box-3>
                  <dv-border-box-3 class="classification">
                    <div class="border-box-content">
                      <Fans :dataObj="dataObj" />
                    </div>
                  </dv-border-box-3>
                </div>
              </div>

            </div>
          </div>
        </div>
      </dv-border-box-1>
    </div>

  </div>
</template>

<script>
import Header from "./../components/app-header/Header";
import HomeLeft from "./center/HomeLeft";
import Fans from './../components/fans/Fans'
import User from './../components/user/User'
import Warehouse from './../components/warehouse/Warehouse'
import Lately from './../components//lately/Lately'
export default {
  name: "Home",
  data () {
    return {
      userName: "",
      fans: [], //获取粉丝量
      dataObj: {},
      isLoading: true, //加载状态
    };
  },
  components: {
    Header,
    HomeLeft,
    Fans,
    User,
    Warehouse,
    Lately
  },
  methods: {
    getUserInfo () {
      this.$axios
        .get(`https://api.github.com/users/${this.userName}`)
        .then(res => {
          const { data } = res;
          this.dataObj = data;
          this.isLoading = false
        });
    }
  },
  created () {
    this.userName = this.$route.query.user;
    this.getUserInfo()
  }
};
</script>
<style scoped lang="scss">
.home {
  width: 100%;
  height: 100%;
  background-image: url(http://datav.jiaminghi.com/demo/electronic-file/img/bg.110420cf.png);
  background-repeat: no-repeat;
  background-size: cover;
  padding-bottom: 5%;
  .loading {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.8);
    .txt {
      color: #ffffff;
      padding-top: 10px;
    }
  }
  .container {
    width: 100%;
    height: 100%;
    .container-wrap {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;
      .container-left {
        width: 20%;
        height: 100%;
      }
      .container-right {
        margin-left: 10px;
        .container-center {
          display: flex;
          flex-direction: row;
          width: 100%;
          .container-center-left {
            width: 100%;
            .tab-list {
              width: 100%;
              height: 230px;
              margin-top: 10px;
            }
          }
          .container-center-right {
            flex: 1;
          }
          .center-item {
            width: 800px;
            height: 450px;
          }
          .info {
            width: 400px;
            height: 200px;
            margin-left: 20px;
          }
          .classification {
            height: 460px;
            margin-top: 20px;
            margin-left: 20px;
          }
        }
      }
    }
  }
}
</style>
