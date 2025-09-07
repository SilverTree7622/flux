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


            <div v-if="opt.isPending" class="pending-container">
                <ContentPending />
            </div>

            <div v-else class="content-container">
                <!-- 의뢰 회사 -->
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
                            <svg width="16" height="16" data-slot="icon" data-darkreader-inline-stroke="" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"></path>
                            </svg>
                        </a>
                        <span v-else class="company-name">
                            {{ contentInfo.company }}
                        </span>
                    </div>
                </div>

                <!-- 프로덕트 관련 링크들 -->
                <div v-if="contentInfo?.productLinks?.length" class="product-links-section">
                    <h3 class="section-title">프로덕트 관련 링크들</h3>
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

                <!-- 프로덕트 링크(앱 스토어, 웹사이트 등) -->
                <div v-if="contentInfo?.links?.length" class="links-section">
                    <h3 class="section-title">프로덕트 링크</h3>
                    <div class="links-container">
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
                
                <!-- 카테고리 -->
                <div v-if="contentInfo?.category" class="category-section">
                    <h3 class="section-title">카테고리</h3>
                    <div class="category-tags">
                        <span class="category-tag">
                            <img 
                                v-if="getCategoryImage(contentInfo.category) !== null"
                                :src="getCategoryImage(contentInfo.category)!"
                                class="category-logo"
                            />
                            {{ getCategoryName(contentInfo.category) }}
                        </span>
                    </div>
                </div>

                <!-- orientation -->
                <div v-if="contentInfo?.orientation" class="orientation-section">
                    <h3 class="section-title">Playable AD 화면 방향</h3>
                    <div class="orientation-tags">
                        <span class="orientation-tag">
                            <span 
                                v-if="getOrientationIcon(contentInfo.orientation) !== null"
                                v-html="getOrientationIcon(contentInfo.orientation)!"
                                class="orientation-icon"
                            ></span>
                            {{ getOrientationName(contentInfo.orientation) }}
                        </span>
                    </div>
                </div>

                <!-- 배포했던 네트워크 타입들(메타, 구글, 틱톡 등) -->
                <div v-if="contentInfo?.networkTypes?.length" class="network-section">
                    <h3 class="section-title">Playable AD 배포된 광고 플랫폼</h3>
                    <div class="network-tags">
                        <span 
                            v-for="network in contentInfo.networkTypes" 
                            :key="network"
                            class="network-tag"
                        >
                            <img 
                                v-if="getNetworkImage(network) !== null"
                                :src="getNetworkImage(network)!"
                                class="network-logo"
                            />
                            {{ network }}
                        </span>
                    </div>
                </div>

                <!-- 개발 타입(순수 코드, 영상 + 코드) -->
                <div v-if="contentInfo?.devType?.length" class="dev-type-section">
                    <h3 class="section-title">Playable AD 개발 유형</h3>
                    <div class="dev-type-tags">
                        <span 
                            v-for="type in contentInfo.devType" 
                            :key="type"
                            class="dev-type-tag"
                        >
                            <span
                                v-if="getDevTypeImage(type) !== null"
                                v-html="getDevTypeImage(type)!"
                                class="dev-type-logo"
                            ></span>
                            {{ type }}
                        </span>
                    </div>
                </div>

            </div>

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
type ContentInfo = {
    title: string;
    links: string[];
    company: string;
    companyLink: string;
    productLinks: string[];
    orientation: 'portrait' | 'landscape' | 'responsive';
    networkTypes: string[];
    devType: ('code' | 'video')[];
    category: 'game' | 'shopping' | 'music' | 'travel';
};

const props = defineProps<{
    title: string;
    src: string;
    link: string;
}>();

const opt = reactive({
    isPending: <boolean> true,
});

const contentInfo = ref<ContentInfo | null>(null);

const closeModal = () => {
    const modalState = useState('modal', () => ({
        isOpen: false,
        title: '',
        src: '',
        link: ''
    }));
    opt.isPending = true;
    modalState.value.isOpen = false;
};

const playContent = () => {
    navigateTo(props.link);
    closeModal();
};

// title을 기반으로 JSON 파일명 생성 (소문자, 하이픈으로 변환)
const getJsonFileName = (title: string) => {
    return title.toLowerCase().replace(/\s+/g, '-');
};

const getOrientationIcon = (orientation: ContentInfo['orientation']) => {
    if (orientation === 'portrait') {
        return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="3" width="12" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
            <circle cx="12" cy="8" r="1" fill="currentColor"/>
            <path d="M10 12h4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>`;
    }
    if (orientation === 'landscape') {
        return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" stroke-width="2"/>
            <circle cx="8" cy="12" r="1" fill="currentColor"/>
            <path d="M12 10v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>`;
    }
    if (orientation === 'responsive') {
        return `<svg width="16" height="16" data-slot="icon" data-darkreader-inline-stroke="" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"></path>
        </svg>`;
    }
    return null;
};

const getOrientationName = (orientation: ContentInfo['orientation']) => {
    if (orientation === 'portrait') return '세로형';
    if (orientation === 'landscape') return '가로형';
    if (orientation === 'responsive') return '반응형';
    return '';
};

// 네트워크 이름에 해당하는 이미지 경로 반환
const getNetworkImage = (networkName: string) => {
    const imagePath = `networks/${ networkName }.png`;
    return imagePath;
};

const getDevTypeImage = (devTypeName: ContentInfo['devType'][number]) => {
    if (devTypeName === 'code') {
        return `<svg width="16" height="16" data-slot="icon" data-darkreader-inline-stroke="" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"></path>
        </svg>`;
    }
    if (devTypeName === 'video') {
        return `<svg width="16" height="16" data-slot="icon" data-darkreader-inline-stroke="" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0 1 18 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0 1 18 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 0 1 6 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5"></path>
        </svg>`;
    }
    return '';
};

// URL을 축약하는 함수
const getShortenedUrl = (url: string) => {
    try {
        const urlObj = new URL(url);
        const domain = urlObj.hostname;
        const path = urlObj.pathname;
        
        // 도메인만 표시하거나, 경로가 짧으면 도메인 + 경로 표시
        if (path === '/' || path.length <= 20) {
            return domain + path;
        } else {
            return domain + '...';
        }
    } catch {
        // URL 파싱 실패 시 원본 URL의 처음 30자만 표시
        return url.length > 30 ? url.substring(0, 30) + '...' : url;
    }
};

// 카테고리 이름에 해당하는 이미지 경로 반환
const getCategoryImage = (categoryName: ContentInfo['category']) => {
    const imagePath = `category/${ categoryName }.png`;
    return imagePath;
};

// 카테고리 이름을 한국어로 변환
const getCategoryName = (category: ContentInfo['category']) => {
    const categoryNames: Record<ContentInfo['category'], string> = {
        'game': '게임',
        'shopping': '쇼핑',
        'music': '음악',
        'travel': '여행'
    };
    return categoryNames[category] || category;
};

// JSON 파일 로드
const loadContentInfo = async () => {
    try {
        const fileName = getJsonFileName(props.title);
        const response = await $fetch<ContentInfo>(`/info/playablead/${ fileName }.json`);
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
    max-height: 96vh;
    display: flex;
    flex-direction: column;
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
    width: 5rem;
    height: 5rem;
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
    border-radius: 4.5rem;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s;
}

.play-button:hover {
    background-color: #2563eb;
}

/* 섹션 스타일 */
.section-title {
    font-size: 1rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.5rem;
}

/* 링크 섹션 */
.links-section {
    margin-bottom: 1rem;
}

.links-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.link-item {
    color: #3b82f6;
    text-decoration: none;
    font-size: 0.875rem;
    padding: 0.5rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.375rem;
    transition: all 0.2s;
}

.link-item:hover {
    background-color: #f3f4f6;
    border-color: #3b82f6;
}

/* orientation 섹션 */
.orientation-section {
    margin-bottom: 1rem;
}

.orientation-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.orientation-tag {
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

.orientation-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.orientation-icon svg {
    width: 1rem;
    height: 1rem;
}

/* 네트워크 섹션 */
.network-section {
    margin-bottom: 1rem;
}

.network-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.network-tag {
    background-color: #e0e7ff;
    color: #3730a3;
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.75rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.375rem;
}

.network-logo {
    width: 1rem;
    height: 1rem;
    object-fit: contain;
    flex-shrink: 0;
}

/* 개발 타입 섹션 */
.dev-type-section {
    margin-bottom: 1rem;
}

.dev-type-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.dev-type-tag {
    background-color: #abffc4;
    color: #166534;
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.75rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.375rem;
}

.dev-type-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.dev-type-logo svg {
    width: 1rem;
    height: 1rem;
}

/* 회사 섹션 */
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
    color: #3b82f6;
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
    background-color: #3b82f6;
    color: white;
    border-color: #3b82f6;
    transform: translateY(-1px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.clip-icon {
    opacity: 0.7;
    flex-shrink: 0;
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

/* 프로덕트 링크 섹션 */
.product-links-section {
    margin-bottom: 1rem;
}

.product-links-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.product-link-tag {
    background-color: #dbeafe;
    color: #1e40af;
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
    background-color: #1e40af;
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
    /* height: 100%; */
    height: 50vh;
}

/* 콘텐츠 컨테이너 */
.content-container {
    flex: 1;
    overflow-y: auto;
    padding-right: 0.5rem;
    margin-right: -0.5rem;
}

/* 스크롤바 스타일링 */
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

/* 카테고리 섹션 */
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

.category-logo {
    width: 1rem;
    height: 1rem;
    object-fit: contain;
    flex-shrink: 0;
}
</style>