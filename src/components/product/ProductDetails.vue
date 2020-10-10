<template>
  <form
    novalidate
    class="md-layout"
    @submit.prevent="validateUser"
    @submit="saveProduct"
  >
    <md-card class="md-layout-item md-size-70 md-small-size-100">
      <md-card-header> </md-card-header>

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
                  >{{ cat.name }}</md-option
                >
              </md-select>
              <span class="md-error">دسته بندی محصول باید انتخاب گردد.</span>
            </md-field>
            <md-field :class="getValidationClass('lastName')">
              <label for="last-name">قیمت</label>
              <md-input
                name="last-name"
                id="last-name"
                autocomplete="family-name"
                v-model="form.lastName"
                :disabled="sending"
              />
              <span class="md-error" v-if="!$v.form.lastName.required"
                >The last name is required</span
              >
              <span class="md-error" v-else-if="!$v.form.lastName.minlength"
                >Invalid last name</span
              >
            </md-field>
            <md-field :class="getValidationClass('age')">
              <label for="age">محتویات</label>
              <md-input
                type="text"
                id="age"
                name="age"
                autocomplete="age"
                v-model="form.age"
                :disabled="sending"
              />
              <span class="md-error" v-if="!$v.form.age.required"
                >The age is required</span
              >
              <span class="md-error" v-else-if="!$v.form.age.maxlength"
                >Invalid age</span
              >
            </md-field>
            <md-field :class="getValidationClass('email')">
              <label for="email">توضیحات</label>
              <md-input
                type="text"
                name="desc"
                id="email"
                autocomplete="email"
                v-model="form.email"
                :disabled="sending"
              />
              <span class="md-error" v-if="!$v.form.email.required"
                >The email is required</span
              >
              <span class="md-error" v-else-if="!$v.form.email.email"
                >Invalid email</span
              >
            </md-field>
            <md-field :class="getValidationClass('email')">
              <label for="email">موجودی</label>
              <md-input
                type="text"
                name="desc"
                id="email"
                autocomplete="email"
                v-model="form.email"
                :disabled="sending"
              />
              <span class="md-error" v-if="!$v.form.email.required"
                >The email is required</span
              >
              <span class="md-error" v-else-if="!$v.form.email.email"
                >Invalid email</span
              >
            </md-field>
            <md-field :class="getValidationClass('email')">
              <label for="email">فعال</label>
              <md-input
                type="text"
                name="desc"
                id="email"
                autocomplete="email"
                v-model="form.email"
                :disabled="sending"
              />
              <span class="md-error" v-if="!$v.form.email.required"
                >The email is required</span
              >
              <span class="md-error" v-else-if="!$v.form.email.email"
                >Invalid email</span
              >
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100"></div>
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
          >ایجاد محصول</md-button
        >
      </md-card-actions>
    </md-card>

    <md-snackbar :md-active.sync="userSaved"
      >The user {{ lastUser }} was saved with success!</md-snackbar
    >
  </form>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";
import Api from "../../Api";

export default {
  name: "ProductDetails",
  mixins: [validationMixin],
  props: ["categories"],
  data: () => ({
    form: {
      name: null,
      lastName: null,
      category: null,
      age: null,
      email: null,
    },
    userSaved: false,
    sending: false,
    lastUser: null,
    categories: [],
  }),
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(3),
      },
      lastName: {
        required,
        minLength: minLength(3),
      },
      age: {
        required,
        maxLength: maxLength(3),
      },
      category: {
        required,
        default: () => {
          return [];
        },
      },
      email: {
        required,
        email,
      },
    },
  },
  methods: {
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
      this.form.lastName = null;
      this.form.age = null;
      this.form.category = null;
      this.form.email = null;
    },
    saveProduct() {
      debugger;

      this.sending = true;

      // Instead of this timeout, here you can call your API
      const data = {
        name: "product name",
        price: 0,
        desc_short: "short description",
        desc_long: "long description",
        remain: 0,
        status: 0,
        image: "image.jpg",
        category: "اصفهان",
      };
      Api.createNew("Product", data);
      window.setTimeout(() => {
        this.lastUser = `${this.form.name} ${this.form.lastName}`;
        this.userSaved = true;
        this.sending = false;
        this.clearForm();
      }, 1500);
    },
    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.saveProduct();
      }
    },
  },
};
</script>
