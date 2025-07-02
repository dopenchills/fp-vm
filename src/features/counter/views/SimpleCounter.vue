<template>
  <div>
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <div v-if="isBusy">
        loading...
      </div>
      <div v-else>{{ data.count }}</div>

      <div style="display: flex; flex-direction: row; gap: 16px;">
        <button :disabled="isBusy" @click="data = increment(data)">+</button>
        <button :disabled="isBusy" @click="data = decrement(data)">-</button>
        <button :disabled="isBusy" @click="data = undo(data)">undo</button>
        <button :disabled="isBusy" @click="withBusy(() => simpleCounterApiEnv.postCount(data.count))">save count</button>
        <button :disabled="isBusy" @click="withBusy(load)">load latest</button>
      </div>

      <div v-if="isBusy">
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
