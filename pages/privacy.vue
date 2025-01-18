<template>
    <div
        class="privacy-content"
    >
        <header
            class="w-full text-center text-2xl font-bold mb-8"
        >
            {{ `${ opt.tab } app privacy policy`.toUpperCase() }}
        </header>
        <div class="border-b border-gray-300 my-8"></div>
        <div
            v-if="!opt.isPending"
            v-html="opt.content"
        >
        </div>
        <div 
            v-else 
            class="flex justify-center items-center py-8"
        >
            <svg class="animate-spin h-8 w-8 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        </div>
    </div>
</template>

<script setup lang="ts">
const route = useRoute();

const opt = reactive({
    isPending: true,
    tab: computed(() => {
        return route.query['tab'] ?? 'knife-shot';
    }),
    content: '',
});

onMounted(async () => {
    opt.isPending = true;
    await nextTick();
    try {
        const res = await fetch(`./${opt.tab}/index.html`);
        if (!res.ok) throw new Error('콘텐츠를 불러올 수 없습니다.');
        opt.content = await res.text();
    } catch (error) {
        console.error('프라이버시 콘텐츠 로딩 실패:', error);
        opt.content = '콘텐츠를 불러올 수 없습니다.';
    } finally {
        opt.isPending = false;
    }
});
</script>

<style scoped>
.privacy-content {
    padding: 20px;
}
</style>