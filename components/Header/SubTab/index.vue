<template>
    <div class="w-full px-auto mx-auto py-2 text-center flex flex-row gap-1 bg-slate-400">
        <HeaderSubTabTitle
            :tabIdx="props.tabIdx"
            :subIdx="0"
            :context="'sample'"
            :isToggled="props.subIdx === 0"
        />
        <HeaderSubTabTitle
            :tabIdx="props.tabIdx"
            :subIdx="1"
            :context="'prod'"
            :isToggled="props.subIdx === 1"
        />
    </div>
</template>
<script setup lang="ts">
const props = defineProps<{
    tabIdx: number;
    subIdx: number;
}>();

</script>
<style scoped>
    
</style>