<template>
    <div
        v-for="(item, idx) in props.list"
        class="
            w-full px-auto mx-auto justify-center items-center
            grid grid-cols-3 gap-4
        "
    >
        <ContentItem
            :type="props.type"
            :subIdx="props.subIdx"
            :item="item"
        />
    </div>
</template>
<script setup lang="ts">
import type { TContentItem, TContentType } from '@/types/content';

const props = defineProps<{
    type: TContentType;
    subIdx: number;
    list: TContentItem[];
}>();
</script>
<style scoped>
    
</style>