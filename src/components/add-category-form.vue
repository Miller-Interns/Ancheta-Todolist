<template>
  <form @submit.prevent="submit" class="add-category-form">
    <input class="txtbox" v-model="title" placeholder="New category title" />
    <button type="submit" :disabled="!title.trim()">
      <Plus class="icon" /> Add Category
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTodos } from '@/composables/use-todos';
import { Plus } from 'lucide-vue-next';

const title = ref('');
const { addCategory } = useTodos();

function submit() {
  const trimmedTitle = title.value.trim();
  if (!trimmedTitle) return;
  try {
    addCategory({
      id: String(Date.now()),
      title: trimmedTitle,
      todos: []
    });
    title.value = '';
  } catch (err: any) {
    alert(err.message);
  }
}
</script>

<style scoped>
.txtbox {
  margin-right: 0.5rem;
  height: 30px;
  width: 200px;
  font-size: medium;
  padding: 0 0.25rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}

button {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

button:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
  color: #f3f4f6;
}

button:hover:not(:disabled) {
  background-color: #4338ca;
}

.icon {
  width: 16px;
  height: 16px;
  vertical-align: middle;
}
</style>
