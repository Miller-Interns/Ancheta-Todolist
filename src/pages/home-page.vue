<template>
<div class="page-center">
<div class="card">
<h1 class="name">{{ fullName}}</h1>
<p class="date">Started on: {{ startedOn}}</p>
<button class="button" @click="go()">GO TO APP</button>
</div>
</div>
</template>


<script setup lang="ts">
import { useRouter } from 'vue-router';


const router = useRouter();
const fullName = 'RAIN G. ANCHETA'; 
const startedOn = '11/21/2025';
function go() { router.push('/app'); }
</script>


<style scoped>
.page-center{ 
    height:100vh; 
    display:flex; 
    align-items:center; 
    justify-content:center; 
}
.card{ 
    text-align:center; 
}
.name{
    font-size: xx-large;
}
.date{
    font-size: x-large;
}
.button{
    width: 80%; 
    height:100%; 
    font-size:medium; 
    font-weight: bold;
}
</style>