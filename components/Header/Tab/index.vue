<template>
    <div class="flex flex-row">
        <HeaderTabTitle
            :tabIdx="0"
            :context="'website'"
            :isToggled="props.idx === 0"
        />
        <HeaderTabTitle
            :tabIdx="1"
            :context="'web game'"
            :isToggled="props.idx === 1"
        />
        <HeaderTabTitle
            :tabIdx="2"
            :context="'playable ad'"
            :isToggled="props.idx === 2"
        />
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    idx: number;
}>();

</script>

<style scoped>
    
</style>