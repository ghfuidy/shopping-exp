<template>
  <div class="goods baseflexbox">
    <good-list-item v-for="(item, index) in goods" :key=index :good=item ></good-list-item>
  </div>
</template>

<script>
import GoodListItem from './GoodListItem'

export default {
  name: 'GoodList',
  components: {
    GoodListItem
  },
  props: {
    goods: {
      type: Array,
      default(){
        return []
      }
    }
  },
  methods: {
    emitimageload(){      
      this.$emit('startrefresh')
    }
  }
}
</script>

<style scoped>
  .goods {
    flex-wrap: wrap;
    justify-content: space-evenly
  }
</style>