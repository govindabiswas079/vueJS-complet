<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">vue</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'Create' }">Create</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'Show' }">Show</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'OtpVerify' }">OtpVerify</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <transition name="fade">
      <div class="gap">
        <router-view></router-view>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>
