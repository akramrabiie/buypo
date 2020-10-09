<template>
  <appContainer >
    <div class="md-layout">
      <h1>محصولات</h1>
      <md-button class="md-raised md-primary">ایجاد محصول جدید</md-button>
    </div>
    <ProductList :products="products" />
  </appContainer>
</template>



<script>
// @ is an alias to /src
import appContainer from '@/layouts/Container.vue'

import ProductList from "../components/product/ProductList";
export default {
  name: "Products",
  components: {
    ProductList,
    appContainer
  },
  data(){
    return {
      products:[{
        title:'فورمه سبزی'
      },
      {
        title:'فورمه سبزی'
      },
      {
        title:'فورمه سبزی'
      },
      {
        title:'فورمه سبزی'
      },
      {
        title:'فورمه سبزی'
      },
      ]
    }
  }
 
};
</script>
