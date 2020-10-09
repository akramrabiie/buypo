<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary">
        <md-button class="md-icon-button" @click="toggleMenu">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">BuyPo</span>
      </md-app-toolbar>

      <md-app-drawer md-permanent="full" :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="0">
          <br />
          <br />
          <br />مرچنت
          <br />
          <br />
        </md-toolbar>

        <md-list>
          <md-list-item to="/components/list">
            <md-icon>move_to_inbox</md-icon>
            <span class="md-list-item-text">مشاهده لحظه ای سفارش ها</span>
          </md-list-item>

          <md-list-item to="/components/list">
            <md-icon>send</md-icon>
            <span class="md-list-item-text">دسته بندی ها</span>
          </md-list-item>

          <md-list-item to="/components/list">
            <md-icon>delete</md-icon>
            <span class="md-list-item-text">محصولات</span>
          </md-list-item>

          <md-list-item to="/components/list">
            <md-icon>error</md-icon>
            <span class="md-list-item-text">سفارش ها</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <div class="md-layout">
          <h1>محصولات</h1>
          <md-button class="md-raised md-primary">ایجاد محصول جدید</md-button>
        </div>
        <Prductist />
      </md-app-content>
    </md-app>
  </div>
</template>

<style   scoped>
.md-app {
  height: 100vh;
  border: 1px solid rgba(#000, 0.12);
}

.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}
</style>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

import Prductist from "../components/product/ProductList";
export default {
  name: "Products",
  components: {
    Prductist
  },
  data: () => ({
    menuVisible: false
  }),
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    }
  }
};
</script>
