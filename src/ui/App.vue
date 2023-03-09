<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import {ref, computed, onMounted} from "vue";
import {useStore} from "vuex";

const store = useStore();

const getJoke = computed(() => store.state['Articles']);

onMounted(async () => {
  await store.dispatch('Articles/getArticles');
})

</script>

<template>
<!--  <div>-->
<!--    <h1>Demo for Articles</h1>-->
<!--    <p v-if="getJoke.error">Error: {{getJoke.error}}</p>-->
<!--    <p v-else-if="getJoke.loading">Loading....</p>-->
<!--    <p v-else>{{getJoke.articles}}</p>-->
  <HelloWorld msg="" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
