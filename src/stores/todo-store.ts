import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Category } from '../types/Category'

const LS_KEY = 'TODO_LIST_DATA'

export const useTodoStore = defineStore('todoStore', () => {
  const categories = ref<Category[]>(
    JSON.parse(localStorage.getItem(LS_KEY) || '[]')
  )

  const persist = () => {
    localStorage.setItem(LS_KEY, JSON.stringify(categories.value))
  }

  return {
    categories,
    persist
  }
})
