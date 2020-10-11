<template>
  <appContainer>

    <div>
      <ProductDetails :categories="categories"/>
    </div>
  </appContainer>
</template>



<script>
// @ is an alias to /src
import appContainer from "@/layouts/Container.vue";
import ProductDetails from '../components/product/ProductDetails';
import Api from '../Api';
//import api from '../Api';


export default {
  name: "EditProduct",
  components: {
    appContainer,
    ProductDetails
  },
  data(){
    return {
      categories : []
    }
  },
  created(){
    Api.getList('Category').then(data=>{
      this.categories = data.data
    });
  }

};
</script>
