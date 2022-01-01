<template>
  <div>
    <h4>Data</h4>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Card No.</th>
          <th scope="col">Mobile</th>
          <th scope="col">Dob</th>
          <th scope="col">Date</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="data in datas" :key="data.Id" >
          <td>{{data.FirstName}} {{data.LastName}}</td>
          <td>{{data.Email}}</td>
          <td>{{data.cardNumber.split(/(\d{4})/).join(' ').trim()}}</td>
          <td>{{data.Mobile}}</td>
          <td>{{data.Dob}}</td>
          <td>{{(new Date(data.currentDate)).toLocaleString()}}</td>
          <td>
            <router-link :to="{name: 'ShowWithId', params: {id: data.Id}}" class="btn btn-primary">Show</router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  setup() {},
  data() {
    return {
      datas: [],
    };
  },
  mounted() {
    this.getDatas();
  },

  methods: {
    getDatas() {
      let URL = "http://localhost:1943/infouser/getuser";
      let headers = {"content-Type": "application/json"}

      this.axios
        .get(URL, headers)
        .then((response) => {
          this.datas = response.data;
        })
        .catch((error) => {
          return error;
        });
    },
  },
};
</script>
