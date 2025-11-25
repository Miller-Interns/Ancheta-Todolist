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

      <button class="delete-btn" @click="$emit('delete', localTodo.id)">
        🗑 Delete
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import type { TodoItem } from '@/types/TodoItem';
import { useTodoStore } from '@/stores/todo-store';

export default defineComponent({
  name: 'TodoItem',
  props: {
    categoryId: { type: String, required: true },
    todo: { type: Object as () => TodoItem, required: true }
  },
  emits: ['delete'],
  setup(props, { emit }) {
    const store = useTodoStore();
    const localTodo = ref<TodoItem>({ ...props.todo });
    const editing = ref(false);
    const tempText = ref(localTodo.value.text); // store temporary edit

    watch(
      () => props.todo,
      (newVal) => {
        localTodo.value = { ...newVal };
        if (!editing.value) tempText.value = newVal.text;
      },
      { deep: true }
    );

    const toggleCompleted = () => {
      store.updateTodo(props.categoryId, localTodo.value.id, {
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
        emit('delete', localTodo.value.id);
        return;
      }
      store.updateTodo(props.categoryId, localTodo.value.id, { text });
      localTodo.value.text = text;
      editing.value = false;
    };

    return { localTodo, editing, tempText, toggleCompleted, startEdit, saveEdit, emit };
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
  background-color: #d1fae5; /* light green */
}

.todo-item.notCompletedBg {
  background-color: #ffe4e9; /* pink */
}

.todo-item span {
  cursor: pointer;
  margin-bottom: 0.5rem;
  word-break: break-word;
}

.todo-item span,
.edit-input {
  cursor: pointer;
  margin-bottom: 0.5rem;
  word-break: break-word;   /* breaks long words */
  white-space: normal;      /* allows text to wrap to next line */
  overflow-wrap: anywhere;  /* forces wrap even for long words/URLs */
  width: 100%;              /* full width of the container */
}

.todo-item span.completed {
  color: #888;
}

.edit-input {
  margin-bottom: 0.5rem;
  padding: 0.25rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  width: 100%;
}

.button-row {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

/* Done button colors */
.done-btn.done {
  background-color: #10b981; /* green */
  color: white;
}
.done-btn.notdone {
  background-color: #f86161; /* pink/red */
  color: white;
}

/* Edit / Save button */
.edit-btn {
  background-color: #f59e0b;
  color: white;
}
.edit-btn.saving {
  background-color: #10b981; /* green when editing */
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
