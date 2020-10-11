<template>
  <div class="md-layout">
    <md-list class="md-layout-item md-size-100">
      <div v-for="p in products" :key="p.id"> 
        <md-list-item class="md-layout-item">
          <Product :product="p" @remove="$emit('removeitem', $event)" />
        </md-list-item>
        <md-divider class="md-inset"></md-divider>
      </div>
    </md-list>
  
  </div>
</template>

<script>
import Product from "./Product";
export default {
  name: "ProductList",
  components: {
    Product
  },
  props: {
    products: {
      type: Array,
      default: () => []
    }
  },
};
</script>

<style lang="scss" scoped>
.md-list {
  width: 320px;
  max-width: 100%;
  display: inline-block;
  vertical-align: top;
  border: 1px solid rgba(#000, 0.12);
}
</style>