import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useRouterStore } from '@/stores/routerStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/todoItem',
      children: [
        {
          path: '',
          name: 'todoItemList',
          component: () => import('../components/todoItem/TodoItemList.vue')
        },
        {
          path: '/todoItem/add',
          name: 'addTodoItem',
          component: () => import('../components/todoItem/AddTodoItem.vue')
        },
        {
          path: '/todoItem/edit/:id',
          name: 'editTodoItem',
          component: () => import('../components/todoItem/EditTodoItem.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && !sessionStorage.getItem('token')) {
    const store = useRouterStore()
    store.setBeforeRoute(to.path)
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
