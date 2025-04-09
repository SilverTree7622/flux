<template>
    <div
        class="content-item"
        @click="clickItem"
    >
        <ContentItemThumbnail :src="props.item.thumbnail || 'BlackLogo.jpg'"/>
        <div class="item-gap"></div>
        <ContentItemTitle :txt="props.item.customTitle ?? props.item.title" />
    </div>
</template>
<script setup lang="ts">
import type { TContentItem, TContentType } from '@/types/content';

const props = defineProps<{
    type: TContentType;
    item: TContentItem;
    customGap?: number;
}>();

const getSub = (): string => {
    return props.item.subIdx === 1 ? 'sample' : 'prod';
};

const clickItem = () => {
    const link = props.item.link ? `&link=${ props.item.link }` : '';
    navigateTo(
        `/content?type=${ props.type ?? 'website' }&sub=${ getSub() }&contenttype=${ props.item.contentType ?? 'file' }${ link }&name=${ props.item.title.replaceAll(' ', '-').toLowerCase() }`
    );
};
</script>
<style scoped>
.content-item {
    cursor: pointer;
    min-width: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.item-gap {
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
}

</style>