<template>
  <div class="category-card">
    <!-- Category Header -->
    <div class="card-header">
      <input v-model="localTitle" @blur="saveTitle" class="title-input" />
      <button @click="$emit('delete', category.id)" class="delete-btn">Delete</button>
    </div>

    <!-- Add Todo Form -->
    <add-todo-form
      :category-id="category.id"
      @create="onCreateTodo"
    />

    <!-- Todo Items -->
    <div>
      <todo-item
        v-for="t in category.todos"
        :key="t.id"
        :category-id="category.id"
        :todo="t"
        @update="onUpdateTodo"
        @delete="onDeleteTodo"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type {TodoItem as TodoItemType } from '../types/TodoItem';
import type { Category} from '../types/Category';
import AddTodoForm from '../components/add-todo-form.vue';
import TodoItem from '../components/todo-item.vue';

// Props
const props = defineProps<{ category: Category }>();
const emit = defineEmits([
  'delete',
  'update-title',
  'add-todo',
  'update-todo',
  'delete-todo'
]);

// Local state
const localTitle = ref(props.category.title);
watch(() => props.category.title, (v) => (localTitle.value = v));

// Save category title
function saveTitle() {
  const title = localTitle.value.trim();
  if (title) emit('update-title', props.category.id, title);
}

// Todo event handlers
function onCreateTodo(todo: TodoItemType) {
  emit('add-todo', props.category.id, todo);
}

function onUpdateTodo(todo: TodoItemType) {
  emit('update-todo', props.category.id, todo);
}

function onDeleteTodo(todoId: string) {
  emit('delete-todo', props.category.id, todoId);
}
</script>

<style scoped>
.category-card {
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
  background: #f9f9f9;
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.title-input {
  flex: 1;
  padding: 0.25rem 0.5rem;
  font-weight: bold;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}

.delete-btn {
  margin-left: 0.5rem;
  background: #e11d48;
  color: white;
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
}

.delete-btn:hover {
  background: #be123c;
}
</style>
