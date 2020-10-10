<template>
  <appContainer >
    <div class="md-layout">
      <h1>محصولات</h1>
      <md-button class="md-raised md-primary" to="/products/new">ایجاد محصول جدید<md-icon>add</md-icon></md-button>
    </div>
     <md-progress-spinner v-if="!products.length" class="md-primary" md-mode="indeterminate" :md-diameter="30" :md-stroke="3"></md-progress-spinner>
    <ProductList :products="products" v-if="products" @removeitem="removeItem" />
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
      api.removeForId('Product', id).then(res=>{
       alert(res);
      },
      err=>{
        console.log(err)
      })
    }
  }
 
};
</script>
