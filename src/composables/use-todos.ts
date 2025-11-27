import { ref } from 'vue';
import type { TodoItem } from '../types/TodoItem';
import type { Category } from '../types/Category';

const LS_KEY = 'TODO_LIST_DATA';

// Make a single reactive instance
const categories = ref<Category[]>(JSON.parse(localStorage.getItem(LS_KEY) || '[]'));

const persist = () => {
  localStorage.setItem(LS_KEY, JSON.stringify(categories.value));
};

export function useTodos() {
  // Category actions
  const addCategory = (category: Category) => {
  const exists = categories.value.some(
    c => c.title.trim().toLowerCase() === category.title.trim().toLowerCase()
  );
  if (exists) {
    throw new Error('Duplicate category not allowed');
  }
  categories.value.push(category);
  persist();
};


  const updateCategoryTitle = (categoryId: string, title: string) => {
    const category = categories.value.find(c => c.id === categoryId);
    if (category) category.title = title;
    persist();
  };

  const deleteCategory = (categoryId: string) => {
    categories.value = categories.value.filter(c => c.id !== categoryId);
    persist();
  };

  // Todo actions
  const addTodo = (categoryId: string, todo: TodoItem) => {
    const category = categories.value.find(c => c.id === categoryId);
    if (category) {
      const exists = category.todos.some(
        t => t.text.trim().toLowerCase() === todo.text.trim().toLowerCase()
      );
      if (!exists) {
        category.todos.push(todo);
        persist();
      } else {
        throw new Error('Duplicate todo not allowed');
      }
    }
  };

  const updateTodo = (categoryId: string, todoId: string, payload: Partial<TodoItem>) => {
    const category = categories.value.find(c => c.id === categoryId);
    if (category) {
      const todo = category.todos.find(t => t.id === todoId);
      if (todo) Object.assign(todo, payload);
      persist();
    }
  };

  const deleteTodo = (categoryId: string, todoId: string) => {
    const category = categories.value.find(c => c.id === categoryId);
    if (category) {
      category.todos = category.todos.filter(t => t.id !== todoId);
      persist();
    }
  };

  const reorderTodos = (categoryId: string, newTodos: TodoItem[]) => {
    const category = categories.value.find(c => c.id === categoryId);
    if (category) {
      category.todos = newTodos;
      persist();
    }
  };

  return {
    categories,
    addCategory,
    updateCategoryTitle,
    deleteCategory,
    addTodo,
    updateTodo,
    deleteTodo,
    reorderTodos
  };
}
