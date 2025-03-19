
            // Base64 인코딩된 오디오 처리 함수
            window.processPhaserAudio = function(audioDataUrl) {
                if (!audioDataUrl || typeof audioDataUrl !== 'string' || !audioDataUrl.startsWith('data:')) {
                    return audioDataUrl;
                }
                
                // Base64 데이터 추출
                const base64 = audioDataUrl.split(',')[1];
                
                // Base64를 바이너리로 변환
                const binaryString = window.atob(base64);
                
                // ArrayBuffer 생성
                const bytes = new Uint8Array(binaryString.length);
                for (let i = 0; i < binaryString.length; i++) {
                    bytes[i] = binaryString.charCodeAt(i);
                }
                
                // ArrayBuffer 반환
                return bytes.buffer;
            };
            
            // Phaser 오디오 로더 패치
            document.addEventListener('DOMContentLoaded', function() {
                const checkInterval = setInterval(function() {
                    if (window.Phaser && window.Phaser.Loader && window.Phaser.Loader.FileTypes && window.Phaser.Loader.FileTypes.AudioFile) {
                        clearInterval(checkInterval);
                        
                        // 오리지널 메소드 저장
                        const originalOnProcess = Phaser.Loader.FileTypes.AudioFile.prototype.onProcess;
                        
                        // 메소드 재정의
                        Phaser.Loader.FileTypes.AudioFile.prototype.onProcess = function() {
                            if (this.src && typeof this.src === 'string' && this.src.startsWith('data:')) {
                                this.src = window.processPhaserAudio(this.src);
                            } else if (this.src && Array.isArray(this.src)) {
                                this.src = this.src.map(url => {
                                    if (typeof url === 'string' && url.startsWith('data:')) {
                                        return window.processPhaserAudio(url);
                                    }
                                    return url;
                                });
                            }
                            
                            return originalOnProcess.call(this);
                        };
                        
                        console.log('Phaser 오디오 로더 패치 완료');
                    }
                }, 100);
                
                setTimeout(function() {
                    clearInterval(checkInterval);
                }, 10000);
            });
        