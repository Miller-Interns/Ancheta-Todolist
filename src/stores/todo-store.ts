import { defineStore } from 'pinia';
import type { TodoItem } from '../types/TodoItem.ts';
import type { Category} from '../types/Category.ts';

const LS_KEY = 'TODO_LIST_DATA';

export const useTodoStore = defineStore('todoStore', {
  state: () => ({
    categories: JSON.parse(localStorage.getItem(LS_KEY) || '[]') as Category[],
  }),

  actions: {
    persist() {
      localStorage.setItem(LS_KEY, JSON.stringify(this.categories));
    },

    addCategory(category: Category) {
      this.categories.push(category);
      this.persist();
    },

    updateCategoryTitle(categoryId: string, title: string) {
      const c = this.categories.find(x => x.id === categoryId);
      if (c) c.title = title;
      this.persist();
    },

    deleteCategory(categoryId: string) {
      this.categories = this.categories.filter(x => x.id !== categoryId);
      this.persist();
    },

    addTodo(categoryId: string, todo: TodoItem) {
      const c = this.categories.find(x => x.id === categoryId);
      if (c) {
        const exists = c.todos.some(
          t => t.text.trim().toLowerCase() === todo.text.trim().toLowerCase()
        );
        if (!exists) {
          c.todos.push(todo);
          this.persist();
        } else {
          throw new Error('Duplicate todo not allowed');
        }
      }
    },

    updateTodo(categoryId: string, todoId: string, payload: Partial<TodoItem>) {
      const c = this.categories.find(x => x.id === categoryId);
      if (c) {
        const t = c.todos.find(z => z.id === todoId);
        if (t) Object.assign(t, payload);
        this.persist();
      }
    },

    deleteTodo(categoryId: string, todoId: string) {
      const c = this.categories.find(x => x.id === categoryId);
      if (c) {
        c.todos = c.todos.filter(z => z.id !== todoId);
        this.persist();
      }
    },

    reorderTodos(categoryId: string, newTodos: TodoItem[]) {
      const c = this.categories.find(x => x.id === categoryId);
      if (c) {
        c.todos = newTodos;
        this.persist();
      }
    }
  }
});
