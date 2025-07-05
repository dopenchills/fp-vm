<template>
  <div>
    <SimpleCounter />
    <TweetComponent />
  </div>
</template>

<script setup lang="ts">
import SimpleCounter from './features/counter/views/SimpleCounter.vue';
import TweetComponent from './features/tweet/views/TweetComponent.vue';
</script>
