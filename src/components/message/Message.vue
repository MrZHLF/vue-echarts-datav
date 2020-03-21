<template>
  <div class="message-wrap"
       v-if="isConfirm">
    <div class="message">
      <div class="message-header">{{tip}}</div>
      <div class="message-box">{{title}}</div>
      <div class="message-btns">
        <button class="cancel"
                @click="close">取消</button>
        <button class="determine"
                @click="login">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tip: {
      type: String,
      default: '提示'
    },
    title: {
      type: String,
      default: '确保输入的Gihub用户名正确'
    },
    isConfirm: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close () {
      this.$emit('onClose')
    },
    login () {
      this.$emit('onLogin')
    }
  }
}
</script>

<style lang="scss" scoped>
.message-wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.8);
  .message {
    position: relative;
    top: 40%;
    left: 50%;
    right: 0;
    bottom: 0;
    margin-left: -210px;
    display: inline-block;
    width: 420px;
    padding-bottom: 10px;
    vertical-align: middle;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    font-size: 18px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    text-align: left;
    overflow: hidden;
    backface-visibility: hidden;
    .message-header {
      padding: 15px 15px 10px;
      line-height: 1;
      color: #303133;
    }
    .message-box {
      padding: 10px 15px;
      color: #606266;
      font-size: 14px;
    }
    .message-btns {
      padding: 5px 15px 0;
      text-align: right;
      button {
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        background: #fff;
        border: 1px solid #dcdfe6;
        text-align: center;
        box-sizing: border-box;
        outline: none;
        margin: 0;
        transition: 0.1s;
        font-weight: 500;
        padding: 9px 15px;
        font-size: 12px;
        border-radius: 3px;
      }
      .cancel {
        color: #3a8ee6;
        border-color: #3a8ee6;
        outline: none;
      }

      .determine {
        color: #fff;
        background-color: #409eff;
        border-color: #409eff;
        margin-left: 20px;
      }
    }
  }
}
</style>