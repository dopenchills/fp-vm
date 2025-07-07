<template>
  <div>
    <SimpleCounter />
    <TweetComponent />
    <Error />
  </div>
</template>

<script setup lang="ts">
import SimpleCounter from './features/counter/views/SimpleCounter.vue';
import TweetComponent from './features/tweet/views/TweetComponent.vue';
import Error from './shared/error/views/Error.vue';
</script>
