<template>
    <div>
        <HeaderTab :idx="props.tabIdx" />
        
        <slot />
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    tabIdx: number;
}>();
</script>
<style scoped>
    
</style>