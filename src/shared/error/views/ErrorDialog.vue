<template>
  <div v-if="modelValue" class="error-dialog-overlay">
    <div class="error-dialog">
      <h2>{{ title }}</h2>
      <p>{{ message }}</p>
      <button v-for="buttonAction in buttonActions" @click="handleClick(buttonAction.type)">
        {{ getButtonLabel(buttonAction.type) }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.error-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.error-dialog {
  background: #fff;
  padding: 2rem 2.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.2);
  text-align: center;
  min-width: 300px;
}

.error-dialog h2 {
  margin-bottom: 1rem;
  color: #d32f2f;
}

.error-dialog button {
  margin-top: 1.5rem;
  padding: 0.5rem 1.5rem;
  background: #d32f2f;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.error-dialog button:hover {
  background: #b71c1c;
}
</style>

<script setup lang="ts">
import { ButtonActionTypeMap, type ButtonAction } from '../handlers/ErrorAction';
import { publishResetError } from './publishError';

const modelValue = defineModel<boolean>({ required: true, default: false })

withDefaults(defineProps<{
  title?: string
  message?: string,
  buttonActions?: ButtonAction[]
}>(), {
  title: 'Error',
  message: '',
  buttonActions: () => []
})

const handleClick = (buttonActionType: keyof typeof ButtonActionTypeMap) => {
  switch(buttonActionType) {
    case ButtonActionTypeMap.Close:
      publishResetError()
  }
}

const getButtonLabel = (buttonActionType: keyof typeof ButtonActionTypeMap) => {
  switch(buttonActionType) {
    case ButtonActionTypeMap.Close:
      return 'Close'
  }
}
</script>
