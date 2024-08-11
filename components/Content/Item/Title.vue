<template>
    <div class="font-extrabold text-center">
        {{ props.txt }}
    </div>
</template>
<script setup lang="ts">
const props = defineProps<{
    txt: string;
}>();

</script>
<style scoped>
    
</style>