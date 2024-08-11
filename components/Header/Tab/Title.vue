<template>
    <NuxtLink
        :to="`/showcase?tab=${ props.tabIdx }`"
        class="w-full text-center rounded-t-md mx-[1px] mt-[1px] px-auto bg-slate-400"
        :class="getClass()"
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

const getClass = (): string => {
    return props.isToggled ? 'text-black' : 'text-white cursor-pointer';
};

onMounted(async () => {
    await nextTick();
    
});
</script>
<style scoped>
    
</style>