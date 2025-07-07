<template>
  <div>
    <SimpleCounter />
    <TweetComponent />
    <Error :error-action="maybeErrorAction" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import SimpleCounter from './features/counter/views/SimpleCounter.vue';
import TweetComponent from './features/tweet/views/TweetComponent.vue';
import Error from './shared/error/views/Error.vue';
import { unexpectedError, type DomainError } from './shared/error/model/DomainError';
import { subscribeError, subscribeResetError } from './shared/error/views/subscribeError';
import { domainErrorHandler } from './shared/error/handlers/ErrorHandler';
import type { ErrorAction } from './shared/error/handlers/ErrorAction';
import { publishError } from './shared/error/views/publishError';

const maybeDomainError = ref<DomainError | undefined>()
const maybeErrorAction = computed<ErrorAction | undefined>(() => maybeDomainError.value && domainErrorHandler(maybeDomainError.value))

subscribeError((error) => {
  maybeDomainError.value = error
})
subscribeResetError(errorType => {
  if (errorType === null) {
    maybeDomainError.value = undefined
  }

  if (maybeDomainError.value?.type === errorType) {
    maybeDomainError.value = undefined
  }
})
</script>
