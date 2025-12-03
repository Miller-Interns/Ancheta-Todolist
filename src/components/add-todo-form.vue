<template>
  <div class="add-todo-form">
    <input v-model="todoText" @keyup.enter="submitTodo" type="text" placeholder="Add a new to do item" class="input" />
    <button @click="submitTodo" class="btn" :disabled="!todoText.trim()">
      <PlusIcon class="icon" /> Add
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { TodoItem } from '@/types/TodoItem';
import { useTodos } from '@/composables/use-todos';
import { Plus as PlusIcon } from 'lucide-vue-next';

const props = defineProps<{ categoryId: string }>();
const todoText = ref('');
const { addTodo } = useTodos();

const submitTodo = () => {
  const text = todoText.value.trim();
  if (!text) return;

  try {
    const newTodo: TodoItem = {
      id: crypto.randomUUID(),
      text,
      completed: false
    };
    addTodo(props.categoryId, newTodo);
    todoText.value = '';
  } catch (err: any) {
    alert(err.message);
  }
};
</script>

<style scoped>
.input {
  padding: 0.5rem;
  flex: 1;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}

.btn {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-left: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

.btn:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
  color: #f3f4f6;
}

.btn:hover:not(:disabled) {
  background-color: #4338ca;
}

.add-todo-form {
  display: flex;
  margin-top: 0.5rem;
}

.icon {
  width: 16px;
  height: 16px;
  vertical-align: middle;
  color: white;
}
</style>
