<template>
  <div>
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <div v-if="isBusy.yes">
        loading...
      </div>
      <div v-else>{{ data.count }}</div>

      <div style="display: flex; flex-direction: row; gap: 16px;">
        <button :disabled="isBusy.yes" @click="data = increment(data)">+</button>
        <button :disabled="isBusy.yes" @click="data = decrement(data)">-</button>
        <button :disabled="isBusy.yes" @click="data = undo(data)">undo</button>
        <button :disabled="isBusy.yes" @click="runBusy(isBusy, () => simpleCounterApiEnv.postCount(data.count))">save count</button>
        <button :disabled="isBusy.yes" @click="runBusy(isBusy, load)">load latest</button>
      </div>

      <div v-if="isBusy.yes">
        loading...
      </div>
      <div v-else>
        {{ data.history }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
button {
  padding: 4px 16px;
}
</style>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { decrement, increment, undo, type SimpleCounterData } from './SimpleCounter.domain';
import { simpleCounterApiEnv } from './SimpleCounter.infra.api.env';
import  { runBusy, type IsBusy } from './IsBusy';

const data = ref<SimpleCounterData>({
  count: 0,
  history: []
})

const isBusy = ref<IsBusy>({ yes: false })

const load = async () => runBusy(isBusy.value, async () => {
  const result = await simpleCounterApiEnv.load()

  if(!result.ok) {
    console.error(result.error)
    return
  }

  data.value = result.value
})

onMounted(load)

watch(isBusy, () => {
  console.log(`isBusy: ${isBusy.value.yes}`)
})
</script>
