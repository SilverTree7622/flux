<template>
    <div 
        class="modal-overlay"
        @click="closeModal"
    >
        <div 
            class="modal-content"
            @click.stop
        >
            <button 
                @click="closeModal"
                class="close-button"
            >
                ×
            </button>
            
            <div class="image-container">
                <img 
                    :src="props.src" 
                    :alt="props.title"
                    class="modal-image"
                />
            </div>
            
            <h2 class="modal-title">
                {{ props.title }}
            </h2>

            <div v-if="opt.isPending" class="pending-container">
                <ContentPending />
            </div>

            <div v-else class="content-container">
                <div v-if="contentInfo?.description" class="description-section">
                    <h3 class="section-title">소개</h3>
                    <p class="description-text">
                        {{ contentInfo.description }}
                    </p>
                </div>

                <div v-if="contentInfo?.company" class="company-section">
                    <div class="company-header">
                        <h3 class="section-title">의뢰 회사</h3>
                        <a 
                            v-if="contentInfo.companyLink"
                            :href="contentInfo.companyLink"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="company-link"
                        >
                            {{ contentInfo.company }}
                            <svg width="16" height="16" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"></path>
                            </svg>
                        </a>
                        <span v-else class="company-name">
                            {{ contentInfo.company }}
                        </span>
                    </div>
                </div>

                <div v-if="contentInfo?.links?.length" class="links-section">
                    <h3 class="section-title">웹사이트 링크</h3>
                    <div class="product-links-container">
                        <a 
                            v-for="(link, index) in contentInfo.links" 
                            :key="index"
                            :href="link" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            class="product-link-tag"
                        >
                            {{ getShortenedUrl(link) }}
                        </a>
                    </div>
                </div>

                <div v-if="contentInfo?.productLinks?.length" class="product-links-section">
                    <h3 class="section-title">관련 링크</h3>
                    <div class="product-links-container">
                        <a 
                            v-for="(link, index) in contentInfo.productLinks" 
                            :key="index"
                            :href="link" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            class="product-link-tag"
                        >
                            {{ getShortenedUrl(link) }}
                        </a>
                    </div>
                </div>
                
                <div v-if="contentInfo?.category" class="category-section">
                    <h3 class="section-title">카테고리</h3>
                    <div class="category-tags">
                        <span class="category-tag">
                            {{ getCategoryName(contentInfo.category) }}
                        </span>
                    </div>
                </div>

                <!-- <div v-if="contentInfo?.techStack?.length" class="tech-section">
                    <h3 class="section-title">기술 스택</h3>
                    <div class="tech-tags">
                        <span 
                            v-for="tech in contentInfo.techStack" 
                            :key="tech"
                            class="tech-tag"
                        >
                            {{ tech }}
                        </span>
                    </div>
                </div> -->

                <div v-if="contentInfo?.devices?.length" class="device-section">
                    <h3 class="section-title">지원 환경</h3>
                    <div class="device-tags">
                        <span 
                            v-for="device in contentInfo.devices" 
                            :key="device"
                            class="device-tag"
                        >
                            {{ getDeviceName(device) }}
                        </span>
                    </div>
                </div>
            </div>

            <div class="button-container">
                <button 
                    @click="openContent"
                    class="visit-button"
                >
                    Visit
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
type WebsiteContentInfo = {
    title: string;
    description?: string;
    links: string[];
    company: string;
    companyLink: string;
    productLinks: string[];
    // techStack?: string[];
    devices?: ('mobile' | 'desktop' | 'tablet')[];
    category: 'corporate' | 'landing' | 'event' | 'portfolio' | 'shopping';
};

const props = defineProps<{
    title: string;
    src: string;
    link: string;
    infoPath?: string;
}>();

const opt = reactive({
    isPending: <boolean> true,
});

const contentInfo = ref<WebsiteContentInfo | null>(null);

const closeModal = () => {
    const modalState = useState('modal', () => ({
        isOpen: false,
        title: '',
        src: '',
        link: '',
        type: 'playablead' as string,
    }));
    opt.isPending = true;
    modalState.value.isOpen = false;
};

const openContent = () => {
    navigateTo(props.link);
    closeModal();
};

const getJsonFileName = (title: string) => {
    return title.toLowerCase().replace(/\s+/g, '-');
};

const getShortenedUrl = (url: string) => {
    try {
        const urlObj = new URL(url);
        const domain = urlObj.hostname;
        const path = urlObj.pathname;
        
        if (path === '/' || path.length <= 20) {
            return domain + path;
        }
        return domain + '...';
    } catch {
        return url.length > 30 ? url.substring(0, 30) + '...' : url;
    }
};

const getCategoryName = (category: WebsiteContentInfo['category']) => {
    const categoryNames: Record<WebsiteContentInfo['category'], string> = {
        corporate: '기업/브랜드',
        landing: '랜딩',
        event: '이벤트/프로모션',
        portfolio: '포트폴리오',
        shopping: '쇼핑',
    };
    return categoryNames[category] || category;
};

const getDeviceName = (device: NonNullable<WebsiteContentInfo['devices']>[number]) => {
    const deviceNames: Record<NonNullable<WebsiteContentInfo['devices']>[number], string> = {
        mobile: '모바일',
        desktop: '데스크톱',
        tablet: '태블릿',
    };
    return deviceNames[device] || device;
};

const loadContentInfo = async () => {
    try {
        const fileName = getJsonFileName(props.title);
        const basePath = props.infoPath ?? 'website';
        const response = await $fetch<WebsiteContentInfo>(`/info/${ basePath }/${ fileName }.json`);
        contentInfo.value = response;
    } catch (error) {
        console.error('JSON 파일 로드 실패:', error);
        contentInfo.value = null;
    }
};

onMounted(async () => {
    opt.isPending = true;
    await nextTick();
    await loadContentInfo();
    opt.isPending = false;
});
</script>

<style scoped>
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

.modal-content {
    background-color: white;
    border-radius: 0.5rem;
    padding: 1.5rem;
    max-width: 28rem;
    width: 100%;
    margin: 0 1rem;
    position: relative;
    max-height: 96vh;
    display: flex;
    flex-direction: column;
}

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

.image-container {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
}

.modal-image {
    width: 5rem;
    height: 5rem;
    object-fit: contain;
    border-radius: 0.5rem;
}

.modal-title {
    font-size: 1.25rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 1.5rem;
    color: #1f2937;
}

.button-container {
    display: flex;
    justify-content: center;
}

.visit-button {
    background-color: #0f766e;
    color: white;
    font-weight: bold;
    padding: 0.75rem 2rem;
    border-radius: 4.5rem;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s;
}

.visit-button:hover {
    background-color: #0d9488;
}

.section-title {
    font-size: 1rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.5rem;
}

.description-section {
    margin-bottom: 1rem;
}

.description-text {
    color: #4b5563;
    font-size: 0.875rem;
    line-height: 1.6;
    margin: 0;
}

.links-section {
    margin-bottom: 1rem;
}

.company-section {
    margin-bottom: 1rem;
}

.company-header {
    display: flex;
    align-items: baseline;
    gap: 1rem;
    flex-wrap: wrap;
}

.company-link {
    color: #0f766e;
    text-decoration: none;
    font-size: 0.75rem !important;
    font-weight: 1000;
    padding: 0.1rem 0.2rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    background-color: #f8fafc;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
}

.company-link:hover {
    background-color: #0f766e;
    color: white;
    border-color: #0f766e;
    transform: translateY(-1px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.company-name {
    color: #374151;
    font-size: 0.75rem;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    background-color: #f9fafb;
    display: inline-block;
}

.product-links-section {
    margin-bottom: 1rem;
}

.product-links-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.product-link-tag {
    background-color: #ccfbf1;
    color: #115e59;
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.75rem;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
}

.product-link-tag:hover {
    background-color: #0f766e;
    color: white;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
}

.product-link-tag::after {
    content: "↗";
    font-size: 0.625rem;
    opacity: 0.7;
}

.pending-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 50vh;
}

.content-container {
    flex: 1;
    overflow-y: auto;
    padding-right: 0.5rem;
    margin-right: -0.5rem;
}

.content-container::-webkit-scrollbar {
    width: 6px;
}

.content-container::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
}

.content-container::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
}

.content-container::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
}

.category-section {
    margin-bottom: 1rem;
}

.category-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.category-tag {
    background-color: #fef3c7;
    color: #92400e;
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.75rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.375rem;
}

.tech-section {
    margin-bottom: 1rem;
}

.tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.tech-tag {
    background-color: #e0e7ff;
    color: #3730a3;
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.75rem;
    font-weight: 500;
}

.device-section {
    margin-bottom: 1rem;
}

.device-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.device-tag {
    background-color: #f3e8ff;
    color: #6b21a8;
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.75rem;
    font-weight: 500;
}
</style>
