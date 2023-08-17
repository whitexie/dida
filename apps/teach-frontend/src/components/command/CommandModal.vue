<script setup lang="ts">
import { NModal } from 'naive-ui'
import { nextTick, ref, watch } from 'vue'
import { useSearch } from './search'
import CommandBody from './CommandModalBody.vue'
import { useCommandModal } from './commandModal'

const { resetSearch } = useSearch()
const { registerKeyboardShortcut, showCommandModal } = useCommandModal()

registerKeyboardShortcut()

const commandBodyRef = ref<null | typeof CommandBody>(null)

watch(() => showCommandModal.value, (v) => {
  if (commandBodyRef.value) {
    nextTick(() => {
      commandBodyRef.value?.focusInput()
    })
  }
  if (!v)
    resetSearch()
})
</script>

<template>
  <NModal v-model:show="showCommandModal" display-directive="show">
    <CommandBody ref="commandBodyRef" />
  </NModal>
</template>

<style scoped></style>
