<template>
  <md-list-item class="md-layout-item">
    <md-avatar>
      <img :src="'https://buypo.idco.xyz/' + product.image" alt="People" />
    </md-avatar>

    <div class="md-list-item-text">{{ product.name }}</div>

    <md-button
      class="md-icon-button md-list-action"
      :to="'/products/edit-product/' + product.id"
    >
      <md-icon class="md-primary">edit</md-icon>
    </md-button>
    <md-button class="md-icon-button md-list-action" @click="editBtnPressed">
      <md-icon class="md-primary">remove_red_eye</md-icon>
    </md-button>
    <md-button
      class="md-icon-button md-list-action"
      @click="$emit('remove', product.id)"
    >
      <md-icon class="md-primary">delete</md-icon>
    </md-button>
    <md-snackbar style="margin-bottom: 20px;" :md-active.sync="editPressed">
      این گزینه در واقع گزینه ویرایش هست :)</md-snackbar
    >
  </md-list-item>
</template>
<script>
export default {
  name: "Product",
  props: ["product"],
  data() {
    return {
      editPressed: false,
    };
  },
  methods: {
    editBtnPressed() {
      this.editPressed = true;
      setTimeout(() => {
        this.editPressed = false;
      }, 5000);
    },
  },
};
</script>
<style>
.md-list-item-text {
  padding-right: 10px;
}
</style>
