<template>
<form @submit.prevent="submit">
<input class="txtbox" v-model="title" placeholder="New category title" />
<button type="submit">Add Category</button>
</form>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { defineEmits } from 'vue';
const emit = defineEmits(['create']);
const title = ref('');
function submit(){ if (!title.value.trim()) return; emit('create', title.value.trim()); title.value = ''; }
</script>

<style scoped>
.txtbox{
    margin-right:20px;
    height: 30px;
    width:200px;
    font-size: medium;
}
</style>