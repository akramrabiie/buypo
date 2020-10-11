<template>
  <form
    novalidate
    class="md-layout"
    @submit.prevent="validateData"
    @submit="saveProduct"
  >
    <md-card class="md-layout-item md-size-70 md-small-size-100">
      <md-card-header>{{ productActionText }} محصول </md-card-header>

      <md-card-content>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100">
            <md-field :class="getValidationClass('name')">
              <label for="first-name">نام محصول</label>
              <md-input
                name="first-name"
                id="first-name"
                autocomplete="given-name"
                v-model="form.name"
                :disabled="sending"
              />
              <span class="md-error" v-if="!$v.form.name.required"
                >این فیلد ضروری است.</span
              >
              <span class="md-error" v-else-if="!$v.form.name.minlength"
                >نام معتبر نیست.</span
              >
            </md-field>

            <md-field :class="getValidationClass('category')">
              <label for="category">دسته بندی</label>
              <md-select
                name="category"
                id="category"
                v-model="form.category"
                md-dense
                :disabled="sending"
              >
                <md-option
                  v-for="cat in categories"
                  :key="cat.id"
                  :value="cat.id"
                  @md-selected="categorySelected"
                  >{{ cat.name }}</md-option
                >
              </md-select>

              <span class="md-error">دسته بندی محصول باید انتخاب گردد.</span>
            </md-field>
            <md-field :class="getValidationClass('price')">
              <label for="price">قیمت</label>
              <md-input
                name="price"
                id="price"
                type="number"
                autocomplete="family-name"
                v-model="form.price"
                :disabled="sending"
              />
              <span class="md-error" v-if="!$v.form.price.required"
                >The last name is required</span
              >
              <span class="md-error" v-else-if="!$v.form.price.minlength"
                >Invalid last name</span
              >
            </md-field>
            <md-field :class="getValidationClass('content')">
              <label for="content">محتویات</label>
              <md-input
                type="text"
                id="content"
                name="content"
                autocomplete="content"
                v-model="form.content"
                :disabled="sending"
              />
              <span class="md-error" v-if="!$v.form.content.minLength"
                >تعداد کارکتر توضیحات باید بیشتر از 4 کارکتر باشد.</span
              >
            </md-field>
            <md-field :class="getValidationClass('desc')">
              <label for="desc">توضیحات</label>
              <md-textarea
                type="text"
                name="desc"
                id="desc"
                autocomplete="desc"
                v-model="form.desc"
                :disabled="sending"
              >
              </md-textarea>
            </md-field>
            <md-field :class="getValidationClass('remain')">
              <label for="remain">موجودی</label>
              <md-input
                type="number"
                name="desc"
                id="remain"
                autocomplete="remain"
                v-model="form.remain"
                :disabled="sending"
              />
              <span class="md-error" v-if="!$v.form.remain.required"
                >موجودی باید وارد شود.</span
              >
            </md-field>
            <div>
              <md-checkbox
                v-model="form.active"
                :disabled="sending"
                class="md-primary"
              >
                فعال
              </md-checkbox>
            </div>
          </div>

          <div class="md-layout-item md-small-size-100">
            <md-card class="image-box">
              <img
                v-if="!selectedImage"
                src="../../assets/food_default.png"
                style="width:100%; height:100%"
              />
              <img
                v-if="selectedImage"
                :src="'https://buypo.idco.xyz/' + selectedImage"
                style="width:100%; height:100%"
              />
              <div class="change-image-cover" @click="$refs.fileInput.click()">
                <md-button
                  type="button"
                  class="md-raised md-secondary change-image-button"
                  :disabled="sending"
                  >انتخاب تصویر</md-button
                >
              </div>
              <input
                type="file"
                id="imageFile"
                @change="readImageURL"
                ref="fileInput"
              />
            </md-card>
          </div>
        </div>

        <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100"></div>

          <div class="md-layout-item md-small-size-100"></div>
        </div>
      </md-card-content>

      <md-progress-bar md-mode="indeterminate" v-if="sending" />

      <md-card-actions>
        <md-button
          type="submit"
          class="md-raised md-primary"
          :disabled="sending"
          >ثبت اطلاعات</md-button
        >
      </md-card-actions>
    </md-card>

    <md-snackbar style="margin-bottom: 20px;" :md-active.sync="itemSaved">
      {{ submitMsg }}</md-snackbar
    >
  </form>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
import Api from "../../Api";

export default {
  name: "ProductDetails",
  mixins: [validationMixin],
  props: ["categories"],
  created() {
    this.productActionText = "ایجاد";
    if (this.$route.params.id) {
      this.productActionText = "ویرایش";
      this.productId = this.$route.params.id;

      Api.getOne("Product", this.productId).then((data) => {
        const product = data.data;

        this.form = {
          name: product.name,
          category: product.category.id,
          desc: product.desc_long,
          price: product.price,
          remain: product.remain,
          content: product.desc_short,
          active: product.status ? true : false,
        };
        this.selectedImage = product.image;
      });
    }
  },
  data: () => ({
    productActionText: "",
    form: {
      name: "تست غذا " + parseInt(Math.random() * 100),
      category: 42,
      price: 200,
      desc: "لورم ایپسوم تست برای توضیحات محصول",
      content: "لورم ایپسوم تست برای محتویات",
      remain: 1,
      active: null,
    },
    itemSaved: false,
    sending: false,
    submitMsg: null,
    selectedImage: "../../assets/food_default.png",
  }),
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(3),
      },
      category: {
        required,
      },
      content: {
        required,
        minLength: minLength(4),
      },
      price: {
        required,
      },
      desc: {},
      active: {},
      remain: {},
    },
  },
  methods: {
    getImageUrl() {
      return this.selectedImage;
    },
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty,
        };
      }
    },
    clearForm() {
      this.$v.$reset();
      this.form.name = null;
      this.form.category = null;
      this.form.content = null;
      this.form.price = null;
      this.form.desc = null;
      this.form.remain = 1;
      this.form.active = null;
    },
    saveProduct() {
      this.sending = true;

      let formData = new FormData();
      let fileElem = document.getElementById("imageFile");
      let file = fileElem.files[0];

      if (file) {
        formData.append("file", file);

        Api.saveImage(formData).then(
          (data) => {
            debugger;
            console.log(data);
            debugger;
            let image = data.data.url;
            this.selectedImage = image;
            this.finalSave();
          },
          () => {
            this.finalSave();
          }
        );
      }else {
        this.finalSave();
      }
    },
    finalSave() {
      const data = {
        name: this.form.name,
        price: parseInt(this.form.price),
        desc_short: this.form.content,
        desc_long: this.form.desc,
        remain: parseInt(this.form.remain),
        status: this.form.active ? 1 : 0,
        image: this.selectedImage,
        category: "api/categories/" + this.form.category,
      };

      if (this.productId) {
        Api.updateForId("Product", this.productId, data).then(
          (data) => {
            this.submitMsg = `محصول ${data.data.name} با موفقیت ثبت شد :)`;
            this.itemSaved = true;
            this.sending = false;
            // this.clearForm();
          },
          () => {
            this.sending = false;
            this.submitMsg = `خطایی رخ داده است.`;
            this.itemSaved = true;
          }
        );
      } else {
        Api.createNew("Product", data).then(
          (data) => {
            this.submitMsg = `محصول ${data.data.name} با موفقیت ثبت شد :)`;
            this.itemSaved = true;
            this.sending = false;
            // this.clearForm();
          },
          () => {
            this.sending = false;
            this.submitMsg = `خطایی رخ داده است.`;
            this.itemSaved = true;
          }
        );
      }
    },
    validateData() {
      //this.$v.$touch();

      if (!this.$v.$invalid) {
        this.saveProduct();
      }
    },
    categorySelected(event) {
      console.log(event);
    },
    readImageURL(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
          this.selectedImage = e.target.result;
          console.log(this.selectedImage);
        };

        reader.readAsDataURL(input.files[0]);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.image-box {
  width: 90%;
  height: 480px;
  position: relative;
  .change-image-cover {
    position: absolute;
    width: 98%;
    height: 98%;
    border: 1px dashed #bcbcbc;
    top: 0;
    left: 0;
    margin: 4px;
    &:hover {
      background: rgba(1, 1, 1, 0.05);
      cursor: pointer;
    }
    .change-image-button {
      position: absolute;
      left: 0;
    }
  }
  #imageFile {
    display: none;
  }
}
</style>
