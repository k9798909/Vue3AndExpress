<script lang="ts" setup>
const isActive = defineModel<boolean>('isActive')
const confirmEvent = defineModel<Function>('confirmEvent')
const props = defineProps<{
  title: string
  content: string
}>()

async function confirm() {
  const func: Function = confirmEvent.value!
  await func()
  confirmEvent.value = () => {}
}
</script>

<template>
  <v-dialog max-width="500" v-model="isActive">
    <v-card :title="props.title">
      <v-card-text>
        {{ props.content }}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text="確認" @click="confirm"></v-btn>
        <v-btn text="取消" @click="isActive = false"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
