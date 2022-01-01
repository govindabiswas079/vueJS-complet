<script>
import MaskedInput from "vue-masked-input";
import * as uuid from "uuid";

export default {
  components: {
    MaskedInput,
  },
  setup() {},
  data() {
    return {
      myObject: {},
      deviceId: {},
      showPassword: false,
      showConfirmPassword: false,
      loadings: false
    };
  },

  mounted() {
    const myId = uuid.v4();
    this.deviceId = myId;
    this.getIp();
  },

  // created: function () {},

  methods: {
    getIp() {
      this.axios
        .get("https://api.ipify.org/?format=json")
        .then(function (response) {
          sessionStorage.setItem("ipAdd", response.data.ip);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    onSubmit() {
      this.loadings = true;
      const address = sessionStorage.getItem("ipAdd");
      const ccode = this.myObject.Country;
      const price = typeof ccode === "string" ? ccode.split(",")[0] : "";
      const price1 = typeof ccode === "string" ? ccode.split(",")[1] : "";

      var Object = {
        Title: this.myObject.Title,
        FirstName: this.myObject.FirstName,
        LastName: this.myObject.LastName,
        Country: `${price}`,
        Mobile: `${price1}${this.myObject.Mobile}`,
        Dob: this.myObject.Dob,
        Url: this.myObject.Url,
        Email: this.myObject.Email,
        Password: this.myObject.Password,
        Device_uuid: this.deviceId,
        browser_version: this.$device.browser_version,
        IpAddress: `${address}`,
        cardNumber: this.myObject.cardNumber.replace(/ /g, ""),
      };
      
      let uri = "http://localhost:1943/infouser/ad";
      let headers = { "content-Type": "application/json" };

      this.axios
        .post(uri, Object, headers)
        .then((Response) => {
          if (Response.status === 200) {
            this.$router.push({ name: "Show" });
          } else {
            alert("faileld");
          }
        })
        .catch((error) => {
          console.log(error);
          // this.$swal("error")
          //return error;
        });
    },

    isNumber: function(evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
  },
};
</script>

<template :someProp="loadings">
  <div class="card m-3">
    <div class="card-body">
      <form method="post" v-on:submit.prevent="onSubmit" autocomplete="off">
        <div style="display: flex" class="form-row">
          <div class="form-group col">
            <label>Title :</label>
            <select class="form-control" v-model="myObject.Title">
              <option value="">select</option>
              <option value="Mr">Mr</option>
              <option value="Mrs">Mrs</option>
              <option value="Miss">Miss</option>
              <option value="Ms">Ms</option>
            </select>
          </div>

          <div style="margin: 0 5px" class="form-group col-5">
            <label>First Name :</label>
            <input type="text" class="form-control" v-model="myObject.FirstName"/>
          </div>
          <div class="form-group col-5">
            <label>Last Name :</label>
            <input type="text" class="form-control" v-model="myObject.LastName"/>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col">
            <label>Country :</label>
              <select type="text" class="form-control" v-model="myObject.Country">
              <option value="">select country</option>
              <option value="India, +91">India</option>
              <option value="United States, +1">United States</option>
              <option value="United Kingdoms, +44">United Kingdoms</option>
            </select>
          </div>

          <div class="form-group col">
            <label>Mobile :</label>
            <input type="text" class="form-control" maxlength="10" @keypress="isNumber($event)" v-model="myObject.Mobile"/>
          </div>
          <div class="form-group col">
            <label>Date of Birth :</label>
            <input type="date" class="form-control" v-model="myObject.Dob"/>
          </div>

          <div class="form-group col">
            <label>Url :</label>
            <input type="url" class="form-control" v-model="myObject.Url"/>
          </div>

          <div class="form-group col">
            <label>Email :</label>
            <input type="text" class="form-control" v-model="myObject.Email"/>
          </div>

          <div class="form-group col">
            <label>Credit Card Number :</label>
            <masked-input class="form-control" v-model="myObject.cardNumber" mask="1111 1111 1111 1111"/>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group col">
            <label>Password :</label>
            <div class="input-group">
              <input v-bind:type="[showPassword ? 'text' : 'password']" class="form-control" v-model="myObject.Password"/>
              <div class="input-group-append">
                <span style="cursor: pointer" class="input-group-text" @click="showPassword = !showPassword">
                  <i class="bi" :Class="[showPassword ? 'bi-eye-fill' : 'bi-eye-slash-fill']" aria-hidden="true"></i>
                </span>
              </div>
            </div>
          </div>

          <div class="form-group col">
            <label>Confirm Password :</label>
            <div class="input-group">
              <input v-bind:type="[showConfirmPassword ? 'text' : 'password']" class="form-control" v-model="myObject.ConfirmPassword"/>
              <div class="input-group-append">
                <span style="cursor: pointer" class="input-group-text" @click="showConfirmPassword = !showConfirmPassword">
                  <i class="bi" :Class="[showConfirmPassword ? 'bi-eye-fill' : 'bi-eye-slash-fill']" aria-hidden="true"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div class="text-center">
          <button class="btn btn-primary mr-1">Register</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.loader {
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background: url('//upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Phi_fenomeni.gif/50px-Phi_fenomeni.gif')
  50% 50% no-repeat #ffffff6b /* rgba(255, 255, 255, 0.596) */;
}
</style>