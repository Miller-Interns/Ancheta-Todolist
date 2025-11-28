<template>
  <div class="category-card">

    <div class="card-header">
      <input v-model="localTitle" @blur="saveTitle" class="title-input" />
      <button @click="deleteCategoryHandler" class="delete-btn">Delete</button>
    </div>

    <add-todo-form :category-id="category.id" />

    <div class="todos">
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

const props = defineProps<{ category: Category }>();
const { updateCategoryTitle, deleteCategory } = useTodos();
const localTitle = ref(props.category.title);

watch(() => props.category.title, (v) => (localTitle.value = v));

function saveTitle() {
  const title = localTitle.value.trim();
  if (title && title !== props.category.title) {
    updateCategoryTitle(props.category.id, title);
  }
}

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
  background: #d4d1c9;
  height:50vh;
  width:25%
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
.todos{
  margin-top:2%;
  overflow-y: scroll;
  height: 79%;
}
</style>
