<template>
   <appContainer :page="'categories'">
    <h1>لیست دسته بندی ها</h1>
  </appContainer>
</template>
<script>
import appContainer from '../layouts/Container';
export default {
    name :'Categories',
    components:{
        appContainer
    }
}
</script>