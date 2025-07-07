<template>
  <ErrorDialog
    v-bind="dialogProps"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ErrorActionTypeMap, type ButtonAction, type ErrorAction } from '../handlers/ErrorAction';
import ErrorDialog from './ErrorDialog.vue';

const props = defineProps<{
  errorAction?: ErrorAction
}>()

const dialogProps = computed(() => {
  if (props.errorAction?.type !== ErrorActionTypeMap.Dialog) {
    return {
      modelValue: false,
      message: '',
      buttonActions: []
    }
  }

  return {
    modelValue: true,
    message: props.errorAction.message,
    buttonActions: props.errorAction.buttonActions
  }
})
</script>
