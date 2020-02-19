<template>
  <div>
    <input type="checkbox" name class="btn-checkbox" :checked="ischecked" @change="checkchange($event)"/>
  </div>
</template>

<script>
export default {
  name: "checkbox",
  // model:{
  //   prop: 'ischecked',
  //   event: 'change'
  // },
  props: {
    ischecked:{
      type: Boolean,
    }
  },
  methods: {
    checkchange(event){
      this.$emit('change', event.target.checked)
    }
  }
};
</script>

<style scoped>
.btn-checkbox {
  position: relative;
  display: block;
  width: 10px;
  height: 10px;
}

.btn-checkbox:before {
  position: absolute;
  display: block;
  width: 20px;
  height: 20px;
  content: "";
  border: 1px solid #c0c0c0;
  border-radius: 50%;
  background-color: #fff;
  transform: translate(-5px, -5px);
}

.btn-checkbox:checked:before {
  background-color: var(--color-high-text);
  background-image: url("~assets/img/selected.svg");
  background-size: contain;
}
</style>