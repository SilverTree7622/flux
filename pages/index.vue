<template>
    <iframe
        v-if="!!opt.fullSrc"
        ref="$frame"
        class="w-full h-[100vh] overflow-hidden"
        :src="opt.fullSrc"  
    >
    </iframe>
</template>

<script setup lang="ts">
const route = useRoute();

const opt = reactive({
    fullSrc: '',
});

const getFullSrc = () => {
    const tab = route.query['tab'] as string ?? '';
    const game = route.query['game'] as string ?? '';
    const src = `outsourcing/${ tab }/${ game }/index.html`;
    if (!tab || !game) {
        return '';
    }
    return src;
};

onMounted(async () => {
    await nextTick();
    opt.fullSrc = getFullSrc();
    if (!opt.fullSrc) {
        navigateTo('/showcase?tab=2&sub=0');
    }
});
</script>

<style scoped>
    
</style>