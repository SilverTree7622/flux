<template>
    <div class="w-20 h-20 border-slate-950 border-spacing-10 rounded-xl">
        <img :src="props.src" :alt="''" />
    </div>
</template>
<script setup lang="ts">
const props = defineProps<{
    src: string;
}>();

</script>
<style scoped>
    
</style>