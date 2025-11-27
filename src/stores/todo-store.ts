import { defineStore } from 'pinia';
import type { TodoItem } from '../types/TodoItem.ts';
import type { Category} from '../types/Category.ts';

const LS_KEY = 'TODO_LIST_DATA';

export const useTodoStore = defineStore('todoStore', {
  state: () => ({
    categories: JSON.parse(localStorage.getItem(LS_KEY) || '[]') as Category[],
  })
});
