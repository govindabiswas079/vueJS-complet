<template>
  <div class="card m-3">
    <div class="card-body">
      <form method="post" v-on:submit.prevent="onSubmit" autocomplete="off">
        <div class="form-group col">
          <input type="hidden" v-model="datas.Id" class="form-control" />
        </div>
        <div style="display: flex" class="form-row">
          <div class="form-group col">
            <label>Title :</label>
            <select class="form-control" v-model="datas.Title">
              <option value="">select</option>
              <option value="Mr">Mr</option>
              <option value="Mrs">Mrs</option>
              <option value="Miss">Miss</option>
              <option value="Ms">Ms</option>
            </select>
          </div>

          <div style="margin: 0 5px" class="form-group col-5">
            <label>First Name :</label>
            <input type="text" class="form-control" v-model="datas.FirstName" />
          </div>
          <div class="form-group col-5">
            <label>Last Name :</label>
            <input type="text" class="form-control" v-model="datas.LastName" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col">
            <label>Country :</label>
            <select type="text" class="form-control" v-model="getCountry">
              <option value="">select country</option>
              <option value="India, +91">India</option>
              <option value="United States, +1">United States</option>
              <option value="United Kingdoms, +44">United Kingdoms</option>
            </select>
          </div>

          <div class="form-group col">
            <label>Mobile :</label>
            <input type="text" class="form-control" v-model="getNumber" />
          </div>
          <div class="form-group col">
            <label>Date of Birth :</label>
            <input type="date" class="form-control" v-model="datas.Dob" />
          </div>

          <div class="form-group col">
            <label>Url :</label>
            <input type="url" class="form-control" v-model="datas.Url" />
          </div>

          <div class="form-group col">
            <label>Email :</label>
            <input type="text" class="form-control" v-model="datas.Email" />
          </div>

          <div class="form-group col">
            <label>Credit Card Number :</label>
            <masked-input class="form-control" v-model="datas.cardNumber" mask="1111 1111 1111 1111"/>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group col">
            <label>Password :</label>
            <div class="input-group">
              <input v-bind:type="[showPassword ? 'text' : 'password']" class="form-control" v-model="datas.Password"/>
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
              <input v-bind:type="[showConfirmPassword ? 'text' : 'password']" class="form-control" v-model="datas.ConfirmPassword"/>
              <div class="input-group-append">
                <span style="cursor: pointer" class="input-group-text" @click="showConfirmPassword = !showConfirmPassword">
                  <i class="bi" :Class="[showConfirmPassword ? 'bi-eye-fill' : 'bi-eye-slash-fill']" aria-hidden="true"></i>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="form-group col">
          <input type="hidden" v-model="datas.Device_uuid" class="form-control"/>
        </div>
        <div class="form-group col">
          <input type="hidden" v-model="datas.browser_version" class="form-control"/>
        </div>
        <div class="form-group col">
          <input type="hidden" v-model="datas.IpAddress" class="form-control" />
        </div>

        <br />
        <div class="text-center">
          <button class="btn btn-primary mr-1">Register</button>
        </div>
      </form>
    </div>
  </div>
</template>

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
      datas: {},
      dataValue: {},
      deviceId: {},
      getNumber: {},
      getCountryCode: {},
      getCountry: {},
      showPassword: false,
      showConfirmPassword: false,
    };
  },
  mounted() {
    const myId = uuid.v4();
    this.deviceId = myId;
    this.getData();
    this.getIp();
  },

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

    getData() {
      let uri = `http://localhost:1943/infouser/get/${this.$route.params.id}`;
      let headers = { "content-Type": "application/json" };

      this.axios
        .post(uri, headers)
        .then((response) => {
          const NewObject = Object.assign({}, ...response.data);
          this.datas = NewObject;

          const phoneNumber = NewObject.Mobile;
          const countryCodeLength = phoneNumber.length - 10;
          const components = {
            IDDCC: phoneNumber.substr(0, countryCodeLength),
            NN: phoneNumber.substr(countryCodeLength, phoneNumber.length),
          };
          this.getNumber = components.NN;
          this.getCountryCode = components.IDDCC;
          this.getCountry = `${NewObject.Country}, +${this.getCountryCode}`;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    onSubmit() {
      const address = sessionStorage.getItem("ipAdd");
      const ccode = this.getCountry;
      const price = typeof ccode === "string" ? ccode.split(",")[0] : "";
      const price1 = typeof ccode === "string" ? ccode.split(",")[1] : "";
      console.log("code", ccode);

      const object = {
        Title: this.datas.Title,
        FirstName: this.datas.FirstName,
        LastName: this.datas.LastName,
        Country: `${price}`,
        Mobile: `${price1}${this.getNumber}`,
        Dob: this.datas.Dob,
        Url: this.datas.Url,
        Email: this.datas.Email,
        Password: this.datas.Password,
        Device_uuid: this.deviceId,
        browser_version: this.$device.browser_version,
        IpAddress: `${address}`,
        cardNumber: this.datas.cardNumber.replace(/ /g, ""),
      };
      console.log(object);
      let uri = `http://localhost:1943/infouser/update/${this.$route.params.id}`;
      let headers = { "content-Type": "application/json" };

      this.axios
        .put(uri, object, headers)
        .then((response) => {
          // this.$router.push({ name: "Show" });
          return response;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
