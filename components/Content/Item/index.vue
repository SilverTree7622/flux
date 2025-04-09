<template>
    <div
        class="cursor-pointer min-w-[100px] flex flex-col justify-center items-center"
        @click="clickItem"
    >
        <ContentItemThumbnail :src="props.item.thumbnail || 'BlackLogo.jpg'" />
        <div :class="`my-2`"></div>
        <ContentItemTitle :txt="props.item.customTitle ?? props.item.title" />
    </div>
</template>
<script setup lang="ts">
import type { TContentItem, TContentType } from '@/types/content';

const props = defineProps<{
    type: TContentType;
    subIdx: number;
    item: TContentItem;
    customGap?: number;
}>();

const getSub = (): string => {
    return props.subIdx === 0 ? 'sample' : 'prod';
};

const clickItem = () => {
    const link = props.item.link ? `&link=${ props.item.link }` : '';
    navigateTo(
        `/content?type=${ props.type ?? 'website' }&sub=${ getSub() }&contenttype=${ props.item.contentType ?? 'file' }${ link }&name=${ props.item.title.replaceAll(' ', '-').toLowerCase() }`
    );
};
</script>
<style scoped>
    
</style>