<template>
  <div class="todo-item" :class="{ completedBg: localTodo.completed, notCompletedBg: !localTodo.completed }">
    <span v-if="!editing" :class="{ completed: localTodo.completed }">
      {{ localTodo.text }}
    </span>

    <input v-else v-model="tempText" class="edit-input" />

    <div class="button-row">
      <button class="done-btn" :class="{ done: localTodo.completed, notdone: !localTodo.completed }"
        @click="toggleCompleted">
        <CheckCircle class="icon" /> {{ completedLabel }}
      </button>

      <button class="edit-btn" :class="{ saving: editing }" @click="editing ? saveEdit() : startEdit()"
        :disabled="editing && !tempText.trim()">
        <template v-if="editing">
          <Save class="icon" /> Save
        </template>
        <template v-else>
          <Edit3 class="icon" /> Edit
        </template>
      </button>

      <button class="delete-btn" @click="deleteTodo">
        <Trash2 class="icon" /> Delete
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from "vue";
import type { TodoItem } from "@/types/TodoItem";
import { useTodos } from "@/composables/use-todos";


import { CheckCircle, Edit3, Save, Trash2 } from "lucide-vue-next";

export default defineComponent({
  name: "TodoItem",
  components: { CheckCircle, Edit3, Save, Trash2 },
  props: {
    categoryId: { type: String, required: true },
    todo: { type: Object as () => TodoItem, required: true },
  },
  setup(props) {
    const { updateTodo, deleteTodo } = useTodos();

    const localTodo = ref<TodoItem>({ ...props.todo });
    const editing = ref(false);
    const tempText = ref(localTodo.value.text);

    const completedLabel = computed(() =>
      localTodo.value.completed ? "Done" : "Mark as Done"
    );

    watch(
      () => props.todo,
      (newVal) => {
        localTodo.value = { ...newVal };
        if (!editing.value) tempText.value = newVal.text;
      },
      { deep: true }
    );

    const toggleCompleted = () => {
      try {
        updateTodo(props.categoryId, localTodo.value.id, {
          completed: !localTodo.value.completed,
        });
      } catch (err: any) {
        alert(err.message);
      }
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
      try {
        updateTodo(props.categoryId, localTodo.value.id, { text });
        editing.value = false;
      } catch (err: any) {
        alert(err.message);
      }
    };

    const deleteTodoHandler = () => {
      deleteTodo(props.categoryId, localTodo.value.id);
    };

    return {
      localTodo,
      editing,
      tempText,
      completedLabel,
      toggleCompleted,
      startEdit,
      saveEdit,
      deleteTodo: deleteTodoHandler,
    };
  },
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
  background: #fdf6f0;
}

.todo-item.completedBg {
  background-color: #d1fae5;
}

.todo-item.notCompletedBg {
  background-color: #fff0f0;
}

.todo-item span,
.edit-input {
  display: block;
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
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}

.button-row {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.done-btn.done {
  background-color: #22c55e;
  color: white;
}

.done-btn.notdone {
  background-color: #ef4444;
  color: white;
}

.edit-btn {
  background-color: #f59e0b;
  color: white;
}

.edit-btn.saving {
  background-color: #3b82f6;
  color: white;
}

.edit-btn:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
  color: #f3f4f6;
}

.delete-btn {
  background-color: #dc2626;
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

.done-btn:hover:not(:disabled),
.edit-btn:hover:not(:disabled),
.delete-btn:hover:not(:disabled) {
  opacity: 0.85;
}

.icon {
  vertical-align: middle;
  margin-right: 0.25rem;
  width: 16px;
  height: 16px;
}
</style>
