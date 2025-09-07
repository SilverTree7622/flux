<template>
    <div class="w-full h-full">
        <NuxtLayout
            name="tabcontent"
            :tabIdx="opt.tabIdx"
            :subIdx="opt.subIdx"
        >
            <div class="py-2"></div>
            <ContentPending v-if="opt.isPending" />
            <template v-else>
                <!-- <ContentWebsite v-if="opt.tabIdx === 0 && opt.subIdx === 0" :type="'website'" :list="listOpt.websiteAllList" />
                <ContentWebsite v-if="opt.tabIdx === 0 && opt.subIdx === 1" :type="'website'" :list="listOpt.websiteSampleList" />
                <ContentWebsite v-if="opt.tabIdx === 0 && opt.subIdx === 2" :type="'website'" :list="listOpt.websiteProdList" /> -->
                <ContentWebGame v-if="opt.tabIdx === 1 && opt.subIdx === 0" :type="'webgame'" :list="listOpt.webgameAllList" />
                <ContentWebGame v-if="opt.tabIdx === 1 && opt.subIdx === 1" :type="'webgame'" :list="listOpt.webgameSampleList" />
                <ContentWebGame v-if="opt.tabIdx === 1 && opt.subIdx === 2" :type="'webgame'" :list="listOpt.webgameProdList" />
                <ContentPlayableAD v-if="opt.tabIdx === 2 && opt.subIdx === 0" :type="'playablead'" :list="listOpt.playableadAllList" />
                <ContentPlayableAD v-if="opt.tabIdx === 2 && opt.subIdx === 1" :type="'playablead'" :list="listOpt.playableadSampleList" />
                <ContentPlayableAD v-if="opt.tabIdx === 2 && opt.subIdx === 2" :type="'playablead'" :list="listOpt.playableadProdList" />
                <ContentEtc v-if="opt.tabIdx === 3 && opt.subIdx === 0" :type="'etc'" :list="listOpt.etcAllList" />
                <ContentEtc v-if="opt.tabIdx === 3 && opt.subIdx === 1" :type="'etc'" :list="listOpt.etcSampleList" />
                <ContentEtc v-if="opt.tabIdx === 3 && opt.subIdx === 2" :type="'etc'" :list="listOpt.etcProdList" />
                <ContentEmpty v-show="!listOpt.isExist" :context="getContext()" :type="getType()" />
            </template>
            <div class="py-2"></div>
            <FooterInfo v-if="opt.isMyInfoExist" />
        </NuxtLayout>
        <ContentItemDetailModal 
            v-if="modalOpt.isOpen"
            :title="modalOpt.title" :src="modalOpt.src" :link="modalOpt.link"
        />
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

const modalOpt = useState('modal', () => ({
    isOpen: false,
    title: '',
    src: '',
    link: ''
}));

const listOpt = reactive({
    isExist: <boolean>false,
    websiteAllList: <TContentItem[]> [],
    websiteSampleList: <TContentItem[]> [],
    websiteProdList: <TContentItem[]> [],
    webgameAllList: <TContentItem[]> [],
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
        // { title: 'DODGEFISH', },
        { title: 'ENDLESSRUNNER', customTitle: '무한오르기', },
        { title: 'BASKETBALL', customTitle: '농구', },
        { title: 'GEMSFALL', },
        { title: 'VAMPIRESURVIVAL', customTitle: '뱀파이어서바이벌', },
        { title: 'TINYFISHING', customTitle: '낚시', },
    ],
    webgameProdList: <TContentItem[]> [],
    playableadAllList: <TContentItem[]> [],
    playableadSampleList: <TContentItem[]> [],
    playableadProdList: <TContentItem[]> [
        { thumbnail: 'logo/playablead/sweetopia.png', title: 'Sweetopia', },
        { thumbnail: 'logo/playablead/flappy-hero.png', title: 'Flappy Hero', },
        { thumbnail: 'logo/playablead/hidden-fable.png', title: 'Hidden Fable', },
        { thumbnail: 'logo/playablead/dessert-bliss.png', title: 'Dessert Bliss', },
        { thumbnail: 'logo/playablead/ragnarok-idle-game.png', title: 'Ragnarok Idle Game Costume Version', },
        { thumbnail: 'logo/playablead/ragnarok-idle-game.png', title: 'Ragnarok Idle Game Costume Version Responsive', },
        { thumbnail: 'logo/playablead/ragnarok-idle-game.png', title: 'Ragnarok Idle Game Fishing Version', },
        { thumbnail: 'logo/playablead/ragnarok-idle-game.png', title: 'Ragnarok Idle Game Pet Version', },
        { thumbnail: 'logo/playablead/ragnarok-idle-game.png', title: 'Ragnarok Idle Game Play Version', },
        { thumbnail: 'logo/playablead/ragnarok-idle-game.png', title: 'Ragnarok Idle Game Garden Version', },
    ],
    etcAllList: <TContentItem[]> [],
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
            return listOpt.isExist = !!listOpt.websiteAllList.length;
        }
        if (opt.subIdx === 1) {
            return listOpt.isExist = !!listOpt.websiteSampleList.length;
        }
        return listOpt.isExist = !!listOpt.websiteProdList.length;
    }
    if (opt.tabIdx === 1) {
        if (opt.subIdx === 0) {
            return listOpt.isExist = !!listOpt.webgameAllList.length;
        }
        if (opt.subIdx === 1) {
            return listOpt.isExist = !!listOpt.webgameSampleList.length;
        }
        return listOpt.isExist = !!listOpt.webgameProdList.length;
    }
    if (opt.tabIdx === 2) {
        if (opt.subIdx === 0) {
            return listOpt.isExist = !!listOpt.playableadAllList.length;
        }
        if (opt.subIdx === 1) {
            return listOpt.isExist = !!listOpt.playableadSampleList.length;
        }
        return listOpt.isExist = !!listOpt.playableadProdList.length;
    }
    if (opt.tabIdx === 3) {
        if (opt.subIdx === 0) {
            return listOpt.isExist = !!listOpt.etcAllList.length;
        }
        if (opt.subIdx === 1) {
            return listOpt.isExist = !!listOpt.etcSampleList.length;
        }
        return listOpt.isExist = !!listOpt.etcProdList.length;
    }
    listOpt.isExist = false;
};

const getContext = (): string => {
    return opt.tabIdx === 0 ? 'website' : opt.tabIdx === 1 ? 'webgame' : opt.tabIdx === 2 ? 'playablead' : 'etc';
};

const getType = (): string => {
    return opt.subIdx === 0 ? 'all' : opt.subIdx === 1 ? 'template' : 'prod';
};

onMounted(async () => {
    opt.isPending = true;
    await nextTick();
    listOpt.websiteSampleList = listOpt.websiteSampleList.map((item) => {
        item.subIdx = 1;
        return item;
    });
    listOpt.websiteSampleList = listOpt.websiteProdList.map((item) => {
        item.subIdx = 2;
        return item;
    });
    listOpt.webgameSampleList.map((item) => {
        item.subIdx = 1;
        return item;
    });
    listOpt.webgameProdList.map((item) => {
        item.subIdx = 2;
        return item;
    });
    listOpt.playableadSampleList.map((item) => {
        item.subIdx = 1;
        return item;
    });
    listOpt.playableadProdList.map((item) => {
        item.subIdx = 2;
        return item;
    });
    listOpt.etcSampleList.map((item) => {
        item.subIdx = 1;
        return item;
    });
    listOpt.etcProdList.map((item) => {
        item.subIdx = 2;
        return item;
    });
    listOpt.websiteAllList = [ ...listOpt.websiteSampleList, ...listOpt.websiteProdList ];
    listOpt.webgameAllList = [ ...listOpt.webgameSampleList, ...listOpt.webgameProdList ];
    listOpt.playableadAllList = [ ...listOpt.playableadSampleList, ...listOpt.playableadProdList ];
    listOpt.etcAllList = [ ...listOpt.etcSampleList, ...listOpt.etcProdList ];
    chckContentIsExist();
    opt.isPending = false;
});
</script>

<style scoped></style>