<template>
    <div class="">
        <ContentItemThumbnail :src="props.item.thumbnail" />
        <ContentItemTitle :txt="props.item.title" />
    </div>
</template>
<script setup lang="ts">
import type { TContentItem } from '~/types/content';

const props = defineProps<{
    item: TContentItem;
}>();


</script>
<style scoped>
    
</style>