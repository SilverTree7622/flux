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
            <ContentEtc
                v-if="opt.tabIdx === 3"
                :list="list.etc"
            />
            <div class="py-2"></div>
            <NuxtLayout
                name="template"
                :tabIdx="opt.tabIdx"
                :isExist="template.isExist"
            >
                <ContentWebsite
                    v-if="opt.tabIdx === 0"
                    :list="template.website"
                />
                <ContentWebGame
                    v-if="opt.tabIdx === 1"
                    :list="template.webgame"
                />
                <ContentPlayableAD
                    v-if="opt.tabIdx === 2"
                    :list="template.playablead"
                />
                <ContentEtc
                    v-if="opt.tabIdx === 3"
                    :list="template.etc"
                />
            </NuxtLayout>
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
    isExist: <boolean> false,
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
    etc: <TContentItem[]> [],
});

const template = reactive({
    isExist: <boolean> false,
    website: <TContentItem[]> [],
    webgame: <TContentItem[]> [],
    playablead: <TContentItem[]> [],
    etc: <TContentItem[]> [],
});

watch(
    () => route.query['tab'],
    async (p) => {
        opt.tabIdx = Number(p);
        chckContentIsExist();
        chckTemplateIsExist();
    }
);

const chckContentIsExist = () => {
    if (opt.tabIdx === 0) {
        return list.isExist = !!list.website.length;
    }
    if (opt.tabIdx === 1) {
        return list.isExist = !!list.webgame.length;
    }
    if (opt.tabIdx === 2) {
        return list.isExist = !!list.playablead.length;
    }
    if (opt.tabIdx === 3) {
        return list.isExist = !!list.etc.length;
    }
    list.isExist = false;
};

const chckTemplateIsExist = () => {
    if (opt.tabIdx === 0) {
        return template.isExist = !!template.website.length;
    }
    if (opt.tabIdx === 1) {
        return template.isExist = !!template.webgame.length;
    }
    if (opt.tabIdx === 2) {
        return template.isExist = !!template.playablead.length;
    }
    if (opt.tabIdx === 3) {
        return template.isExist = !!template.etc.length;
    }
    template.isExist = false;
};

onMounted(async () => {
    await nextTick();
    chckTemplateIsExist();
});
</script>

<style scoped>
    
</style>