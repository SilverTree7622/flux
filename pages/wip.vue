<template>
    <div>
        <iframe
            ref="$frame"
            class="w-full h-[100vh] overflow-hidden"
            :src="opt.fullSrc"  
        >
        </iframe>
    </div>
</template>

<script setup lang="ts">
const route = useRoute();

const opt = reactive({
    fullSrc: '',
});

onMounted(async () => {
    await nextTick();
    const company = route.query['tab'] as string ?? '';
    const game = route.query['game'] as string ?? '';
    opt.fullSrc = `${ company }/${ game }/index.html`;
});
</script>

<style scoped>
    
</style>