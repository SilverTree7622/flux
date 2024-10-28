<template>
    <div class="w-full h-full">
        <NuxtLayout name="tabcontent" :tabIdx="opt.tabIdx" :subIdx="opt.subIdx">
            <div class="py-2"></div>
            <ContentPending v-if="opt.isPending" />
            <template v-else>
                <ContentWebsite v-if="opt.tabIdx === 0 && opt.subIdx === 0" :type="'website'" :subIdx="opt.subIdx" :list="listOpt.websiteSampleList" />
                <ContentWebsite v-if="opt.tabIdx === 0 && opt.subIdx === 1" :type="'website'" :subIdx="opt.subIdx" :list="listOpt.websiteProdList" />
                <ContentWebGame v-if="opt.tabIdx === 1 && opt.subIdx === 0" :type="'webgame'" :subIdx="opt.subIdx" :list="listOpt.webgameSampleList" />
                <ContentWebGame v-if="opt.tabIdx === 1 && opt.subIdx === 1" :type="'webgame'" :subIdx="opt.subIdx" :list="listOpt.webgameProdList" />
                <ContentPlayableAD v-if="opt.tabIdx === 2 && opt.subIdx === 0" :type="'playablead'" :subIdx="opt.subIdx" :list="listOpt.playableadSampleList" />
                <ContentPlayableAD v-if="opt.tabIdx === 2 && opt.subIdx === 1" :type="'playablead'" :subIdx="opt.subIdx" :list="listOpt.playableadProdList" />
                <ContentEtc v-if="opt.tabIdx === 3 && opt.subIdx === 0" :type="'etc'" :subIdx="opt.subIdx" :list="listOpt.etcSampleList" />
                <ContentEtc v-if="opt.tabIdx === 3 && opt.subIdx === 1" :type="'etc'" :subIdx="opt.subIdx" :list="listOpt.etcProdList" />
                <ContentEmpty v-show="!listOpt.isExist" :context="getContext()" :type="opt.subIdx === 0 ? 'sample' : 'production'" />
            </template>
            <div class="py-2"></div>
            <FooterInfo v-if="opt.isMyInfoExist" />
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
import type { TContentItem } from '@/types/content';

const route = useRoute();

const opt = reactive({
    isPending: <boolean> false,
    tabIdx: <number>Number(route.query['tab'] ?? 0),
    subIdx: <number>Number(route.query['sub'] ?? 0),
    isMyInfoExist: <boolean>!!(route.query['info'] ?? false),
});

const listOpt = reactive({
    isExist: <boolean>false,
    websiteSampleList: <TContentItem[]> [],
    websiteProdList: <TContentItem[]> [],
    webgameSampleList: <TContentItem[]> [
        { title: 'BRICKBREAKER', },
        { title: 'COLORBUMP', },
        { title: 'KNIFESHOT', },
        { title: 'MATCH3BLOSSOM', },
        { title: 'PUZZLE2048', },
        { title: 'PUZZLESHAPEBALANCE', customTitle: '균형맞추기', },
        { title: 'PUZZLETETRISBLOCK', customTitle: '테트리스Blast', },
        { title: 'PUZZLEWORLDSEARCH', customTitle: '낱말찾기', },
        { title: 'SWEETMERGE', customTitle: '수박게임', },
        { title: 'SWIPETENNIS', customTitle: '테니스', },
        { title: 'BOXJENGA', customTitle: '박스젠가', },
        { title: 'PUZZLEGOLF', customTitle: '골프퍼즐', },
        { title: 'PUZZLETOWERBOOM', customTitle: '타워폭파퍼즐', },
        { title: 'SQUARELANDING', },
        { title: 'BLOCKSTACK', customTitle: '블록스택', },
        { title: 'FLAPPYBIRD', customTitle: '플래피버드', },
        { title: 'DODGEFISH', },
    ],
    webgameProdList: <TContentItem[]> [],
    playableadSampleList: <TContentItem[]> [],
    playableadProdList: <TContentItem[]> [
        { thumbnail: 'logo/playablead/sweetopia.png', title: 'SWEETOPIA', }
    ],
    etcSampleList: <TContentItem[]> [],
    etcProdList: <TContentItem[]> [],
});

watch(
    () => route.query['tab'],
    async (p) => {
        opt.isPending = true;
        opt.tabIdx = Number(p);
        chckContentIsExist();
        opt.isPending = false;
    }
);

watch(
    () => route.query['sub'],
    async (p) => {
        opt.isPending = true;
        opt.subIdx = Number(p);
        chckContentIsExist();
        opt.isPending = false;
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
    opt.isPending = true;
    await nextTick();
    chckContentIsExist();
    opt.isPending = false;
});
</script>

<style scoped></style>