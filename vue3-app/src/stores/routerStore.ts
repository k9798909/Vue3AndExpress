import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useRouterStore = defineStore('routerStore', () => {
  const beforeRoute = ref('/')
  const setBeforeRoute = (path: string) => {
    beforeRoute.value = path
  }
  const getBeforeRoute = () => {
    return beforeRoute.value
  }

  return { getBeforeRoute, setBeforeRoute }
})
