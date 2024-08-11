<template>
    <div
        class="cursor-pointer min-w-[100px] flex flex-col justify-center items-center"
        @click="clickItem"
    >
        <ContentItemThumbnail :src="props.item.thumbnail" />
        <div :class="`my-2`"></div>
        <ContentItemTitle :txt="props.item.title" />
    </div>
</template>
<script setup lang="ts">
import type { TContentItem } from '@/types/content';

const props = defineProps<{
    item: TContentItem;
    customGap?: number;
}>();

const clickItem = () => {
    const link = props.item.link ? `&link=${ props.item.link }` : '';
    navigateTo(
        `/content?type=${ props.item.type ?? 'website' }&contenttype=${ props.item.contentType ?? 'file' }${ link }&name=${ props.item.title }`
    );
};
</script>
<style scoped>
    
</style>