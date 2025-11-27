<template>
  <form @submit.prevent="submit">
    <input
      class="txtbox"
      v-model="title"
      placeholder="New category title"
    />
    <button type="submit">Add Category</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTodos } from '@/composables/use-todos';

const title = ref('');
const { addCategory } = useTodos(); // use composable directly

function submit() {
  const trimmedTitle = title.value.trim();
  if (!trimmedTitle) return;

  addCategory({
    id: String(Date.now()), // simple unique ID
    title: trimmedTitle,
    todos: []
  });

  title.value = '';
}
</script>

<style scoped>
.txtbox {
  margin-right: 20px;
  height: 30px;
  width: 200px;
  font-size: medium;
  padding: 0 0.25rem;
}
button {
  padding: 0.25rem 0.5rem;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}
button:hover {
  background-color: #4338ca;
}
</style>
