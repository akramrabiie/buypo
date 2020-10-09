<template>
  <div class="md-layout">
    <md-list class=" md-layout-item md-size-80 ">
      <Product />
      <md-divider class="md-inset"></md-divider>
      <Product />
      <md-divider class="md-inset"></md-divider>
      <Product />
      <md-divider class="md-inset"></md-divider>
      <Product />
      <md-divider class="md-inset"></md-divider>
      <Product />
      <md-divider class="md-inset"></md-divider>
      <Product />
    </md-list>
  </div>
</template>

<script>
import Product from './Product'
export default {
  name: 'ProductList',
  components:{
      Product
  },
  props:['products']
}
</script>

<style lang="scss" scoped>
  .md-list {
    width: 320px;
    max-width: 100%;
    display: inline-block;
    vertical-align: top;
    border: 1px solid rgba(#000, .12);
  }
</style>