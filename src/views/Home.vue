<template>
  <div class="home">
    <Header />
    <div class="container">
      <dv-border-box-1>
        <div class="container-wrap">
          <div class="container-left">
            <HomeLeft />
          </div>
          <div class="container-right">
            <div class="container-center">
              <dv-border-box-10 class="center-item">
                <div class="center-item-box">
                  <div class="center-item-left">
                    <dv-decoration-11 class="title">仓库Stars详情</dv-decoration-11>
                  </div>
                  <dv-decoration-2 :reverse="true"
                                   style="width:5px;height:380px;" />
                  <div class="center-item-right">
                    <dv-decoration-11 class="title">仓库语言分类</dv-decoration-11>
                    <ve-funnel :data="chartData"
                               :settings="chartSettings"></ve-funnel>

                  </div>
                </div>
              </dv-border-box-10>
              <div style="overflow: hidden;">
                <dv-border-box-3 class="info">
                  <div class="info-wrap border-box-content">
                    <div class="info-left">
                      <img src="https://avatars2.githubusercontent.com/u/32163286?v=4"
                           alt="" />
                    </div>
                    <div class="info-right">
                      <h1>MrZHLF</h1>
                      <p>2017-09-21</p>
                      <span>加入github</span>
                    </div>
                  </div>
                </dv-border-box-3>
                <dv-border-box-3 class="classification">
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
                </dv-border-box-3>
              </div>
            </div>
            <div class="container-list"></div>
          </div>
        </div>
      </dv-border-box-1>
    </div>
  </div>
</template>

<script>
import Header from "./../components/app-header/Header";
import HomeLeft from "./center/HomeLeft";
export default {
  name: "Home",
  data () {
    this.chartSettings = {
      sequence: []
    };
    return {
      userName: "",
      fans: [], //获取粉丝量
      dataObj: {},
      chartData: {
        columns: ["lang", "number"],
        rows: []
      },
      config: {
        data: []
      }
    };
  },
  components: {
    Header,
    HomeLeft
  },
  methods: {
    getUserInfo () {
      this.$axios
        .get(`https://api.github.com/users/${this.userName}`)
        .then(res => {
          const { data } = res;
          this.dataObj = data;
        });
    },
    getStats () {
      this.$axios.get(`https://api.github.com/users/${this.userName}/repos`).then((res) => {
        let data = res.data;
        // 仓库和仓库star 只有star大于0的时候展示
        for (var i = 0; i < data.length; i++) {
          if (data[i].stargazers_count > 0) {
            this.config.data.push({
              name: data[i].name,
              value: data[i].stargazers_count
            })
          }
        }
        // 梳理语言，计算语言类型和各个语言的数量
        let languages = {};
        for (var i = 0; i < data.length; i++) {
          let langData = data[i].language;
          if (langData in languages) {
            languages[langData]++;
          } else {
            languages[langData] = 1;
          }
        }
        let dataL = [];
        let keyTitle = []
        for (const key in languages) {
          keyTitle.push(key)
          dataL.push({ lang: key, number: languages[key] });
        }
        this.chartData.rows = dataL;
        this.chartSettings.sequence = keyTitle
      })
    },
    getFans () {
      // 获取粉丝
      this.$axios.get(`https://api.github.com/users/${this.userName}/followers`).then((res) => {
        let { data } = res
        console.log(data)
        if (data.length > 0) {
          this.fans = data
        }
      })
    }
  },
  mounted () {
    this.getStats()
  },
  created () {
    this.userName = this.$route.query.user;
    this.getUserInfo();
    this.getFans()
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
          .center-item {
            width: 800px;
            height: 450px;
            .center-item-box {
              width: 100%;
              height: 100%;
              display: flex;
              flex-direction: row;
              justify-content: space-around;
              .center-item-left {
                width: 400px;
              }
              .center-item-right {
                width: 400px;
              }
              .title {
                color: #25f3e6;
                font-weight: 700;
                font-size: 20px;
                width: 200px;
                height: 60px;
                display: block;
                margin: 0 auto;
              }
            }
          }
          .info {
            width: 400px;
            height: 200px;
            margin-left: 20px;
            .info-wrap {
              display: flex;
              flex-direction: row;
              z-index: 9999;
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
          }
          .classification {
            height: 460px;
            margin-top: 20px;
            margin-left: 20px;
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
            }
            .moer {
              width: 200px;
              height: 60px;
              margin: 0 auto;
              color: #25f3e6;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>
