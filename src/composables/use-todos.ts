import { ref } from 'vue';
import { useTodoStore } from '../stores/todo-store';
import type { Category } from '../types/Category';
import type { TodoItem } from '../types/TodoItem';


export function useTodos() {
const store = useTodoStore();
const error = ref<string | null>(null);


function createCategory(title: string) {
const payload: Category = {
id: String(Date.now()),
title,
todos: []
};
store.addCategory(payload);
}


function createTodo(categoryId: string, text: string) {
const todo: TodoItem = {
id: String(Date.now()),
text,
completed: false
};
try {
store.addTodo(categoryId, todo);
error.value = null;
} catch (e:any) {
error.value = e.message || 'Failed';
}
}


return { store, createCategory, createTodo, error };
}