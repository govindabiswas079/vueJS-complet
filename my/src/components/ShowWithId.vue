<template>
  <div>
    <div class="row">
      <div class="col s12">
        <div class="card">
          <div class="card-content white-text">
            <div class="row">
              <div style="justify-content: center" class="col s7">
                <div class="card" style="width: 18rem">
                  <div class="card-header">Featured</div>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                      <span style=" color: blue; font-weight: 800; text-transform: uppercase;">ID :</span>
                      {{ datas.Id }}
                    </li>
                    <li class="list-group-item">
                      <span
                        style=" color: blue; font-weight: 800; text-transform: uppercase;">Name :</span>
                      {{ datas.FirstName }} {{ datas.LastName }}
                    </li>
                    <li class="list-group-item">
                      <span style=" color: blue; font-weight: 800; text-transform: uppercase;">Email :</span>
                      {{ datas.Email }}
                    </li>
                    <li class="list-group-item">
                      <span  style=" color: blue; font-weight: 800; text-transform: uppercase;">Website URL :</span>
                      {{ datas.Url }}
                    </li>
                    <li class="list-group-item">
                      <span style=" color: blue; font-weight: 800; text-transform: uppercase;">Country :</span>
                      {{ datas.Country }}
                    </li>
                    <li class="list-group-item">
                      <span style=" color: blue; font-weight: 800;  text-transform: uppercase;">Mobile :</span>
                      {{ datas.Mobile }}
                    </li>
                    <li class="list-group-item">
                      <span
                        style=" color: blue; font-weight: 800; text-transform: uppercase;">DOB :</span>
                      {{ datas.Dob }}
                    </li>
                    <li class="list-group-item">
                      <span
                        style=" color: blue; font-weight: 800; text-transform: uppercase;">Create Date :</span>
                      {{(new Date(datas.currentDate)).toLocaleString()}}
                    </li>
                    <li class="list-group-item">
                      <span style=" color: blue; font-weight: 800; text-transform: uppercase;">Card Number :</span>
                      {{this.myCardNumber}}
                    </li>
                    <li class="list-group-item">
                      <router-link :to="{ name: 'Update', params: { Id: datas.Id } }" class="btn btn-primary">Edit</router-link>

                      <button style="margin-left: 8px" class="btn btn-danger" v-on:click="deleteData(datas.Id)">
                        Delete
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  },
  setup() {},
  data() {
    return {
      datas: {},
      myCardNumber: {},
    };
  },

  mounted() {
    this.getWithId();
  },

  methods: {
    getWithId() {
      let uri = `http://localhost:1943/infouser/get/${this.$route.params.id}`;
      let headers = { "Content-Type": "application/json" };

      this.axios
        .post(uri, headers)
        .then((response) => {
          const newObject = Object.assign({}, ...response.data);
          this.datas = newObject;
          this.myCardNumber = this.datas.cardNumber.replace(/^(.{4})(.{4})(.{4})(.*)$/, "$1 $2 $3 $4")
        })
        .catch((error) => {
          return error
        });
    },

    deleteData(id) {
      let uri = `http://localhost:1943/infouser/delete/${id}`;
      let headers = { "Content-Type": "application/json" };

      this.axios
        .delete(uri, headers)
        .then((response) => {
          this.$router.push({ name: "Show" });
          return response;
        })
        .catch((error) => {
          return error
        });
    },
  },
};
</script>
