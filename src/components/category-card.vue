<template>
  <div class="category-card">
    <div class="card-header">
      <input v-model="localTitle" :readonly="!editing" class="title-input" @keyup.enter="saveTitle" />

      <button v-if="!editing" @click="startEdit" class="edit-btn">
        <Edit3 class="icon" /> Edit
      </button>
      <button v-else @click="saveTitle" class="save-btn" :disabled="!localTitle.trim()">
        <Save class="icon" /> Save
      </button>

      <button @click="deleteCategoryHandler" class="delete-btn">
        <Trash2 class="icon" /> Delete
      </button>
    </div>

    <add-todo-form :category-id="category.id" />

    <div class="todos">
      <todo-item v-for="t in category.todos" :key="t.id" :category-id="category.id" :todo="t" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import type { Category } from "../types/Category";
import AddTodoForm from "./add-todo-form.vue";
import TodoItem from "./todo-item.vue";
import { useTodos } from "../composables/use-todos.ts";
import { Edit3, Save, Trash2 } from "lucide-vue-next";

const props = defineProps<{ category: Category }>();
const { updateCategoryTitle, deleteCategory } = useTodos();

const localTitle = ref(props.category.title);
const editing = ref(false);

watch(() => props.category.title, (v) => (localTitle.value = v));

function startEdit() {
  editing.value = true;
}

function saveTitle() {
  const title = localTitle.value.trim();
  if (title && title !== props.category.title) {
    try {
      updateCategoryTitle(props.category.id, title);
    } catch (err: any) {
      alert(err.message);
      return;
    }
  }
  editing.value = false;
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
  background: rgba(255, 255, 255, 0.8);
  height: 50vh;
  width: 25%;
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  gap: 0.5rem;
}

.title-input {
  flex: 1;
  padding: 0.25rem 0.5rem;
  font-weight: bold;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}

.title-input[readonly] {
  background-color: #f3f3f3;
  cursor: default;
}

.edit-btn {
  background: #f59e0b;
  color: white;
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
}

.edit-btn:hover:not(:disabled) {
  background-color: #d97706;
}

.save-btn {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
}

.save-btn:hover:not(:disabled) {
  background-color: #2563eb;
}

.save-btn:disabled {
  background-color: #9ca3af;
  color: #f3f4f6;
  cursor: not-allowed;
}

.delete-btn {
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

.todos {
  margin-top: 2%;
  height: 79%;
  overflow-y: auto;
}

.icon {
  vertical-align: middle;
  margin-right: 0.25rem;
  width: 16px;
  height: 16px;
}
</style>
