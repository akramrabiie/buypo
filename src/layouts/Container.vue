<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary">
        <md-button class="md-icon-button" @click="toggleMenu">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">BuyPo</span>
        <div class="md-toolbar-section-end" >
          خروج
          <md-button class="md-icon-button" @click="logout" >
            <md-icon>logout</md-icon>
          </md-button>
        </div>
      </md-app-toolbar>

      <md-app-drawer md-permanent="full" :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent drawer-head" md-elevation="0">
          <div class="drawer-image"></div>
          <span class="md-title">مرچنت</span>
        </md-toolbar>

        <md-list>
          <md-list-item to="/live-orders">
            <md-icon>move_to_inbox</md-icon>
            <span class="md-list-item-text">مشاهده لحظه ای سفارش ها</span>
          </md-list-item>

          <md-list-item to="/categories">
            <md-icon>list</md-icon>
            <span class="md-list-item-text">دسته بندی ها</span>
          </md-list-item>

          <md-list-item to="/products">
            <md-icon>fastfood</md-icon>
            <span class="md-list-item-text" >محصولات</span>
          </md-list-item>

          <md-list-item to="/orders">
            <md-icon>receipt_long</md-icon>
            <span class="md-list-item-text">سفارش ها</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <slot />
      </md-app-content>
    </md-app>
  </div>
</template>
<style lang="scss"  scoped>
.drawer-head {
  padding: 10px;
  .md-title {
    flex: 0 0 100%;
    width: 100%;
    padding: 16px;
    text-align: center;
  }
  .drawer-image {
    width: 100px;
    height: 100px;
    border-radius: 100%;
    margin: auto;
    background: rgb(243, 243, 243);
    display: block;
  }
}
.md-list-item-text{
  margin-right:10px;
}
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
import store from '../Store';
export default {
  name: "appContainer",
  data: () => ({
    menuVisible: false
  }),
  methods: {
    toggleMenu: () => {
      this.menuVisible = !this.menuVisible;
    },
    logout(){
      store.removeToken();
       this.$router.push('/login')
    }
  }
};
</script>