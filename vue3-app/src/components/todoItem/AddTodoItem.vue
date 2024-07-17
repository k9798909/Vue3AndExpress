<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from '@/axios'

const name = ref('')
const isComplete = ref(false)
const router = useRouter()

async function buttonClick() {
  const dataToServer = {
    name: name.value,
    isComplete: isComplete.value
  }

  await axios.post('/api/todoitem', dataToServer)
  router.replace('/todoItem')
}
</script>

<template>
  <div>
    <v-card class="mx-auto pa-10 pb-8" elevation="8" max-width="448" rounded="lg">
      <div></div>
      <h1 class="mb-2">待辦事項清單 - 新增</h1>
      <div class="d-flex align-center">
        <span class="text-h5 font-weight-bold">項目名稱：</span>
        <v-text-field
          density="compact"
          placeholder="輸入項目名稱"
          variant="outlined"
          hide-details="true"
          v-model="name"
        ></v-text-field>
      </div>
      <div class="d-flex align-center">
        <v-checkbox id="isComplete" v-model="isComplete" hide-details="true"></v-checkbox
        ><label for="isComplete" class="font-weight-bold">是否已完工</label>
      </div>
      <div class="d-flex justify-space-evenly">
        <v-btn type="button" @click="buttonClick()">確定</v-btn>
        <v-btn to="/todoItem" :active="false">取消</v-btn>
      </div>
    </v-card>
  </div>
</template>
