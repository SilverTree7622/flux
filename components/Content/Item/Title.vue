<template>
    <div
        :class="{
            'title': true,
            'title--bold': true,
        }"
    >
        {{ props.txt }}
    </div>
</template>
<script setup lang="ts">
const props = defineProps<{
    txt: string;
    bold?: boolean;
}>();
</script>
<style scoped>
.title {
    font-weight: 700;
    text-align: center;
    color: white;
    /* -webkit-text-stroke: 2px black;
    text-stroke: 2px black; */
}

.title--bold {
    font-weight: 900;
}
</style>