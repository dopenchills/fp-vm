<template>
  <ErrorDialog
    v-bind="dialogProps"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { ErrorActionTypeMap, type ErrorAction } from '../handlers/ErrorAction';
import ErrorDialog from './ErrorDialog.vue';
import { type DomainError } from '../model/DomainError';
import { domainErrorHandler } from '../handlers/ErrorHandler';
import { subscribeError, subscribeResetError } from './subscribeError';

const maybeDomainError = ref<DomainError | undefined>()
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

const maybeErrorAction = computed<ErrorAction | undefined>(() => maybeDomainError.value && domainErrorHandler(maybeDomainError.value))
const dialogProps = computed(() => {
  if (maybeErrorAction.value?.type !== ErrorActionTypeMap.Dialog) {
    return {
      modelValue: false,
      message: '',
      buttonActions: []
    }
  }

  return {
    modelValue: true,
    message: maybeErrorAction.value?.message,
    buttonActions: maybeErrorAction.value?.buttonActions
  }
})
</script>
