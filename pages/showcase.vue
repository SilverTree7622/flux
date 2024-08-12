<template>
    <div class="w-full h-full">
        <NuxtLayout 
            name="tabcontent"
            :tabIdx="opt.tabIdx"
        >
            <div class="py-2"></div>
            <ContentWebsite
                v-if="opt.tabIdx === 0"
                :list="list.website"
            />
            <ContentWebGame
                v-if="opt.tabIdx === 1"
                :list="list.webgame"
            />
            <ContentPlayableAD
                v-if="opt.tabIdx === 2"
                :list="list.playablead"
            />
            <div class="py-2"></div>
            <FooterInfo v-if="opt.isMyInfoExist" />
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
import type { TContentItem } from '@/types/content';

const route = useRoute();
const opt = reactive({
    tabIdx: <number> Number(route.query['tab'] ?? 0),
    isMyInfoExist: <boolean> !!(route.query['info'] ?? false),
});

const list = reactive({
    website: <TContentItem[]> [],
    webgame: <TContentItem[]> [],
    playablead: <TContentItem[]> [
        {
            thumbnail: 'logo/playablead/sweetopia.png',
            title: 'SWEETOPIA',
            type: 'playablead',
            contentType: 'file'
        }
    ],
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