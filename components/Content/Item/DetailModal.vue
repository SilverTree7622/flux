<template>
    <div 
        class="modal-overlay"
        @click="closeModal"
    >
        <div 
            class="modal-content"
            @click.stop
        >
            <!-- 닫기 버튼 -->
            <button 
                @click="closeModal"
                class="close-button"
            >
                ×
            </button>
            
            <!-- 이미지 -->
            <div class="image-container">
                <img 
                    :src="props.src" 
                    :alt="props.title"
                    class="modal-image"
                />
            </div>
            
            <!-- 제목 -->
            <h2 class="modal-title">
                {{ props.title }}
            </h2>
            
            <!-- 플레이 버튼 -->
            <div class="button-container">
                <button 
                    @click="playContent"
                    class="play-button"
                >
                    Play
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    title: string;
    src: string;
    link: string;
}>();

const closeModal = () => {
    const modalState = useState('modal', () => ({
        isOpen: false,
        title: '',
        src: '',
        link: ''
    }));
    modalState.value.isOpen = false;
};

const playContent = () => {
    navigateTo(props.link);
    closeModal();
};

onMounted(async () => {
    await nextTick();
    console.log('props detail modal: ', props);
});
</script>

<style scoped>
/* 모달 오버레이 */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 50;
}

/* 모달 콘텐츠 */
.modal-content {
    background-color: white;
    border-radius: 0.5rem;
    padding: 1.5rem;
    max-width: 28rem;
    width: 100%;
    margin: 0 1rem;
    position: relative;
}

/* 닫기 버튼 */
.close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    color: #6b7280;
    font-size: 1.5rem;
    background: none;
    border: none;
    cursor: pointer;
    transition: color 0.2s;
}

.close-button:hover {
    color: #374151;
}

/* 이미지 컨테이너 */
.image-container {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
}

/* 모달 이미지 */
.modal-image {
    width: 8rem;
    height: 8rem;
    object-fit: contain;
    border-radius: 0.5rem;
}

/* 모달 제목 */
.modal-title {
    font-size: 1.25rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 1.5rem;
    color: #1f2937;
}

/* 버튼 컨테이너 */
.button-container {
    display: flex;
    justify-content: center;
}

/* 플레이 버튼 */
.play-button {
    background-color: #3b82f6;
    color: white;
    font-weight: bold;
    padding: 0.75rem 2rem;
    border-radius: 0.5rem;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s;
}

.play-button:hover {
    background-color: #2563eb;
}
</style>