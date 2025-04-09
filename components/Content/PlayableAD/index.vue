<template>
    <div
        class="
            w-full px-auto mx-auto justify-center items-center
            grid grid-cols-3 gap-4
        "
    >
        <ContentItem
            v-for="(item, idx) in props.list"
            :type="props.type"
            :item="item"
        />
    </div>
</template>
<script setup lang="ts">
import type { TContentItem, TContentType } from '@/types/content';

const props = defineProps<{
    type: TContentType;
    list: TContentItem[];
}>();
</script>
<style scoped>
    
</style>