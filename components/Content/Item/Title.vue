<template>
    <div>
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