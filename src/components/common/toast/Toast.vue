<template>
  <div class="toast" v-show="isShow">
    <div v-if="type === 'radio'">
      <input type="text" />
    </div>
    <div v-else-if="type === 'input'">
      <input type="number" />
    </div>
    <div v-else>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  props: {},
  data() {
    return {
      message: "",
      isShow: false,
      type: 'msg'
    };
  },
  methods: {
    show(message = "默认文字", type = 'msg', duration = 3000) {
      this.isShow = true;
      this.type = type;
      this.message = message;

      setTimeout(() => {
        this.isShow = false;
        this.message = "";
      }, duration);
    }
  }
};
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px 10px;

  z-index: 99;

  color: #fff;

  background-color: rgba(0, 0, 0, 0.75);
}
</style>