<template>
  <appContainer >
    <div class="md-layout">
      <h1>محصولات</h1>
      <md-button class="md-raised md-primary">ایجاد محصول جدید<md-icon>add</md-icon></md-button>
    </div>
    <ProductList :products="products" />
  </appContainer>
</template>



<script>
// @ is an alias to /src
import appContainer from '@/layouts/Container.vue'

import ProductList from "../components/product/ProductList";
import api from '../Api';
export default {
  name: "Products",
  components: {
    ProductList,
    appContainer
  },
  data(){
    return {
      products:[]
    }
  },
  created(){
    let page = 1;
   api.getList('Product', page).then(res=>{
     this.products = res.data;
   }, err=>{
     console.log(err)
   })
  },
  methods:{
    removeItem(id){
      debugger;
      api.removeItem('product', id).then(res=>{
        console.log(res);
      })
    }
  }
 
};
</script>
