<template>
  <dv-border-box-9 class="tables">
    <dv-scroll-board :config="config"
                     style="width:100%;height:auto" />
  </dv-border-box-9>
</template>

<script>
export default {
  data () {
    return {
      config: {
      },
      userName: ""
    }
  },
  methods: {
    getEvents () {
      this.$axios.get(`https://api.github.com/users/${this.userName}/events`).then(res => {
        let { data } = res;
        let dataAry = [];
        if (data) {
          for (let i = 0; i < data.length; i++) {
            if (data[i].payload.commits) {
              data[i].payload.commits.forEach(ele => {
                dataAry.push([data[i].created_at, data[i].type, data[i].repo.name, ele.message])
              })
            }
          }
        }

        this.config = {
          header: ['操作时间', '类型', '操作的仓库', '备注'],
          data: dataAry
        }
      })
    }
  },
  created () {
    this.userName = sessionStorage.getItem('userkey')
    this.getEvents()
  }
}
</script>

<style scoped lang="scss">
.tables {
  padding: 0 10px;
}
</style>