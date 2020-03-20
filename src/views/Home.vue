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
                <dv-capsule-chart class="lc1-chart"
                                  :config="config" />
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
                    <ve-funnel :data="chartData"
                               :settings="chartSettings"></ve-funnel>
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
      dataObj: {},
      chartData: {
        columns: ["lang", "number"],
        rows: []
      },
      config: {
        data: [],
        unit: '件'
      }
    };
  },
  components: {
    Header,
    HomeLeft
  },
  watch: {

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
        console.log(typeof this.config)

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
    }
  },
  mounted () {
    this.getStats()
  },
  created () {
    this.userName = this.$route.query.user;
    this.getUserInfo();

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
            height: 400px;
            .ve-pie {
              width: 100% !important;
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
            .ve-funnel {
              width: 100% !important;
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
