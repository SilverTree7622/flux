<template>
    <NuxtLink
        :to="`/showcase?tab=${ props.tabIdx }&sub=${ props.subIdx }`"
        class="
            w-full text-center rounded-3xl bg-slate-300
            px-auto py-[1px]
        "
        :class="getClass()"
    >
        {{ props.context }}
    </NuxtLink>
</template>
<script setup lang="ts">
const props = defineProps<{
    tabIdx: number;
    subIdx: number;
    context: string;
    isToggled: boolean;
}>();

const getClass = (): string => {
    return props.isToggled ? 'text-black font-extrabold' : 'text-white cursor-pointer';
};

onMounted(async () => {
    await nextTick();
    
});
</script>
<style scoped>
    
</style>