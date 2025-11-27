<template>
  <div class="category-card">
    <!-- Category Header -->
    <div class="card-header">
      <input v-model="localTitle" @blur="saveTitle" class="title-input" />
      <button @click="deleteCategoryHandler" class="delete-btn">Delete</button>
    </div>

    <!-- Add Todo Form -->
    <add-todo-form :category-id="category.id" />

    <!-- Todo Items -->
    <div>
      <todo-item
        v-for="t in category.todos"
        :key="t.id"
        :category-id="category.id"
        :todo="t"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Category } from '../types/Category';
import AddTodoForm from './add-todo-form.vue';
import TodoItem from './todo-item.vue';
import { useTodos } from '../composables/use-todos.ts';

// Props
const props = defineProps<{ category: Category }>();

// Composable
const { updateCategoryTitle, deleteCategory } = useTodos();

// Local title for editing
const localTitle = ref(props.category.title);

// Watch for external updates
watch(() => props.category.title, (v) => (localTitle.value = v));

// Save title on blur
function saveTitle() {
  const title = localTitle.value.trim();
  if (title && title !== props.category.title) {
    updateCategoryTitle(props.category.id, title);
  }
}

// Delete category
function deleteCategoryHandler() {
  deleteCategory(props.category.id);
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
