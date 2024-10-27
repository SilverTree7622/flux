<template>
    <div class="w-full h-full">
        <NuxtLayout name="tabcontent" :tabIdx="opt.tabIdx" :subIdx="opt.subIdx">
            <div class="py-2"></div>
            <ContentWebsite v-if="opt.tabIdx === 0 && opt.subIdx === 0" :type="'website'" :subIdx="opt.subIdx" :list="listOpt.websiteSampleList" />
            <ContentWebsite v-if="opt.tabIdx === 0 && opt.subIdx === 1" :type="'website'" :subIdx="opt.subIdx" :list="listOpt.websiteProdList" />
            <ContentWebGame v-if="opt.tabIdx === 1 && opt.subIdx === 0" :type="'webgame'" :subIdx="opt.subIdx" :list="listOpt.webgameSampleList" />
            <ContentWebGame v-if="opt.tabIdx === 1 && opt.subIdx === 1" :type="'webgame'" :subIdx="opt.subIdx" :list="listOpt.webgameProdList" />
            <ContentPlayableAD v-if="opt.tabIdx === 2 && opt.subIdx === 0" :type="'playablead'" :subIdx="opt.subIdx" :list="listOpt.playableadSampleList" />
            <ContentPlayableAD v-if="opt.tabIdx === 2 && opt.subIdx === 1" :type="'playablead'" :subIdx="opt.subIdx" :list="listOpt.playableadProdList" />
            <ContentEtc v-if="opt.tabIdx === 3 && opt.subIdx === 0" :type="'etc'" :subIdx="opt.subIdx" :list="listOpt.etcSampleList" />
            <ContentEtc v-if="opt.tabIdx === 3 && opt.subIdx === 1" :type="'etc'" :subIdx="opt.subIdx" :list="listOpt.etcProdList" />
            <ContentEmpty v-show="!listOpt.isExist" :context="getContext()" :type="opt.subIdx === 0 ? 'sample' : 'production'" />
            <div class="py-2"></div>
            <FooterInfo v-if="opt.isMyInfoExist" />
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
import type { TContentItem } from '@/types/content';

const route = useRoute();

const opt = reactive({
    tabIdx: <number>Number(route.query['tab'] ?? 0),
    subIdx: <number>Number(route.query['sub'] ?? 0),
    isMyInfoExist: <boolean>!!(route.query['info'] ?? false),
});

const listOpt = reactive({
    isExist: <boolean>false,
    websiteSampleList: <TContentItem[]>[],
    websiteProdList: <TContentItem[]>[],
    webgameSampleList: <TContentItem[]>[
        {
            // thumbnail: 'logo/playablead/sweetopia.png',
            title: 'SWEETMERGE',
            contentType: 'file'
        },
    ],
    webgameProdList: <TContentItem[]>[],
    playableadSampleList: <TContentItem[]>[],
    playableadProdList: <TContentItem[]>[
        {
            thumbnail: 'logo/playablead/sweetopia.png',
            title: 'SWEETOPIA',
            contentType: 'file'
        }
    ],
    etcSampleList: <TContentItem[]>[],
    etcProdList: <TContentItem[]>[],
});

watch(
    () => route.query['tab'],
    async (p) => {
        opt.tabIdx = Number(p);
        chckContentIsExist();
    }
);

watch(
    () => route.query['sub'],
    async (p) => {
        opt.subIdx = Number(p);
        chckContentIsExist();
    },
);

const chckContentIsExist = () => {
    if (opt.tabIdx === 0) {
        if (opt.subIdx === 0) {
            return listOpt.isExist = !!listOpt.websiteSampleList.length;
        }
        return listOpt.isExist = !!listOpt.websiteProdList.length;
    }
    if (opt.tabIdx === 1) {
        if (opt.subIdx === 0) {
            return listOpt.isExist = !!listOpt.webgameSampleList.length;
        }
        return listOpt.isExist = !!listOpt.webgameProdList.length;
    }
    if (opt.tabIdx === 2) {
        if (opt.subIdx === 0) {
            return listOpt.isExist = !!listOpt.playableadSampleList.length;
        }
        return listOpt.isExist = !!listOpt.playableadProdList.length;
    }
    if (opt.tabIdx === 3) {
        return listOpt.isExist = !!listOpt.etcProdList.length;
    }
    listOpt.isExist = false;
};

const getContext = (): string => {
    return opt.tabIdx === 0 ? 'website' : opt.tabIdx === 1 ? 'webgame' : opt.tabIdx === 2 ? 'playablead' : 'etc';
};

onMounted(async () => {
    await nextTick();
    chckContentIsExist();
});
</script>

<style scoped></style>