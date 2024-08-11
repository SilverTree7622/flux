<template>
    <div>
        index page
    </div>
</template>

<script setup lang="ts">

onMounted(async () => {
    await nextTick();
    navigateTo('/showcase');
});
</script>

<style scoped>
    
</style>