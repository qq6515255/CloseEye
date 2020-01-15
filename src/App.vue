<template>
  <div id="app">
    <transition
      mode="out-in"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <keep-alive>
        <router-view class="animated" animate-duration=".1s" />
      </keep-alive>
    </transition>
  </div>
</template>
<script>
// import { mapState } from 'vuex'

export default {
  computed: {}
};
</script>
<style>
.animated {animation-duration: 0.5s;}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #1a1a1a;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
