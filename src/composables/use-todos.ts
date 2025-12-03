import { useTodoStore } from '@/stores/todo-store'
import type { Category } from '@/types/Category'
import type { TodoItem } from '@/types/TodoItem'

export function useTodos() {
  const store = useTodoStore()

  const addCategory = (category: Category) => {
    const exists = store.categories.some(
      c => c.title.trim().toLowerCase() === category.title.trim().toLowerCase()
    )
    if (exists) throw new Error('Duplicate category not allowed')

    store.categories.push(category)
    store.persist()
  }

  const updateCategoryTitle = (categoryId: string, title: string) => {
    const trimmedTitle = title.trim().toLowerCase();

    const duplicate = store.categories.some(
      c => c.id !== categoryId && c.title.trim().toLowerCase() === trimmedTitle
    );

    if (duplicate) throw new Error('Duplicate category not allowed');

    const category = store.categories.find(c => c.id === categoryId);
    if (category) {
      category.title = title;
      store.persist();
    }
  };


  const deleteCategory = (categoryId: string) => {
    const index = store.categories.findIndex(c => c.id === categoryId)
    if (index !== -1) {
      store.categories.splice(index, 1)
      store.persist()
    }
  }

  const addTodo = (categoryId: string, todo: TodoItem) => {
    const category = store.categories.find(c => c.id === categoryId)
    if (!category) return

    const duplicate = category.todos.some(
      t => t.text.trim().toLowerCase() === todo.text.trim().toLowerCase()
    )
    if (duplicate) throw new Error('Duplicate todo not allowed')

    category.todos.push(todo)
    store.persist()
  }

  const updateTodo = (categoryId: string, todoId: string, payload: Partial<TodoItem>) => {
    const category = store.categories.find(c => c.id === categoryId)
    if (!category) return

    if (payload.text) {
      const duplicate = category.todos.some(
        t => t.id !== todoId && t.text.trim().toLowerCase() === payload.text!.trim().toLowerCase()
      )
      if (duplicate) throw new Error('Duplicate todo not allowed')
    }

    const todo = category.todos.find(t => t.id === todoId)
    if (todo) Object.assign(todo, payload)

    store.persist()
  }


  const deleteTodo = (categoryId: string, todoId: string) => {
    const category = store.categories.find(c => c.id === categoryId)
    if (!category) return

    category.todos = category.todos.filter(t => t.id !== todoId)

    store.persist()
  }

  const reorderTodos = (categoryId: string, newTodos: TodoItem[]) => {
    const category = store.categories.find(c => c.id === categoryId)
    if (!category) return

    category.todos = newTodos
    store.persist()
  }

  return {
    categories: store.categories,

    addCategory,
    updateCategoryTitle,
    deleteCategory,

    addTodo,
    updateTodo,
    deleteTodo,
    reorderTodos
  }
}
