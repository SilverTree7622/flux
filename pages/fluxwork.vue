<template>
    <div>
        <NuxtLayout 
            name="tabcontent"
            :tabIdx="opt.tabIdx"
        >
            <NuxtWelcome v-if="opt.tabIdx === 0" />
            <NuxtRouteAnnouncer v-if="opt.tabIdx === 1" />
            <FooterInfo v-if="opt.isMyInfoExist" />
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
const route = useRoute();
const opt = reactive({
    tabIdx: <number> Number(route.query['tab'] ?? 0),
    isMyInfoExist: <boolean> !!(route.query['info'] ?? true),
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