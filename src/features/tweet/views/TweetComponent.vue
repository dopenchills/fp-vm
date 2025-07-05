<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-8">
    <div class="w-full max-w-2xl relative flex flex-col gap-8">
      
      <!-- Tweet Input Display -->
      <div class="flex flex-col gap-2">
        <div class="relative">
          <textarea
            :value="data.inputValue"
            @input="event => data = updateInputValue(data, (event.target as HTMLInputElement).value)"
            @keydown.enter.prevent="!isComposing && handleSubmit()"
            @compositionstart="isComposing = true"
            @compositionend="isComposing = false"
            :disabled="isBusy"
            placeholder="What's happening?"
            class="w-full p-8 text-2xl font-light text-gray-900 bg-white border-2 border-gray-200 rounded-3xl resize-none focus:outline-none focus:border-gray-400 disabled:bg-gray-50 transition-all duration-300 shadow-sm"
            rows="5"
          ></textarea>
          <div class="absolute bottom-4 right-6 text-sm text-gray-500">
            {{ data.inputValue.length }}/140
          </div>
        </div>
        <div v-if="isBusy" class="text-gray-400 text-base text-center py-4">
          •••
        </div>

        <!-- Action Buttons - Below input -->
        <div class="flex flex-col gap-8 mt-12">
          <!-- Primary tweet action -->
          <div class="flex justify-end">
            <button 
              @click="handleSubmit"
              :disabled="isBusy || !tweet({ content: data.inputValue}).ok"
              class="px-12 py-4 bg-black hover:bg-gray-800 disabled:bg-gray-200 text-white font-medium rounded-full transition-all duration-200 active:scale-95 text-lg"
            >
              Tweet
            </button>
          </div>
        </div>

        <!-- Error message -->
        <div v-if="data.errorMessage" class="mt-8 p-6 bg-red-50 border border-red-200 rounded-xl text-red-700 text-base text-center">
          {{ data.errorMessage }}
        </div>
      </div>

      <!-- Tweet List -->
      <div v-if="data.tweets.length > 0" class="mt-16 flex flex-col gap-2">
        <div 
          v-for="(tweet) in data.tweets" 
          :key="tweet.id"
          class="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm group hover:bg-gray-50 transition-colors"
        >
          <div class="flex justify-between items-start gap-6">
            <p class="text-gray-900 text-lg flex-1 leading-relaxed">{{ tweet.content }}</p>
            <button 
              @click="handleDeleteTweet(tweet.id)"
              :disabled="isBusy"
              class="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all duration-200 disabled:opacity-50 w-8 h-8 flex items-center justify-center text-xl"
            >
              ×
            </button>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-else-if="!isBusy && !data.errorMessage" class="mt-16 text-center text-gray-400 text-lg py-8">
        No tweets yet
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { load as loadWorkflow } from '../domain/workflow/workflow';
import { tweetApiEnv } from '../infra/api.env';
import { useBusy } from '../../../shared/views/composables/useIsBusy';
import { addTweet, deleteTweet, updateInputValue, type TweetData } from '../domain/model/TweetData';
import { tweet } from '../domain/model/Tweet';

const data = ref<TweetData>({
  tweets: [],
  inputValue: '',
  errorMessage: ''
});

const { isBusy, withBusy } = useBusy();
const isComposing = ref(false);

onMounted(() => withBusy(async () => {
  const result = await loadWorkflow(tweetApiEnv);

  return result.match({
    err: console.error,
    ok: (value) => {
      data.value = value;
    },
  });
}));

const handleSubmit = async () => 
  tweet({ content: data.value.inputValue })
    .map(tweet => withBusy(async () => await tweetApiEnv.postTweet(tweet)))
    .match({
      err: console.error,
      ok: tweet => tweet
        .then(tweet => tweet.match({
          err: console.error,
          ok: tweet => data.value = addTweet(data.value, tweet)
        }))
    })

const handleDeleteTweet = async (id: string) => {
  await withBusy(async () => 
    tweetApiEnv.deleteTweet(id)
      .then(() =>
        data.value = deleteTweet(data.value, id)
      )
      .catch(console.error)
  );
};
</script>
