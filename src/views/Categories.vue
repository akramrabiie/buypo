<template>
  <appContainer  :page="'categories'">
    <div class="md-layout">
      <h1>لیست دسته بندی ها</h1>
      <md-button class="md-raised md-primary" to="/products/new"
        >ایجاد دسته بندی جدید<md-icon>add</md-icon></md-button
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
  </appContainer>
</template>

<script>
// @ is an alias to /src
import appContainer from "@/layouts/Container.vue";

import ProductList from "../components/product/ProductList";
import api from "../Api";
export default {
  name: "Categories",
  components: {
    ProductList,
    appContainer,
  },
  data() {
    return {
      products: [],
      loading: false,
    };
  },
  created() {
    let page = 1;
    this.loading = true;
    api.getList("Category", page).then(
      (res) => {
        this.loading = false;
        this.products = res.data;
      },
      (err) => {
        this.loading = false;
        console.log(err);
      }
    );
  },
  methods: {
    removeItem(id) {
      api.removeForId("Product", id).then(
        (res) => {
          alert(res);
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },
};
</script>
