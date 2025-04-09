<template>
    <div class="w-full px-auto mx-auto py-6 text-center flex flex-row gap-1 bg-slate-400">
        <HeaderSubTabTitle
            :tabIdx="props.tabIdx"
            :subIdx="0"
            :context="'all'"
            :isToggled="props.subIdx === 0"
        />
        <HeaderSubTabTitle
            :tabIdx="props.tabIdx"
            :subIdx="1"
            :context="'sample'"
            :isToggled="props.subIdx === 1"
        />
        <HeaderSubTabTitle
            :tabIdx="props.tabIdx"
            :subIdx="2"
            :context="'prod'"
            :isToggled="props.subIdx === 2"
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