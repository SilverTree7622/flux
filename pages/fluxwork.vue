<template>
    <div class="w-full h-full">
        <NuxtLayout 
            name="tabcontent"
            :tabIdx="opt.tabIdx"
        >
            <ContentWebsite v-if="opt.tabIdx === 0" />
            <ContentWebGame v-if="opt.tabIdx === 1" />
            <ContentPlayableAD v-if="opt.tabIdx === 2" />
            <FooterInfo v-if="opt.isMyInfoExist" />
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
const route = useRoute();
const opt = reactive({
    tabIdx: <number> Number(route.query['tab'] ?? 0),
    isMyInfoExist: <boolean> !!(route.query['info'] ?? false),
});

watch(
    () => route.query['tab'],
    async (p) => {
        opt.tabIdx = Number(p);
    }
);

onMounted(async () => {
    await nextTick();
    
});
</script>

<style scoped>
    
</style>