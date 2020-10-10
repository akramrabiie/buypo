<template>
  <md-list-item class="md-layout-item">
    <md-avatar>
      <img :src="'https://buypo.idco.xyz/' + product.image" alt="People" />
    </md-avatar>

    <div class="md-list-item-text">{{ product.name }}</div>

    <md-button class="md-icon-button md-list-action">
      <md-icon class="md-primary">edit</md-icon>
    </md-button>
    <md-button class="md-icon-button md-list-action">
      <md-icon class="md-primary">remove_red_eye</md-icon>
    </md-button>
    <md-button
      class="md-icon-button md-list-action"
      @click="$emit('remove', product.id)"
    >
      <md-icon class="md-primary">delete</md-icon>
    </md-button>
  </md-list-item>
</template>
<script>
export default {
  name: "Product",
  props: ["product"],
};
</script>
<style>
.md-list-item-text {
  padding-right: 10px;
}
</style>
