<template>
  <div class="app-root">
    <h2 class="todoHeader">TODO List Exercise</h2>

    <!-- Add Category Form -->
    <add-category-form class="addCategory" @create="onCreateCategory" />

    <!-- Categories -->
    <div class="categories-wrapper">
      <div class="categories">
        <category-card
          v-for="cat in categories"
          :key="cat.id"
          :category="cat"
          @delete="onDeleteCategory"
          @update-title="onUpdateTitle"
          @add-todo="onAddTodo"
          @update-todo="onUpdateTodo"
          @delete-todo="onDeleteTodo"
          @reorder="onReorder"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTodos } from '@/composables/use-todos';
import AddCategoryForm from '@/components/add-category-form.vue';
import CategoryCard from '@/components/category-card.vue';
import type { TodoItem } from '@/types/TodoItem';
import type { Category } from '@/types/Category';

// Use singleton composable to make state reactive across components
const {
  categories,
  addCategory,
  deleteCategory,
  updateCategoryTitle,
  addTodo,
  updateTodo,
  deleteTodo,
  reorderTodos
} = useTodos();

// -------------------
// Handlers
// -------------------

function onCreateCategory(title: string) {
  addCategory({
    id: String(Date.now()), // simple unique id
    title,
    todos: []
  });
}

function onDeleteCategory(categoryId: string) {
  deleteCategory(categoryId);
}

function onUpdateTitle(categoryId: string, title: string) {
  updateCategoryTitle(categoryId, title);
}

function onAddTodo(categoryId: string, todo: TodoItem) {
  addTodo(categoryId, todo);
}

function onUpdateTodo(categoryId: string, todoId: string, payload: Partial<TodoItem>) {
  updateTodo(categoryId, todoId, payload);
}

function onDeleteTodo(categoryId: string, todoId: string) {
  deleteTodo(categoryId, todoId);
}

function onReorder(categoryId: string, newTodos: TodoItem[]) {
  reorderTodos(categoryId, newTodos);
}
</script>

<style scoped>
.app-root {
  padding: 1rem;
}

.todoHeader {
  display: flex;
  justify-content: center;
  font-size: 2rem;
  margin-bottom: 1rem;
}

.addCategory {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.categories {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.categoriesCard {
  width: 20%;
  min-width: 200px; /* responsive */
}
</style>
