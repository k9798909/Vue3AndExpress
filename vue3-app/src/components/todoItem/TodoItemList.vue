<script lang="ts" setup>
import type TodoItem from '@/types/TodoItem'
import { onMounted, ref } from 'vue'
import axios from '@/axios'
import MyDialog from '@/components/common/MyDialog.vue'

const deleteConfirmEvent = ref<Function>(() => {})
const isActive = ref<boolean>(false)
const todoItemList = ref<TodoItem[]>([])

onMounted(() => {
  getTodoItemList()
})

async function getTodoItemList() {
  const response = await axios.get<TodoItem[]>('/api/todoitem')
  todoItemList.value = response.data
}

async function deleteEvent(todoItemId: number) {
  const event = async () => {
    await axios.delete(`/api/todoitem/${todoItemId}`)
    getTodoItemList()
    isActive.value = false
  }
  deleteConfirmEvent.value = event
  isActive.value = true
}
</script>

<template>
  <div>
    <div class="d-flex justify-center">
      <h1>待辦事項清單</h1>
    </div>
    <div class="d-flex justify-end w-75 mx-auto"><v-btn to="/todoItem/add">新增</v-btn></div>
    <v-table class="w-75 mx-auto">
      <thead>
        <tr>
          <th width="40%">項目名稱</th>
          <th width="40%">是否已完工</th>
          <th width="20%">&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="todoItem of todoItemList" :key="todoItem.todoItemId">
          <td>{{ todoItem.name }}</td>
          <td>
            <input
              class="check-box"
              disabled="true"
              type="checkbox"
              v-model="todoItem.isComplete"
            />
          </td>
          <td>
            <span class="float-right">
              <v-btn :to="{ path: '/todoItem/edit/' + todoItem.todoItemId }" variant="text">編輯</v-btn>
              |
              <v-btn @click="deleteEvent(todoItem.todoItemId)" variant="text">刪除</v-btn>
            </span>
          </td>
        </tr>
      </tbody>
    </v-table>
    <MyDialog
      :content="'點選確認刪除資料?'"
      :title="'請確認'"
      v-model:is-active="isActive"
      v-bind:confirm-event="deleteConfirmEvent"
    ></MyDialog>
  </div>
</template>
