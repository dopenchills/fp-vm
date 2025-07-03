<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div class="w-full max-w-sm relative">
      
      <!-- Counter Display -->
      <div class="text-center">
        <div class="text-8xl font-light text-gray-900 transition-all duration-300">
          {{ data.count }}
        </div>
        <div v-if="isBusy" class="text-gray-400 text-sm mt-4">
          •••
        </div>
      </div>

      <!-- Action Buttons - Below counter -->
      <div class="flex flex-col gap-12 mt-16">
        <!-- Primary counter actions -->
        <div class="flex gap-6">
          <button 
            :disabled="isBusy" 
            @click="data = increment(data)"
            class="flex-1 h-14 bg-black hover:bg-gray-800 disabled:bg-gray-200 text-white font-medium rounded-full transition-all duration-200 active:scale-95"
          >
            +
          </button>
          <button 
            :disabled="isBusy" 
            @click="data = decrement(data)"
            class="flex-1 h-14 bg-white hover:bg-gray-50 disabled:bg-gray-100 text-black font-medium rounded-full border border-gray-200 transition-all duration-200 active:scale-95"
          >
            −
          </button>
        </div>

        <!-- Secondary actions -->
        <div class="flex gap-4 text-sm">
          <button 
            :disabled="isBusy" 
            @click="data = undo(data)"
            class="flex-1 h-10 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 text-gray-700 rounded-full transition-colors"
          >
            Undo
          </button>
          <button 
            :disabled="isBusy" 
            @click="withBusy(() => simpleCounterApiEnv.postCount(data.count))"
            class="flex-1 h-10 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 text-gray-700 rounded-full transition-colors"
          >
            Save
          </button>
          <button 
            :disabled="isBusy" 
            @click="withBusy(load)"
            class="flex-1 h-10 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 text-gray-700 rounded-full transition-colors"
          >
            Load
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { decrement, increment, undo, type SimpleCounterData } from '../domain';
import { load as loadWorkflow } from '../domain/workflow';
import { simpleCounterApiEnv } from '../infra/api.env';
import { useBusy } from '../../../shared/views/composables/useIsBusy';

const data = ref<SimpleCounterData>({
  count: 0,
  history: []
})

const { isBusy, withBusy } = useBusy()

const load = () => withBusy(async () => {
  const result = await loadWorkflow(simpleCounterApiEnv);
  return result.match({
    ok: (value_1) => data.value = value_1,
    err: console.error
  });
})

onMounted(load)
</script>
