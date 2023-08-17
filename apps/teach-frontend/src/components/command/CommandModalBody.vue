<script setup lang="ts">
import { NEmpty, NInput } from 'naive-ui'
import { Icon } from '@iconify/vue'
import { defineExpose, ref } from 'vue'
import type { InputInst } from 'naive-ui'
import { useSearch } from './search'
import CommandSearchCommands from './CommandSearchCommands.vue'
import CommandSearchTasks from './CommandSearchTasks.vue'

const { isSearchCommand, search, loading, searching } = useSearch()
const inputRef = ref<InputInst | null>(null)
function focusInput() {
  inputRef.value?.focus()
}
defineExpose({ focusInput })
</script>

<template>
  <div class="base-color w-200 h-120 rounded p-sm">
    <div class="flex">
      <Icon
        :icon="loading ? 'eos-icons:loading' : 'material-symbols:search'"
        width="30"
      />
      <NInput
        ref="inputRef"
        v-model:value="search"
        class="flex-1"
        placeholder="通过关键字搜索，或添加 '>' 前缀开启命令模式"
        clearable
        autofocus
      />
    </div>
    <div class="mt-6">
      <NEmpty v-if="!searching" description="搜索任务，标签或查看命令。">
        <template #icon />
      </NEmpty>
      <div v-else>
        <component
          :is="isSearchCommand ? CommandSearchCommands : CommandSearchTasks"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
