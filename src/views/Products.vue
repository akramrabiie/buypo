<template>
  <appContainer>
    <div class="md-layout">
      <!-- <div class="md-layout-item md-size-0"></div> -->
      <md-button class="md-raised md-primary " to="/products/new"
            >ایجاد محصول جدید<md-icon>add</md-icon></md-button
          >
          <br />
          <br />
    </div>
    
    <md-card class="md-layout-item md-size-70 md-small-size-100">
      <md-card-header>
        <div class="md-layout">
          محصولات
          <h1 class="md-layout-item md-size-75"></h1>
          
        </div>
      </md-card-header>

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
    </md-card>
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
