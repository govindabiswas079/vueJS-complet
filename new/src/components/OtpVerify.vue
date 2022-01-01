<template>
  <div>
    <form v-on:submit.prevent="addItem()">
      <input
        type="text"
        class="form-control"
        v-model="myObject.fname"
        placeholder="F-Name"
      /><br />
      <input
        type="text"
        class="form-control"
        v-model="myObject.lname"
        placeholder="L-Name"
      /><br />
      <input
        type="text"
        class="form-control"
        v-model="myObject.email"
        placeholder="Email"
      /><br />
      <select
        className="form-control"
        name="Country"
        v-model="myObject.country"
      >
        <option>select country</option>
        <option value="India, +91">India</option>
        <option value="United States, +1">United States</option>
        <option value="United Kingdoms, +44">United Kingdoms</option></select
      ><br /><br />
      <input
        type="number"
        class="form-control"
        v-model="myObject.phoneNumber"
        placeholder="Mobile"
      /><br />
      <br />
      <masked-input
        class="form-control"
        v-model="myObject.number"
        mask="1111 1111 1111 1111"
        placeholder="Date"
      /><!--   -->
      <masked-input
        class="form-control"
        v-model="myObject.date"
        mask="11/11"
        placeholder="Date"
      />
      <masked-input
        class="form-control"
        v-model="myObject.snumber"
        mask="111"
        placeholder="Date"
      />
      <br />
      <div class="input-group mb-3">
        <input
          v-model="myObject.password"
          v-bind:type="[showPassword ? 'text' : 'password']"
          class="form-control"
          placeholder="Password"
        />
        <!-- <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
            @click="showPassword = !showPassword"
          /><br />
          <label className="form-check-label" htmlFor="exampleCheck1">{{
            showPassword ? "Hide Password" : "Show Password"
          }}</label>
        </div> -->
        <div class="input-group-append">
          <span class="input-group-text" @click="showPassword = !showPassword">
            <i
              class="bi"
              :class="[showPassword ? 'bi-eye-fill' : 'bi-eye-slash-fill']"
              aria-hidden="true"
            ></i>
          </span>
        </div>
      </div>
      <input type="submit" class="btn btn-primary" value="Add Item" />
    </form>

    <div>
      <vue-otp-box
        :numberOfBoxes="6"
        color="orange"
        position="center"
        @inputValue="inputValue"
      ></vue-otp-box>
    </div>
  </div>
</template>

<script>
import VueOtpBox from "vue-otp-box";
import "vue-otp-box/dist/VueOtpBox.css";
import MaskedInput from "vue-masked-input";

export default {
  setup() {
    return {};
  },

  components: {
    VueOtpBox,
    MaskedInput,
  },

  methods: {
    inputValue(otp) {
      this.otp = otp;
      console.log(this.otp);
      const getotp = sessionStorage.getItem("otp");
      if (this.otp === getotp) {
        setTimeout(() => {
          setTimeout(() => {
            console.log("match");
          }, 500);
        }, 1000);
      } else {
        setTimeout(() => {
          setTimeout(() => {
            console.log("not match");
          }, 500);
        }, 1000);
      }
    },

    addItem() {
      const ccode = this.myObject.country;
      const price = typeof ccode === "string" ? ccode.split(",")[0] : "";
      const price1 = typeof ccode === "string" ? ccode.split(",")[1] : "";

      var fobj = JSON.stringify({
        newObj: {
          FName: this.myObject.fname,
          LName: this.myObject.lname,
          Email: this.myObject.email,
          Country: price,
          Mobile: `${price1}${this.myObject.phoneNumber}`,
          Number: this.myObject.number.replace(/ /g, ""),
          Date: this.myObject.date,
          SNumber: this.myObject.snumber,
          Password: this.myObject.Password,
        },
      });
      console.log(fobj);
      localStorage.setItem("data", fobj);
    },
  },
  data() {
    return {
      myObject: {},
      otp: undefined,
      showPassword: false,
    };
  },
};
</script>