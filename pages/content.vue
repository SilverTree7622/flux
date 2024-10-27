<template>
    <NuxtLayout 
        name="tabcontent"
        :tabIdx="-1"
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
        <div class="py-2"></div>
    </NuxtLayout>
</template>

<script setup lang="ts">
const route = useRoute();

const getType = () => {
    return route.query['type'] as string ?? 'website';
};

const getSubType = () => {
    return route.query['sub'] as string ?? '';
};

const getContentType = () => {
    return route.query['contenttype'] as string ?? 'file';
};

const getName = () => {
    return route.query['name'] as string ?? '';
};

const getLink = () => {
    return route.query['link'] as string ?? '';
};

const opt = reactive({
    isPending: <boolean> true,
    type: <string> getType(),
    sub: <string> getSubType(),
    contentType: <string> getContentType(),
    url: <string> getName(),
    link: <string> getLink(),
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

const getFullSrc = () => {
    const src = `${ opt.type }/${ opt.sub }/${ opt.url.toLowerCase() }/index.html`;
    console.log('src: ', src);
    return src;
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
    opt.fullSrc = getFullSrc();
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