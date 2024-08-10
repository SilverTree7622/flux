<template>
    <div class="w-full">
        <img :src="props.src" />
    </div>
</template>
<script setup lang="ts">
const props = defineProps<{
    src: string;
}>();

</script>
<style scoped>
    
</style>