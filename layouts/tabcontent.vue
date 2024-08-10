<template>
    <div class="w-full h-full">
        <div class="mt-1"></div>
        <HeaderTop />
        <div class="my-4"></div>
        <HeaderTab :idx="props.tabIdx" />
        <div class="w-full h-full bg-slate-400">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    tabIdx: number;
}>();
</script>
<style scoped>
    
</style>