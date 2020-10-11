<template>
  <appContainer>
    <div class="md-layout">
      <h1>محصولات</h1>
      <md-button class="md-raised md-primary" to="/products/new"
        >ایجاد محصول جدید<md-icon>add</md-icon></md-button
      >
    </div>
    <md-progress-spinner
      v-if="loading"
      class="md-primary"
      md-mode="indeterminate"
      :md-diameter="30"
      :md-stroke="3"
    ></md-progress-spinner>
    <ProductList
      :products="products"
      v-if="!loading"
      @removeitem="removeItem"
    />
    <md-snackbar style="margin-bottom: 20px;" :md-active.sync="requestEnded">
      {{ msg }}</md-snackbar
    >
  </appContainer>
</template>

<script>
// @ is an alias to /src
import appContainer from "@/layouts/Container.vue";

import ProductList from "../components/product/ProductList";
import api from "../Api";
export default {
  name: "Products",
  components: {
    ProductList,
    appContainer,
  },
  data() {
    return {
      products: [],
      loading: false,
      requestEnded: false,
      msg: "",
    };
  },
  created() {
    let page = 1;
    this.loading = true;
    api.getList("Product", page).then(
      (res) => {
        this.loading = false;
        this.products = res.data;
      },
      () => {
        this.loading = false;
        
      }
    );
  },
  methods: {
    removeItem(id) {
      api.removeForId("Product", id).then(
        () => {
          this.msg = "محصول مورد نظر حذف شد :)";
          this.requestEnded = true;
        },
        () => {
          this.msg = "خطایی رخ داده است :(";
          this.requestEnded = true;
          setTimeout(() => {
            this.requestEnded = false;
          }, 2000);
        }
      );
    },
  },
};
</script>
