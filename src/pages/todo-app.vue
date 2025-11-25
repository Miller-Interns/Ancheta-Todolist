<template>
    <div class="app-root">
        <h2 class="todoHeader">TODO List Exercise</h2>
        <add-category-form class="addCategory" @create="onCreateCategory" />

        <div class="categories-wrapper">
            <div class="categories">
                <category-card class="categoriesCard"
                v-for="cat in store.categories"
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
    import { useTodoStore } from '@/stores/todo-store';
    import addCategoryForm from '@/components/add-category-form.vue';
    import categoryCard from '@/components/category-card.vue';


    const store = useTodoStore();


    function onCreateCategory(title:string){
    store.addCategory({ id: String(Date.now()), title, todos: [] });
    }
    function onDeleteCategory(id:string){ store.deleteCategory(id); }
    function onUpdateTitle(id:string, title:string){ store.updateCategoryTitle(id, title); }
    function onAddTodo(categoryId:string, todo:any){ store.addTodo(categoryId, todo); }
    function onUpdateTodo(categoryId:string, todoId:string, payload:any){ store.updateTodo(categoryId, todoId, payload); }
    function onDeleteTodo(categoryId:string, todoId:string){ store.deleteTodo(categoryId, todoId); }
    function onReorder(categoryId:string, newTodos:any[]){ store.reorderTodos(categoryId, newTodos); }
</script>


<style scoped>
.app-root{ padding:1rem }
.categories{ 
    display:flex; 
    flex-wrap:wrap; 
    gap:1rem; 
    justify-content:center; 
    margin-top:5%; 
    flex-flow: row wrap;
}
.todoHeader{
    display: flex; 
    justify-content: center; 
    font-size: xx-large;
}
.addCategory{
    display:flex;
    justify-content:center ;
}
.categoriesCard{
    width:20%;
}
</style>