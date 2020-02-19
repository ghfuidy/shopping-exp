<template>
  <div>
    <navbar>
      <template v-slot:left>
        <div @click="bthback" class="detailback">
          <svg
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="5572"
            width="100%"
            height="100%"
          >
            <path
              d="M380.344 510.37l385.521-385.521c28.445-28.445 28.445-74.563 0-103.008-28.445-28.445-74.563-28.445-103.008 0L225.832 458.866c-28.445 28.445-28.445 74.563 0 103.008l437.025 437.025c28.445 28.445 74.563 28.445 103.008 0 28.445-28.445 28.445-74.563 0-103.008L380.344 510.37z"
              p-id="5573"
            />
          </svg>
        </div>
      </template>

      <template v-slot:center>
        <div class="title baseflexbox">
          <div
            v-for="(item, index) in titles"
            :key="index"
            :class="{'active':index === currnetIndex}"
            @click="titleclick(index)"
          >{{item}}</div>
        </div>
      </template>

      <template v-slot:right></template>
    </navbar>
  </div>
</template>

<script>
import navbar from "components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  components: {
    navbar
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currnetIndex: 0
    };
  },
  methods: {
    titleclick(index) {
      console.log(index);
      // this.currnetIndex = index;
      this.$emit('titleclick',index)
    },

    bthback() {
      this.$router.back();
    },
  }
};
</script>

<style scoped>
.title {
  font-size: 13px;
  justify-content: space-around;
}

.active {
  color: var(--color-high-text);
}

.icon {
  transform: scale(0.45);
  fill: var(--color-text)
}

.detailback {
  height: inherit;
}
</style>