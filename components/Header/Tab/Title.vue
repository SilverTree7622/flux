<template>
    <NuxtLink
        :to="`/fluxwork?tab=${ props.tabIdx }`"
        class="w-full text-center text-white rounded-t-md mx-[1px] mt-[1px] px-auto bg-slate-400"
        :class="getClass(props.isToggled)"
    >
        {{ props.context }}
    </NuxtLink>
</template>
<script setup lang="ts">
const props = defineProps<{
    tabIdx: number;
    context: string;
    isToggled: boolean;
}>();

const getClass = (isToggled: boolean): string => {
    return props.isToggled ? 'text-blue-700' : 'cursor-pointer';
};

</script>
<style scoped>
    
</style>