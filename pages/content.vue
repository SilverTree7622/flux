<template>
    <NuxtLayout 
        name="tabcontent"
        :tabIdx="-1"
        :subIdx="0"
        :isNoTop="true"
    >
        <div class="py-2"></div>
        <div
            v-if="getType() === 'external'"
            @click="clickExternal"
        >
            {{ getName() }}
        </div>
        <iframe
            v-if="getType() !== 'external'"
            ref="$frame"
            class="w-full p-auto overflow-hidden"
            :src="opt.fullSrc"
        >
        </iframe>
        <!-- <div class="py-2"></div> -->
    </NuxtLayout>
</template>

<script setup lang="ts">
import type { TWebsiteContentInfo } from '@/types/content';

const route = useRoute();

const queryString = (key: string): string => {
    const value = route.query[key];
    return typeof value === 'string' ? value : '';
};

const getType = () => queryString('type') || 'website';
const getSubType = () => queryString('sub');
const getContentType = () => queryString('contenttype') || 'file';
const getName = () => queryString('name');
const getLink = () => queryString('link');
const getIframeUrl = () => queryString('iframeurl');
const getInfoTitle = () => queryString('infotitle') || getName();

const opt = reactive({
    isPending: <boolean> true,
    type: <string> getType(),
    sub: <string> getSubType(),
    contentType: <string> getContentType(),
    url: <string> getName(),
    link: <string> getLink(),
    iframeUrl: <string> getIframeUrl(),
    infoTitle: <string> getInfoTitle(),
    fullSrc: <string> '',
});

const $frame = ref();

const clickExternal = () => {
    navigateTo(
        opt.link,
        {
            external: true,
            open: {
                target: "_blank",
            },
        }
    );
};

const getInfoFolder = (type: string): string | null => {
    if (type === 'etc' || type === 'website') {
        return type;
    }
    return null;
};

const getJsonFileName = (title: string) => {
    return title.toLowerCase().replace(/\s+/g, '-');
};

const getLocalSrc = () => {
    return `${ opt.type }/${ opt.sub }/${ opt.url.toLowerCase() }/index.html`;
};

const loadInfoUrl = async (): Promise<string> => {
    const folder = getInfoFolder(opt.type);
    if (!folder || !opt.infoTitle) {
        return '';
    }
    try {
        const fileName = getJsonFileName(opt.infoTitle);
        const info = await $fetch<TWebsiteContentInfo>(`/info/${ folder }/${ fileName }.json`);
        return info?.url?.trim() || '';
    } catch (error) {
        console.warn('content info load failed:', error);
        return '';
    }
};

const resolveFullSrc = async () => {
    if (opt.iframeUrl) {
        console.log('src (query): ', opt.iframeUrl);
        return opt.iframeUrl;
    }

    const infoUrl = await loadInfoUrl();
    if (infoUrl) {
        console.log('src (info.url): ', infoUrl);
        return infoUrl;
    }

    const localSrc = getLocalSrc();
    console.log('src (local): ', localSrc);
    return localSrc;
};

onMounted(async () => {
    opt.isPending = true;
    await nextTick();
    if (!$frame.value) {
        opt.isPending = false;
        return;
    }
    $frame.value.setAttribute('height', `${ window.innerHeight - 73 }px`);
    if (getType() === 'file') {
        
    }
    if (getType() === 'link') {
        
    }
    if (getType() === 'external') {

    }
    opt.type = getType();
    opt.sub = getSubType();
    opt.contentType = getContentType();
    opt.url = getName();
    opt.link = getLink();
    opt.iframeUrl = getIframeUrl();
    opt.infoTitle = getInfoTitle();
    opt.fullSrc = await resolveFullSrc();
    opt.isPending = false;
});

onBeforeUnmount(() => {
    if (!$frame.value) {
        return;
    }
    $frame.value.setAttribute('height', `${ window.innerHeight - 73 }px`);
});
</script>
<style scoped>
    
</style>
