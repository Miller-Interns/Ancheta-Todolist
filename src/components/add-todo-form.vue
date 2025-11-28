<template>
  <div class="add-todo-form">
    <input
      v-model="todoText"
      @keyup.enter="submitTodo"
      type="text"
      placeholder="Add a new to do item"
      class="input"
    />
    <button @click="submitTodo" class="btn">Add</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { TodoItem } from '@/types/TodoItem';
import { useTodos } from '@/composables/use-todos';

export default defineComponent({
  name: 'AddTodoForm',
  props: {
    categoryId: {
      type: String,
      required: true
    }
  },
  setup(props) {
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

    return { todoText, submitTodo };
  }
});
</script>

<style scoped>
.input {
  padding: 0.5rem;
  flex: 1;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}
.btn {
  margin-left: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}
.btn:hover {
  background-color: #4338ca;
}
.add-todo-form {
  display: flex;
  margin-top: 0.5rem;
}
</style>
