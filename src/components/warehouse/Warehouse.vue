<template>
  <div class="center-item-box">
    <div class="center-item-left">
      <dv-decoration-11 class="title">仓库Stars详情</dv-decoration-11>
      <ve-bar :data="chartDatas"
              :extend="extend"></ve-bar>
    </div>
    <dv-decoration-2 :reverse="true"
                     style="width:5px;height:400px;" />
    <div class="center-item-right">
      <dv-decoration-11 class="title">仓库语言分类</dv-decoration-11>
      <ve-funnel :data="chartData"
                 :settings="chartSettings"
                 :extend="extend"></ve-funnel>

    </div>
  </div>
</template>

<script>
export default {
  name: "Warehouse",
  props: {
    dataObj: Object
  },
  data () {
    this.extend = {
      series: {
        label: {
          normal: {
            show: true
          }
        }
      },
      legend: {
        textStyle: { color: "#fff" }
      },
      yAxis: {
        axisLabel: {
          textStyle: {
            color: "#fff"
          }
        }
      },
      xAxis: {
        axisLabel: {
          textStyle: {
            color: "#fff"
          }
        }
      }
    };
    this.chartSettings = {
      sequence: []
    };
    return {
      chartData: {
        columns: ["lang", "number"],
        rows: []
      },
      chartDatas: {
        columns: ['名称', 'star数量'],
        rows: []
      },
      userName: ""
    }
  },
  methods: {
    getStats () {
      this.$axios.get(`https://api.github.com/users/${this.userName}/repos`).then((res) => {
        let data = res.data;
        console.log(data);

        // 仓库和仓库star 只有star大于0的时候展示
        for (var i = 0; i < data.length; i++) {
          if (data[i].stargazers_count > 0) {
            this.chartDatas.rows.push({
              '名称': data[i].name,
              'star数量': data[i].stargazers_count
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
    }
  },
  created () {

    if (localStorage.getItem('userkey')) {
      this.userName = localStorage.getItem('userkey')
    } else {
      this.userName = this.dataObj.login
    }
    this.getStats()
  }
}
</script>

<style scoped lang="scss">
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
</style>