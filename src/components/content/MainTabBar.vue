<template>
  <div>
    <tab-bar>
      <tab-bar-item
        v-for="(item,key) in naives"
        :key="key"
        :link="item.path"
        :activecolor="'#9529b6'"
      >
        <template v-slot:item-icon>
          <img :src="item.imgurl" alt />
        </template>

        <template v-slot:item-icon-active>
          <img :src="item.activeimgurl" alt />
        </template>

        <template v-slot:item-text>
          <div>{{item.name}}</div>
        </template>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";

export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem
  },
  data() {
    return {
      naives: [
        {
          name: "首页",
          imgurl: require("assets/img/home.svg"),
          activeimgurl: require("assets/img/home_active.svg"),
          path: "/home"
        },
        {
          name: "分类",
          imgurl: require("assets/img/category.svg"),
          activeimgurl: require("assets/img/category_active.svg"),
          path: "/category"
        },
        {
          name: "购物车",
          imgurl: require("assets/img/shoppingcart.svg"),
          activeimgurl: require("assets/img/shoppingcart_active.svg"),
          path: "/cart"
        },
        {
          name: "我的",
          imgurl: require("assets/img/profile.svg"),
          activeimgurl: require("assets/img/profile_active.svg"),
          path: "/profile"
        }
      ]
    };
  }
};
</script>

<style>
</style>