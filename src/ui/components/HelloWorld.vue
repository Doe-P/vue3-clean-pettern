<script setup lang="ts">
import { ref, computed } from 'vue'
import {useStore} from "vuex";

const store = useStore();


const jokeResult = computed(() => store.state['Joke']);


const randomJoke = () => {
  store.dispatch('Joke/randomJoke');
}

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1>Joke Demo</h1>
 <div class="container">
   <div class="card">
     <div class="content">
       <p v-if="jokeResult.loading" class="loading">Loading...</p>
       <p v-else-if="jokeResult.error">Error: {{jokeResult.error}} </p>
      <div v-else class="joke-content" v-show="jokeResult.joke">
        <p class="question">A: {{jokeResult.joke.setup}}</p>
        <p class="answer">B: {{jokeResult.joke.punchline}}</p>
      </div>
     </div>
     <button type="button" class="btn-random-joke" @click="randomJoke"> Random Joke</button>
   </div>
 </div>

</template>

<style scoped>
.container{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.content{
  width: 800px;
  height: 400px;
  background-color: #1a1a1a;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn-random-joke{
  margin: 15px 0;
  background-color: #535bf2;
  color: #fff;
}

.answer{
  font-size: 14px;
  font-style: italic;
  color: #535bf2;
}

.joke-content{
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
