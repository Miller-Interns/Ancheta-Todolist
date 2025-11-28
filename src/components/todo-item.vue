<template>
  <div
    class="todo-item"
    :class="{ completedBg: localTodo.completed, notCompletedBg: !localTodo.completed }"
  >
    <!-- Todo text (editable) -->
    <span v-if="!editing" :class="{ completed: localTodo.completed }">
      {{ localTodo.text }}
    </span>
    <input
      v-else
      v-model="tempText"
      class="edit-input"
    />

    <!-- Buttons below the text -->
    <div class="button-row">
      <button
        class="done-btn"
        :class="{ done: localTodo.completed, notdone: !localTodo.completed }"
        @click="toggleCompleted"
      >
        {{ localTodo.completed ? 'Done' : 'Mark as Done' }}
      </button>

      <!-- Edit / Save button -->
      <button
        class="edit-btn"
        :class="{ saving: editing }"
        @click="editing ? saveEdit() : startEdit()"
      >
        {{ editing ? '💾 Save' : '✏️ Edit' }}
      </button>

      <button class="delete-btn" @click="deleteTodo">
        🗑 Delete
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import type { TodoItem } from '@/types/TodoItem';
import { useTodos } from '@/composables/use-todos';

export default defineComponent({
  name: 'TodoItem',
  props: {
    categoryId: { type: String, required: true },
    todo: { type: Object as () => TodoItem, required: true }
  },
  setup(props) {
    const { updateTodo, deleteTodo } = useTodos(); 

    const localTodo = ref<TodoItem>({ ...props.todo });
    const editing = ref(false);
    const tempText = ref(localTodo.value.text);


    watch(
      () => props.todo,
      (newVal) => {
        localTodo.value = { ...newVal };
        if (!editing.value) tempText.value = newVal.text;
      },
      { deep: true }
    );

    const toggleCompleted = () => {
      updateTodo(props.categoryId, localTodo.value.id, {
        completed: !localTodo.value.completed
      });
    };

    const startEdit = () => {
      editing.value = true;
      tempText.value = localTodo.value.text;
    };

    const saveEdit = () => {
      const text = tempText.value.trim();
      if (!text) {
        deleteTodo(props.categoryId, localTodo.value.id);
        return;
      }
      updateTodo(props.categoryId, localTodo.value.id, { text });
      editing.value = false;
    };

    const deleteTodoHandler = () => {
      deleteTodo(props.categoryId, localTodo.value.id);
    };

    return { localTodo, editing, tempText, toggleCompleted, startEdit, saveEdit, deleteTodo: deleteTodoHandler };
  }
});
</script>

<style scoped>
.todo-item {
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  background: pink;
}

.todo-item.completedBg {
  background-color: #d1fae5; 
}

.todo-item.notCompletedBg {
  background-color: #ffe4e9; 
}

.todo-item span,
.edit-input {
  display: block;     /* forces full-width so wrapping is natural */
  width: 100%;
  white-space: normal;
  word-break: break-word;
  overflow-wrap: break-word;
}

.todo-item span.completed {
  color: #888;
}

.edit-input {
  padding: 0.25rem;
  border: 1px solid #050404;
  border-radius: 0.25rem;
}

.button-row {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.done-btn.done {
  background-color: #10b981; 
  color: white;
}
.done-btn.notdone {
  background-color: #f86161; 
  color: white;
}

.edit-btn {
  background-color: #f59e0b;
  color: white;
}
.edit-btn.saving {
  background-color: #10b981; 
  color: white;
}

.delete-btn {
  background-color: #ef4444;
  color: white;
}

.done-btn,
.edit-btn,
.delete-btn {
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
}
</style>
