<template>
    <div class="w-full h-full">
        <div v-if="!props.isNoTop" class="mt-1"></div>
        <HeaderTop v-if="!props.isNoTop" />
        <div class="my-4"></div>
        <HeaderTab :idx="props.tabIdx" />
        <div class="w-full h-full bg-slate-400 rounded-b-md">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    tabIdx: number;
    isNoTop?: boolean;
}>();
</script>
<style scoped>
    
</style>